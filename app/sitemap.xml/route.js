import { getAllPosts } from '@/lib/blog';

export const revalidate = 60;

export async function GET() {
  const baseUrl = 'https://rankersmind.com';

  // Static pages
  const staticRoutes = ['', '/about', '/services', '/contact', '/blog'];

  // ✅ Await the posts
  const posts = await getAllPosts();

  // Tag routes
  const tagSet = new Set();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag.toLowerCase()));
  });
  const tagRoutes = [...tagSet].map(tag => `/blog/tag/${tag}`);

  // Sitemap URLs
  const urls = [
    // Static pages
    ...staticRoutes.map(route => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `),

    // Blog posts
    ...posts.map(post => `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
    `),

    // Tag pages
    ...tagRoutes.map(tagUrl => `
      <url>
        <loc>${baseUrl}${tagUrl}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `),
  ];

  // Return XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${urls.join('')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
