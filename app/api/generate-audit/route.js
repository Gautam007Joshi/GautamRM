import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateAuditPDF } from '@/components/utils/generateAuditPDF';

export async function POST(req) {
  try {
    const { url, email, phone } = await req.json();
    const apiKey = process.env.PAGESPEED_API_KEY;

    if (!url || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 🧠 Function to fetch Lighthouse metrics
    const getScores = async (strategy) => {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=seo&category=best-practices&category=pwa&key=${apiKey}`
      );

      const data = await res.json();
      const cats = data?.lighthouseResult?.categories || {};

      const score = (key) => {
        const raw = cats[key]?.score;
        return raw != null ? Math.round(raw * 100) : 'N/A';
      };

      // 🔐 Security score (based on response headers)
      const checkSecurityHeaders = (headers) => {
        const required = ['content-security-policy', 'x-frame-options', 'strict-transport-security'];
        let score = 0;
        required.forEach(h => { if (headers[h]) score++; });
        return Math.round((score / required.length) * 100);
      };

      const pageUrl = new URL(url);
      const secRes = await fetch(pageUrl.origin);
      const secHeaders = Object.fromEntries(secRes.headers.entries());
      const security = checkSecurityHeaders(secHeaders);

      return {
        performance: score('performance'),
        accessibility: score('accessibility'),
        bestPractices: score('best-practices'),
        seo: score('seo'),
        pwa: score('pwa'),
        security
      };
    };

    const desktop = await getScores('desktop');
    const mobile = await getScores('mobile');

    // 🧾 Generate PDF with charts
    const pdfBuffer = await generateAuditPDF({
      url,
      desktopScores: desktop,
      mobileScores: mobile
    });

    // 📧 Email config
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Rankers Mind" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📊 Website Audit Report for ${url}`,
      html: `
        <p>Hi there,</p>
        <p>Find attached your full website audit report.</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p>Regards,<br/>Rankers Mind</p>
      `,
      attachments: [{
        filename: 'audit-report.pdf',
        content: pdfBuffer
      }],
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('❌ API ERROR:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
