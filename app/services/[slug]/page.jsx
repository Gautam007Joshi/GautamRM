// ✅ Don't use "use client" here – keep it a server component
import ServicePageClient from './ServicePageClient';

// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  const slug = params?.slug;

  const slugMap = {
    'web-development': 'webDev',
    'ai-development': 'aiDev',
    'app-development': 'appDev',
    'social-media': 'socialMedia',
    'email': 'email',
    'branding': 'branding',
    'analytics': 'analytics',
    'seo': 'seo',
    'ppc': 'ppc',
    'content': 'content',
  };

  const mappedSlug = slugMap[slug];

  if (!mappedSlug) {
    return {
      title: 'Service Not Found | Rankers Mind',
      description: 'The requested service does not exist.',
    };
  }

  try {
    const dataModule = await import(`../data/${mappedSlug}.js`);
    const data = dataModule.default;

    return {
      title: data.metaTitle || `${data.titleLine1} | Rankers Mind`,
      description:
        data.metaDescription || data.description || 'Explore our services at Rankers Mind.',
    };
  } catch (error) {
    return {
      title: 'Service Not Found | Rankers Mind',
      description: 'The requested service does not exist.',
    };
  }
}

export default function Page({ params }) {
  return <ServicePageClient slug={params.slug} />;
}
