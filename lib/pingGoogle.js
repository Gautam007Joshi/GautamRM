import { NextResponse } from 'next/server';

export async function GET() {
  const sitemapUrl = 'https://gautam-rm.vercel.app/sitemap.xml';
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const res = await fetch(pingUrl);

    if (res.ok) {
      return NextResponse.json({ success: true, message: '✅ Google ping successful.' });
    } else {
      return NextResponse.json({ success: false, error: `❌ Google ping failed. Status: ${res.status}` });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
