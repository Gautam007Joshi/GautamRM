export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://rankersmind.com/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
