'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { serviceData } from '../data/index.js';
import { shouldShowSplash, markSplashShown } from '@/lib/splashFlag.js';
import SplitServiceForm from '@/components/services/ServiceFormSection.jsx';

const Navbar              = dynamic(() => import('@/components/sections/Navbar'));
const Footer              = dynamic(() => import('@/components/sections/Footer'));
const ServiceHero         = dynamic(() => import('@/components/services/ServiceHero'));
const StatsSection        = dynamic(() => import('@/components/services/ServiceStats'));
const ServiceHowWeWork    = dynamic(() => import('@/components/services/ServiceHowWeWork'));
const ServicePricingPlans = dynamic(() => import('@/components/services/ServicePricingPlans'));
const ServiceFAQ          = dynamic(() => import('@/components/services/ServiceFAQ'));
const SplashScreen        = dynamic(() => import('@/components/splash/SplashScreen'));

const splashTextMap = {
  'web-development': 'Building Beautiful Web Experiences',
  'ai-development': 'Empowering Your Business with AI',
  'app-development': 'Crafting Mobile Magic',
  'social-media': 'Let Your Brand Be Heard',
  'email': 'Emails That Convert',
  'branding': 'Your Identity, Reinvented',
  'analytics': 'Data That Drives Decisions',
  'seo': 'Climb the Ranks Organically',
  'ppc': 'Clicks That Count',
  'content': 'Content That Connects',
};

export default function ServicePageClient({ slug }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  // 1️⃣ decide per service if splash is needed
  useEffect(() => {
    setShowSplash(shouldShowSplash(slug));
  }, [slug]);

  // 2️⃣ load the service JSON (lazy chunk)
  useEffect(() => {
    setLoading(true);

    if (!serviceData[slug]) {
      setData(null);
      setLoading(false);
      return;
    }

    serviceData[slug]().then(setData).finally(() => setLoading(false));
  }, [slug]);

  if (!serviceData[slug]) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>404 - Service Not Found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {showSplash && (
        <SplashScreen
          key={slug}
          text={splashTextMap[slug] || 'Welcome to Rankers Mind'}
          onComplete={() => {
            markSplashShown(slug);
            setShowSplash(false);
          }}
        />
      )}

      <div style={{ transition: 'opacity 300ms', opacity: loading ? 0 : 1 }}>
        {data && (
          <>
            <Navbar />
            <ServiceHero {...data} />
            <StatsSection stats={data.stats} />
            <ServiceHowWeWork steps={data.howWeWork} />
            {data.pricingPlans && <ServicePricingPlans plans={data.pricingPlans} />}
            {data.faqs && <ServiceFAQ faqs={data.faqs} />}
            <SplitServiceForm slug={slug}/>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}