export default ({ env }) => {
  const bucket = env('AWS_BUCKET');
  const region = env('AWS_REGION');
  const cdnUrl = env('CDN_URL');

  if (bucket && (!region || !cdnUrl)) {
    throw new Error(
      'AWS_REGION and CDN_URL must be set when AWS_BUCKET is configured.'
    );
  }

  return {
    email: {
      config: {
        provider: 'nodemailer',

        providerOptions: {
          host: env('SMTP_HOST'),
          port: env.int('SMTP_PORT', 587),
          secure: env.bool('SMTP_SECURE', false),

          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },

        settings: {
          defaultFrom: env('SMTP_FROM'),
          defaultReplyTo: env('SMTP_REPLY_TO'),
        },
      },
    },
    ...(bucket
      ? {
          upload: {
            config: {
              provider: 'aws-s3',
              providerOptions: {
                baseUrl: cdnUrl,
                s3Options: {
                  region,
                  params: {
                    Bucket: bucket,
                  },
                },
              },
              actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
              },
            },
          },
        }
      : {}),
  };
};