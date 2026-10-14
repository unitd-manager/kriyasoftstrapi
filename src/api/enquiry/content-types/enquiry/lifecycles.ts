const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default {
  async afterCreate(event) {
    const { result } = event;
    const name = result.name || 'Not provided';
    const email = result.email || 'Not provided';
    const enquiryType =
      result.enquiry_type || 'Website Contact Form';
    const comments = result.comments || '';
    const subjectName = String(
      result.name || 'Website visitor'
    ).replace(/[\r\n]+/g, ' ').trim();
    const subject = `New contact enquiry from ${subjectName}`
      .slice(0, 120)
      .trim();

    try {
      await strapi.plugin('email').service('email').send({
        to: process.env.CONTACT_RECEIVER_EMAIL,

        replyTo: result.email,

        subject,

        text: `
New contact form enquiry

Name: ${name}
Email: ${email}
Enquiry Type: ${enquiryType}

Message:
${comments || 'No message provided'}
        `,

        html: `
          <h2>New contact enquiry</h2>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Enquiry Type:</strong>
            ${escapeHtml(enquiryType)}
          </p>

          <h3>Message</h3>

          <p>
            ${escapeHtml(comments).replace(/\r\n|\r|\n/g, '<br />')}
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