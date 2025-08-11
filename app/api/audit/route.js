import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { url, email, phone, message } = await req.json();

    if (!url || !email || !phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&category=performance&category=accessibility&category=seo&category=best-practices&key=${apiKey}`;

    const apiRes = await fetch(apiUrl);
    const json = await apiRes.json();

    if (!json.lighthouseResult) {
      return new Response(JSON.stringify({ error: "No Lighthouse data found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const categories = json.lighthouseResult.categories;

    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <!-- Header -->
    <div style="background-color: #0D47A1; padding: 20px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
      <h1 style="margin: 0; font-size: 26px;">📊 Website Audit Report</h1>
      <p style="margin: 0; font-size: 14px; color: white;">Prepared for: ${url}</p>
    </div>

    <!-- Body -->
    <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px;">
      <p style="font-size: 16px; color: #333;">
        Hello,
      </p>
      <p style="font-size: 16px; color: #333;">
        Here is your audit summary for <strong>${url}</strong>. These are the brief insights of your website.
      </p>

      <!-- Score Table -->
      <table style="border-collapse: collapse; width: 100%; margin-top: 20px; font-size: 15px;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="padding: 10px; border: 1px solid #ddd;">Category</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Score</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { label: "Performance", value: scores.performance },
            { label: "Accessibility", value: scores.accessibility },
            { label: "Best Practices", value: scores.bestPractices },
            { label: "SEO", value: scores.seo },
          ]
            .map(
              (s) => `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${s.label}</td>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: ${
                  s.value >= 90
                    ? "#2E7D32" // green
                    : s.value >= 50
                    ? "#ED6C02" // orange
                    : "#C62828" // red
                };">${s.value}%</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>

      <!-- Client Info -->
      <div style="margin-top: 20px; padding: 15px; background-color: #f4f8ff; border-radius: 6px;">
        <strong>Contact Information Provided:</strong><br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
      </div>

      <!-- CTA -->
      <div style="margin-top: 30px; padding: 15px; background-color: #E3F2FD; border-left: 4px solid #0D47A1;">
        <p style="margin: 0; font-size: 15px; color: #0D47A1;">
          📌 For a detailed audit of your website, contact us at 
          <a href="mailto:info@rankersmind.com" style="color: #0D47A1; font-weight: bold;">info@rankersmind.com</a>
        </p>
      </div>

      <!-- Footer -->
      <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
        © ${new Date().getFullYear()} RankersMind — Digital Marketing That Delivers Results
      </p>
    </div>
  </div>
`;


    await transporter.sendMail({
      from: `"Website Audit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Audit Report for ${url}`,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ message: "Audit email sent successfully", scores }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Audit Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
