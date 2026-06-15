import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}

export function getConsultationEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B3AA8; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">OLUS-BIS Immigration Services</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #0B3AA8;">New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Type:</strong> ${data.type}</p>
      </div>
      <div style="background: #082A78; padding: 20px; text-align: center; color: white; font-size: 12px;">
        <p>OLUS-BIS Immigration Services &copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  `;
}

export function getContactEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone?: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B3AA8; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">OLUS-BIS Immigration Services</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #0B3AA8;">New Contact Message</h2>
        <p><strong>From:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="background: white; padding: 15px; border-radius: 5px;">${data.message}</p>
      </div>
      <div style="background: #082A78; padding: 20px; text-align: center; color: white; font-size: 12px;">
        <p>OLUS-BIS Immigration Services &copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  `;
}
