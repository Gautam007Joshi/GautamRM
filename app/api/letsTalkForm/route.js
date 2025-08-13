// app/api/letsTalkForm/route.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1) handle POST
export async function POST(req) {
  const { fullname, email, phone, service, message } = await req.json();

  // 1) Email TO Rankers Mind (detailed lead sheet)
const toCompany = {
  from: `"Rankers Mind" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: `🎯 New Lead – ${service}`,
  html: `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;line-height:1.45;color:#1e293b;background:#f8fafc;padding:24px;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.06);">
        <!-- header -->
        <div style="background:#2563eb;padding:20px 28px;color:#fff;">
          <h2 style="margin:0;font-size:20px;font-weight:600;">New Contact-Form Entry</h2>
          <p style="margin:4px 0 0;font-size:13px;opacity:.9;">${new Date().toLocaleString('en-IN')}</p>
        </div>

        <!-- body -->
        <div style="padding:28px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="width:120px;font-weight:600;vertical-align:top;padding-bottom:12px;">Name</td>
              <td style="vertical-align:top;">${fullname}</td>
            </tr>
            <tr>
              <td style="font-weight:600;padding-bottom:12px;">Email</td>
              <td><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight:600;padding-bottom:12px;">Phone</td>
              <td><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone || '—'}</a></td>
            </tr>
            <tr>
              <td style="font-weight:600;padding-bottom:12px;">Service</td>
              <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:4px;font-size:13px;">${service}</span></td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:8px;">
                <div style="background:#f1f5f9;border-left:3px solid #2563eb;padding:12px 16px;border-radius:4px;font-size:13px;white-space:pre-wrap;">${message}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
};

// 2) Thank-you email TO the visitor (friendly & professional)
const toVisitor = {
  from: `"Rankers Mind" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: 'Thanks for reaching out – Rankers Mind',
  html: `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.55;color:#1e293b;background:#f8fafc;padding:24px;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.06);">
        <!-- hero -->
        <div style="background:#2563eb;padding:32px 28px;text-align:center;">
          <img src="https://rankersmind.com/logo.png" alt="Rankers Mind" style="height:40px;margin-bottom:8px;">
          <h2 style="color:#fff;margin:0;font-weight:600;">Hi ${fullname}</h2>
        </div>

        <!-- content -->
        <div style="padding:28px;">
          <p>Thanks for reaching out to <strong>Rankers Mind</strong> about <strong style="color:#2563eb;">${service}</strong>!</p>
          <p>Your message is safely in our inbox and we’re already reviewing it. One of our strategists will get back to you <strong>within one business day</strong> with next steps.</p>

          <div style="background:#f1f5f9;padding:16px;border-radius:6px;margin:20px 0;">
            <strong>Need something urgent?</strong><br>
            Ping us on <a href="https://wa.me/919269529252" style="color:#2563eb;">WhatsApp</a> or call <a href="tel:+919269529252" style="color:#2563eb;">+91 92695 29252</a>.
          </div>

          <p>In the meantime, feel free to browse our <a href="https://rankersmind.com/blog" style="color:#2563eb;">latest insights</a>.</p>

          <p style="margin-top:28px;">Looking forward to creating something amazing together!</p>

          <div style="margin-top:32px;">
            <strong style="color:#2563eb;">– The Rankers Mind Team</strong><br>
            <small style="color:#64748b;">Digital Marketing & Development</small>
          </div>
        </div>

        <!-- footer -->
        <div style="background:#f8fafc;padding:16px 28px;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">
          Rankers Mind, Jaipur, Rajasthan, India<br>
          <a href="https://rankersmind.com" style="color:#2563eb;">rankersmind.com</a>
        </div>
      </div>
    </div>
  `,
};

  await transporter.sendMail(toCompany);
  await transporter.sendMail(toVisitor);

  return Response.json({ ok: true });
}