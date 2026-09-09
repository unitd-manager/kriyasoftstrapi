# Strapi image optimization with n8n

This project emits a webhook after an image is created in Strapi. The workflow in `n8n/strapi-image-optimization.json` downloads the original, creates a WebP through Cloudinary, uploads the optimized file to Strapi, and deletes the original.

## 1. Strapi environment

Add these variables to the Strapi `.env` file:

```dotenv
N8N_IMAGE_WEBHOOK_URL=https://n8n.example.com/webhook/strapi-image-optimization
N8N_IMAGE_WEBHOOK_SECRET=use-a-long-random-secret
STRAPI_PUBLIC_URL=https://cms.example.com
```

The hook refuses to notify n8n when either webhook setting is absent. It also ignores filenames ending in `.optimized.webp`, preventing an optimization loop.

## 2. n8n setup

1. Import `n8n/strapi-image-optimization.json`.
2. Create a Header Auth credential for the Webhook node. Use header `x-strapi-image-secret` and the same value as `N8N_IMAGE_WEBHOOK_SECRET`.
3. In n8n, define `STRAPI_URL`, `STRAPI_API_TOKEN`, `CLOUDINARY_CLOUD_NAME`, and `CLOUDINARY_UPLOAD_PRESET` as environment variables. The Strapi token must be an API token allowed to upload and delete media.
4. In Cloudinary, create an unsigned upload preset restricted to images. Set the transformation to `f_webp,q_auto:good`, with a maximum width appropriate for the site, for example `w_2400,c_limit`.
5. Test with the Webhook node's test URL, then activate the workflow and change the Strapi URL to the production URL.

The Webhook node intentionally responds immediately. Image processing can take longer than the upload request timeout, and Strapi must not fail an editor's upload because n8n is temporarily unavailable.

## 3. Important production checks

- Use HTTPS for both Strapi and n8n. Keep the webhook secret and Strapi token in credentials or environment variables, never in the workflow JSON.
- Run the workflow with retries on the Cloudinary and Strapi HTTP nodes. Do not delete the original until the optimized upload succeeds.
- Configure an n8n Error Trigger workflow that alerts on failed executions. A failed run leaves the original media intact and can safely be retried.
- Back up the media storage before the first production run. The workflow replaces the media record, so references to the old file ID are not preserved by Strapi.
- If existing entries must be migrated, run a separate one-shot workflow that lists `/api/upload/files`, filters out `.optimized.webp`, and feeds each item into the same processing branch. Do not point that migration at the webhook directly.

## SEO behavior

The workflow preserves an existing Strapi `alternativeText`. If it is empty, it derives readable alt text from the original filename. This is intentionally deterministic: AI-generated alt text should be reviewed for accessibility and should not be invented silently for important editorial images. A separate n8n AI branch can generate a suggestion and send it to an approval queue before updating `alternativeText`.