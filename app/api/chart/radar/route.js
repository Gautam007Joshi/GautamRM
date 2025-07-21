export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function POST(req) {
  try {
    const { labels, desktopData, mobileData } = await req.json();

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 800,
      height: 500,
      backgroundColour: 'white',
    });

    const config = {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'Desktop',
            data: desktopData,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          },
          {
            label: 'Mobile',
            data: mobileData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '📌 Radar Comparison (Desktop vs Mobile)',
            font: { size: 18 },
            color: '#333',
          },
          legend: { position: 'top' },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 20, color: '#555' },
          },
        },
      },
    };

    const buffer = await chartJSNodeCanvas.renderToBuffer(config);
    const base64 = `data:image/png;base64,${buffer.toString('base64')}`;
    return NextResponse.json({ chart: base64 });
  } catch (err) {
    console.error("❌ Radar chart generation failed:", err);
    return NextResponse.json({ error: 'Radar chart generation failed' }, { status: 500 });
  }
}
