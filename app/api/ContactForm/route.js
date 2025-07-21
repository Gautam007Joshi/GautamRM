import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      referral,
      projectDetails,
    } = await req.json();

    if (!firstName || !lastName || !email || !referral || !projectDetails) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Referral:</strong> ${referral}</p>
        <p><strong>Project Details:</strong><br/>${projectDetails}</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return new Response(
      JSON.stringify({ message: 'Error sending email', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
