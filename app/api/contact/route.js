import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, phone, email } = await req.json();

    console.log('🟡 Incoming request data:', { name, phone, email });

    if (!name || !phone || !email) {
      console.warn('🔴 Missing one or more fields');
      return new Response(JSON.stringify({ message: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},
    });

    console.log('🟢 Transporter created');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Lead Submitted</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    console.log('📤 Sending email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Email send failed:', error);

    return new Response(JSON.stringify({ message: 'Email send failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
