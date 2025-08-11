import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { first, last, email, company, message } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection
    await transporter.verify();

    // Email HTML template
    const html = `
      <!doctype html>
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
          <h2 style="color:#0077e6;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${first} ${last}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </body>
      </html>
    `;

    // Send email (FROM and TO are the same)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New lead – ${first} ${last}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
