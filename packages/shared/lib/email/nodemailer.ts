const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 10,
    maxMessages: Infinity,
    host: 'smtp-relay.brevo.com', 
    port: 587, 
    secure: false, 
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.NEXT_PUBLIC_BREVO_USERNAME,
        pass: process.env.NEXT_PUBLIC_BREVO_PASSWORD,
    }
});

export default async function sendEmail(recipient: any, content: string, subject: string, template: any) {
  try {
    if (!template) {
      throw new Error('No template returned from getBrevoTemplate');
    }
    
    const { id, firstname, lastname, email } = recipient
    await transporter.sendMail({
      from: `Rewards Ripple ${process.env.NEXT_PUBLIC_BREVO_EMAIL}`,
      to: email,
      subject: subject,
      text: template.subject,
      html: template.htmlContent,
    });
    console.log(`Email sent to ${firstname} successfully!`);
    
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
  }
}

