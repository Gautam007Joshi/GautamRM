// lib/pingGoogle.js (CommonJS version)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function pingGoogle() {
  const sitemapUrl = 'https://rankersmind.com/sitemap.xml';
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  const res = await fetch(pingUrl);
  if (!res.ok) {
    throw new Error(`❌ Google ping failed. Status: ${res.status}`);
  } else {
    console.log(`✅ Successfully pinged Google Sitemap: ${sitemapUrl}`);
  }
}

module.exports = { pingGoogle };
