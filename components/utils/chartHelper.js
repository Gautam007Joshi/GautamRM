import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 800;
const height = 400;
const backgroundColour = 'white';

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour,
});

/**
 * Generate a Bar Chart image (base64) comparing desktop vs mobile.
 */
export async function generateBarChart(labels, desktopData, mobileData) {
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
        title: { display: true, text: 'Desktop vs Mobile Audit Score' },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

/**
 * Generate a Radar Chart image (base64) comparing desktop vs mobile.
 */
export async function generateRadarChart(labels, desktopData, mobileData) {
  const config = {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: 'Desktop',
          data: desktopData,
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Mobile',
          data: mobileData,
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Audit Radar Chart' },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
        },
      },
    },
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}