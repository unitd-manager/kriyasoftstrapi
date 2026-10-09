export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugin('email').service('email').send({
        to: process.env.CONTACT_RECEIVER_EMAIL,

        replyTo: result.email,

        subject: `New contact enquiry from ${
          result.name || 'Website visitor'
        }`,

        text: `
New contact form enquiry

Name: ${result.name || 'Not provided'}
Email: ${result.email || 'Not provided'}
Enquiry Type: ${
          result.enquiry_type || 'Website Contact Form'
        }

Message:
${result.comments || 'No message provided'}
        `,

        html: `
          <h2>New contact enquiry</h2>

          <p>
            <strong>Name:</strong>
            ${result.name || 'Not provided'}
          </p>

          <p>
            <strong>Email:</strong>
            ${result.email || 'Not provided'}
          </p>

          <p>
            <strong>Enquiry Type:</strong>
            ${
              result.enquiry_type ||
              'Website Contact Form'
            }
          </p>

          <h3>Message</h3>

          <p>
            ${String(result.comments || '').replace(
              /\n/g,
              '<br />'
            )}
          </p>
        `,
      });

      strapi.log.info(
        'Contact enquiry email sent successfully.'
      );
    } catch (error) {
      strapi.log.error(
        'Failed to send contact enquiry email:',
        error
      );
    }
  },
};