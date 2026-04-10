import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: Bun.env.SMTP_HOST,
  port:  Number(Bun.env.SMTP_PORT),
  secure: true,
  auth: {
    user: Bun.env.SMTP_USER,
    pass: Bun.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {


  try {
    const info = await transporter.sendMail({
      from: `<${Bun.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error };
  }
}
