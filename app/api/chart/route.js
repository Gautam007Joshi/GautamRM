export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function POST(req) {
  try {
    const { labels, desktopData, mobileData } = await req.json();

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 800,
      height: 400,
      backgroundColour: 'white',
    });

    const config = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Desktop',
            data: desktopData,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
          },
          {
            label: 'Mobile',
            data: mobileData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Audit Chart' },
        },
        scales: {
          y: { beginAtZero: true, max: 100 },
        },
      },
    };

    const buffer = await chartJSNodeCanvas.renderToBuffer(config);
    const base64 = `data:image/png;base64,${buffer.toString('base64')}`;
    return NextResponse.json({ chart: base64 });
  } catch (err) {
    console.error('❌ Bar chart generation failed:', err);
    return NextResponse.json({ error: 'Bar chart generation failed' }, { status: 500 });
  }
}
