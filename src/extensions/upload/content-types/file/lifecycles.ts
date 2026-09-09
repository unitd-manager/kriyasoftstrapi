import crypto from 'node:crypto';

type UploadFile = {
  id?: number;
  name?: string;
  url?: string;
  mime?: string;
  size?: number;
  width?: number;
  height?: number;
  alternativeText?: string | null;
  provider?: string;
};

const optimizedNamePattern = /(?:\.optimized|\.ai-optimized)\.(?:avif|webp|jpg|jpeg|png)$/i;

function getWebhookUrl() {
  return process.env.N8N_IMAGE_WEBHOOK_URL?.trim();
}

function getWebhookSecret() {
  return process.env.N8N_IMAGE_WEBHOOK_SECRET?.trim();
}

function isImage(file: UploadFile) {
  return Boolean(file.mime?.startsWith('image/')) && !optimizedNamePattern.test(file.name || '');
}

async function notifyN8n(file: UploadFile) {
  const webhookUrl = getWebhookUrl();
  const webhookSecret = getWebhookSecret();

  if (!webhookUrl || !webhookSecret || !file.id || !isImage(file)) {
    return;
  }

  const payload = JSON.stringify({
    event: 'media.created',
    file: {
      id: file.id,
      name: file.name,
      url: file.url,
      mime: file.mime,
      size: file.size,
      width: file.width,
      height: file.height,
      alternativeText: file.alternativeText,
      provider: file.provider,
    },
    createdAt: new Date().toISOString(),
  });
  const signature = crypto.createHmac('sha256', webhookSecret).update(payload).digest('hex');

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-strapi-image-secret': webhookSecret,
        'x-strapi-image-signature': signature,
      },
      body: payload,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      strapi.log.warn(`[image-optimization] n8n returned HTTP ${response.status}`);
    }
  } catch (error) {
    strapi.log.warn(`[image-optimization] n8n notification failed: ${error}`);
  }
}

export default {
  async afterCreate(event: { result?: UploadFile }) {
    if (event.result) {
      await notifyN8n(event.result);
    }
  },
};