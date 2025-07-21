import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

// ✅ Polyfill for fetch if not available (Node <18)
if (typeof fetch === 'undefined') {
  global.fetch = (await import('node-fetch')).default;
}

export async function generateAuditPDF({ url, desktopScores, mobileScores }) {
  const templatePath = path.resolve(process.cwd(), 'components/utils/auditTemplate.html');
  let html = await fs.readFile(templatePath, 'utf-8');

  // ✅ Prepare chart data payload
  const payload = {
    labels: ['Performance', 'Accessibility', 'SEO', 'Best Practices'],
    desktopData: [
      Number(desktopScores.performance) || 0,
      Number(desktopScores.accessibility) || 0,
      Number(desktopScores.seo) || 0,
      Number(desktopScores.bestPractices) || 0,
    ],
    mobileData: [
      Number(mobileScores.performance) || 0,
      Number(mobileScores.accessibility) || 0,
      Number(mobileScores.seo) || 0,
      Number(mobileScores.bestPractices) || 0,
    ],
  };

  // ✅ Fetch BAR chart
  let chartBase64 = '';
  try {
    const chartRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!chartRes.ok) throw new Error(`Bar chart failed: ${chartRes.status}`);
    const chartData = await chartRes.json();
    chartBase64 = chartData?.chart || '';
  } catch (err) {
    console.error('❌ Bar chart fetch error:', err);
  }

  // ✅ Fetch RADAR chart
  let radarChartBase64 = '';
  try {
    const radarRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chart/radar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!radarRes.ok) throw new Error(`Radar chart failed: ${radarRes.status}`);
    const radarData = await radarRes.json();
    radarChartBase64 = radarData?.chart || '';
  } catch (err) {
    console.error('❌ Radar chart fetch error:', err);
  }

  // ✅ Replace all placeholders in HTML template
  const replace = (key, value) =>
    (html = html.replace(new RegExp(`{{${key}}}`, 'g'), value || 'N/A'));

  replace('url', url);
  replace('date', new Date().toLocaleDateString());
  replace('chartImageBase64', chartBase64);
  replace('radarChartBase64', radarChartBase64);

  const keys = ['performance', 'accessibility', 'bestPractices', 'seo', 'pwa', 'security'];
  keys.forEach((key) => {
    replace(`desktop.${key}`, desktopScores[key]);
    replace(`mobile.${key}`, mobileScores[key]);
  });

  // ✅ Generate PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
}
