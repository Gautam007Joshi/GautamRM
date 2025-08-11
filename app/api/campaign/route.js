// app/api/send-lead/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, email, countryCode, phone, goal, service } = body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,      // send to yourself
      subject: `New Campaign Lead – ${service || 'Unknown Service'}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.6; color:#333;">
          <h2 style="color:#0066cc;">Campaign Lead Submission</h2>
          <table border="0" cellpadding="8">
            <tr><td><strong>Service:</strong></td><td>${service}</td></tr>
            <tr><td><strong>Website URL:</strong></td><td><a href="${url}">${url}</a></td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${countryCode} ${phone}</td></tr>
            <tr><td><strong>Campaign Goal:</strong></td><td>${goal}</td></tr>
          </table>
          <p style="margin-top:24px;">
            Please reach out within 24 hours to schedule the discovery call.
          </p>
          <hr>
          <small>Sent via Rankers Mind website</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send e-mail error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}