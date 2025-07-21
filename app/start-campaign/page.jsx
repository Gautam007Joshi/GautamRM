'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/StartCampaign.module.css';
import {
  FaEnvelope, FaWhatsapp, FaPhone,
  FaSearch, FaBullhorn, FaGoogle, FaLightbulb,
  FaEnvelope as EmailIcon, FaCode, FaPenFancy, FaChartLine,
  FaMobileAlt, FaRobot
} from 'react-icons/fa';
import gsap from 'gsap';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import SplashScreen from '@/components/splash/SplashScreen';


const SERVICES = [
  { key: 'seo', title: 'SEO Optimization', desc: 'Improve visibility on search engines.', icon: <FaSearch /> },
  { key: 'social', title: 'Social Media Marketing', desc: 'Grow your social audience.', icon: <FaBullhorn /> },
  { key: 'ppc', title: 'Google Ads (PPC)', desc: 'Drive leads with ad campaigns.', icon: <FaGoogle /> },
  { key: 'branding', title: 'Brand Strategy', desc: 'Build a memorable brand.', icon: <FaLightbulb /> },
  { key: 'email', title: 'Email Marketing', desc: 'Nurture your audience by email.', icon: <EmailIcon /> },
  { key: 'web', title: 'Web Development', desc: 'Fast, SEO-friendly websites.', icon: <FaCode /> },
  { key: 'content', title: 'Content Creation', desc: 'Engaging content that converts.', icon: <FaPenFancy /> },
  { key: 'analytics', title: 'Analytics & Reporting', desc: 'Track insights & trends.', icon: <FaChartLine /> },
  { key: 'app', title: 'App Development', desc: 'iOS & Android apps.', icon: <FaMobileAlt /> },
  { key: 'ai', title: 'AI Development', desc: 'Automate and optimize with AI.', icon: <FaRobot /> }
];

const SERVICE_DETAILS = {
  seo: {
    title: 'In-Depth SEO Campaign',
    paragraphs: [
      'We perform comprehensive keyword research targeting high-converting terms tailored to your niche.',
      'Technical SEO audit: optimize site speed, mobile UX, and site architecture for crawlability.',
      'Content strategy & creation: pillar pages, blogs & resources focused on your audience.',
      'Link-building outreach with high-authority publications to boost domain rating.',
      'Ongoing optimization: monthly reviews, analytics insights, adjustments.'
    ]
  },
  social: {
    title: 'Social Media Mastery',
    paragraphs: [
      'Platform analysis (Facebook, Instagram, LinkedIn) to target your ideal customers.',
      'Custom content calendar with compelling visuals and copy.',
      'Engagement strategies: story polls, quizzes, user-generated campaigns.',
      'Ad retargeting to convert engaged users.',
      'In-depth analytics: reach, engagement, follower growth & ROI.'
    ]
  },
  ppc: {
    title: 'Google Ads (PPC) Campaign',
    paragraphs: [
      'Keyword research with negative keyword filtering for relevancy and efficiency.',
      'Smart bidding strategies (CPA, ROAS) to maximize ROI.',
      'Ad copy testing & optimization to improve Quality Scores.',
      'Conversion tracking and landing page performance upgrades.',
      'Weekly budget pacing and performance reporting.'
    ]
  },
  branding: {
    title: 'Brand Strategy Development',
    paragraphs: [
      'Brand discovery workshop to define your mission, voice & tone.',
      'Visual identity creation: logo, color palette, typography.',
      'Brand messaging guidelines for consistent communications.',
      'Positioning strategy to differentiate in the marketplace.',
      'Brand rollout across all touchpoints: digital, print, and social.'
    ]
  },
  email: {
    title: 'Email Marketing Automation',
    paragraphs: [
      'List segmentation based on behaviors, interests, and lifecycle stage.',
      'Design & setup of automated workflows: welcome, nurture, cart abandonment.',
      'Personalized & dynamic content for increased open and click-through rates.',
      'A/B testing subject lines, content and send time for optimal performance.',
      'Monthly deliverability monitoring, list hygiene and campaign reporting.'
    ]
  },
  web: {
    title: 'Web Development Package',
    paragraphs: [
      'Responsive & SEO-friendly design tailored to your brand.',
      'Fast loading, optimized images, lazy-loading and standard best practices.',
      'CMS integration (WordPress, Webflow) for easy updates.',
      'Conversion rate optimization: CTA placement, UX flows, tracking.',
      'Quality testing across browsers & devices, with ongoing support.'
    ]
  },
  content: {
    title: 'Content Creation Suite',
    paragraphs: [
      'Buyer persona-driven content planning and keyword mapping.',
      'In-depth articles, guides, infographics & videos that captivate.',
      'SEO optimization: internal linking, meta, schema tags.',
      'Regular performance review & content refresh to stay current.',
      'Custom distribution via newsletters & social media amplification.'
    ]
  },
  analytics: {
    title: 'Analytics & Reporting Framework',
    paragraphs: [
      'Full audit of Google Analytics, Tag Manager, and tracking setup.',
      'Custom dashboards showing KPIs: traffic, sessions, conversion, ROI.',
      'Event tracking: forms, clicks, scroll-depth & micro-conversions.',
      'Heatmaps & session recordings (Hotjar) for UX insights.',
      'Monthly analysis & QBR for data-driven strategy shifts.'
    ]
  },
  app: {
    title: 'App Development Solution',
    paragraphs: [
      'Requirements gathering and wireframes for iOS & Android.',
      'UI/UX design following the latest material and iOS trends.',
      'Backend integration with CMS, APIs, payments, push notifications.',
      'App store optimization for better visibility & downloads.',
      'Launch, bug fixes, tracking, and a roadmap for future updates.'
    ]
  },
  ai: {
    title: 'AI Development Services',
    paragraphs: [
      'AI use-case workshop: chatbots, data insights, automation workflows.',
      'Model design & selection (GPT, custom NLP, predictive ML).',
      'Prototype development and feedback loop integration.',
      'System implementation & API integrations with existing tools.',
      'Ongoing tuning, monitoring, and performance evaluation.'
    ]
  }
};

export default function StartCampaign() {
  const [showSplash, setShowSplash] = useState(true);

  const [contactMethod, setContactMethod] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const formRef = useRef(null);
  const clickAudio = useRef(null);

  const handleWhatsApp = () => {
  const service = SERVICES.find(s => s.key === selectedService);
  const serviceName = service ? service.title : 'Digital Marketing';
  const message = `Hi, I'm interested in your "${serviceName}" campaign. Can you share more details?`;

  const url = `https://wa.me/919269529252?text=${encodeURIComponent(message)}`;


  window.open(url, '_blank');
};



  const handleCall = () => window.open('tel:+919269529252');

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
    }
  }, [contactMethod]);

  useEffect(() => {
  clickAudio.current = new Audio('/click.mp3');
}, []);

useEffect(() => {
  if (showSplash) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [showSplash]);



  return (
    <>
    <SplashScreen
    text="Start Your Campaign"
    onComplete={() => setShowSplash(false)}
  />

  <div
    style={{
      visibility: showSplash ? 'hidden' : 'visible',
      opacity: showSplash ? 0 : 1,
      transition: 'opacity 0.4s ease-in-out',
    }}
  />
    <Navbar/>
    <main className={styles.mainWrap}>

      {/* Hero */}
      <section className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Launch Your <span>Growth Campaign</span></h1>
        <p className={styles.heroSubtitle}>Data-driven strategies that boost <strong>traffic, leads & revenue</strong>.</p>
      </section>

      {/* Services */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Select Your Campaign Type</h2>
        <div className={styles.servicesGrid}>
          {SERVICES.map(s => (
            <div
              key={s.key}
              className={`${styles.serviceCard} ${selectedService === s.key ? styles.activeService : ''}`}
              onClick={() => {
  if (clickAudio.current) {
    clickAudio.current.currentTime = 0; // rewind if already playing
    clickAudio.current.play();
  }

  setContactMethod('');
  setSelectedService(selectedService === s.key ? null : s.key);
}}

            >
              <div className={styles.cardIcon}>{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Only show below sections when a service is selected */}
      {selectedService && (
        <>
          {/* Deep Dive */}
          <section className={styles.detailDive}>
            <h2>{SERVICE_DETAILS[selectedService].title}</h2>
            {SERVICE_DETAILS[selectedService].paragraphs.map((p, i) => (
              <p key={i} className={styles.detailPara}>{p}</p>
            ))}
          </section>

          {/* Contact Method */}
          <section className={styles.contactChoiceAnimated}>
            <h2 className={styles.contactTitle}>Choose How You’d Like Us to Connect</h2>
            <div className={styles.contactCardWrap}>
              <div
                className={`${styles.contactCard} ${contactMethod === 'email' ? styles.selected : ''}`}
                onClick={() => setContactMethod('email')}
              >
                <FaEnvelope className={styles.icon} /><h3>Email Us</h3>
              </div>
              <div className={styles.contactCard} onClick={handleWhatsApp}><FaWhatsapp className={styles.icon} /><h3>WhatsApp Us</h3></div>
              <div className={styles.contactCard} onClick={handleCall}><FaPhone className={styles.icon} /><h3>Call Us</h3></div>
            </div>
          </section>

          {/* Email Form */}
          {contactMethod === 'email' && (
            <form className={styles.premiumForm} ref={formRef}>
              <div className={styles.formGroup}>
                <label>🌐 Website URL</label>
                <input type="url" name="url" required />
              </div>
              <div className={styles.formGroup}>
                <label>📩 Email</label>
                <input type="email" name="email" required />
              </div>
              <div className={`${styles.formGroup} ${styles.phoneGroup}`}>
                <label>📞 Phone</label>
                <div className={styles.phoneWrapper}>
                  <select name="countryCode" className={styles.countryCode}>
                    <option value="+91">🇮🇳 India (+91)</option>
    <option value="+1">🇺🇸 United States (+1)</option>
    <option value="+44">🇬🇧 United Kingdom (+44)</option>
    <option value="+61">🇦🇺 Australia (+61)</option>
    <option value="+81">🇯🇵 Japan (+81)</option>
    <option value="+49">🇩🇪 Germany (+49)</option>
    <option value="+33">🇫🇷 France (+33)</option>
    <option value="+971">🇦🇪 UAE (+971)</option>
    <option value="+65">🇸🇬 Singapore (+65)</option>
    <option value="+86">🇨🇳 China (+86)</option>
    <option value="+880">🇧🇩 Bangladesh (+880)</option>
    <option value="+92">🇵🇰 Pakistan (+92)</option>
    <option value="+7">🇷🇺 Russia (+7)</option>
    <option value="+34">🇪🇸 Spain (+34)</option>
    <option value="+39">🇮🇹 Italy (+39)</option>
    <option value="+55">🇧🇷 Brazil (+55)</option>
    <option value="+20">🇪🇬 Egypt (+20)</option>
    <option value="+60">🇲🇾 Malaysia (+60)</option>
    <option value="+82">🇰🇷 South Korea (+82)</option>
    <option value="+62">🇮🇩 Indonesia (+62)</option>
    <option value="+351">🇵🇹 Portugal (+351)</option>
    <option value="+90">🇹🇷 Turkey (+90)</option>
    <option value="+48">🇵🇱 Poland (+48)</option>
    <option value="+31">🇳🇱 Netherlands (+31)</option>
    <option value="+46">🇸🇪 Sweden (+46)</option>
    <option value="+358">🇫🇮 Finland (+358)</option>
    <option value="+98">🇮🇷 Iran (+98)</option>
    <option value="+66">🇹🇭 Thailand (+66)</option>
    <option value="+254">🇰🇪 Kenya (+254)</option>
    <option value="+27">🇿🇦 South Africa (+27)</option>
                  </select>
                  <input type="tel" name="phone" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>📈 Campaign Goal</label>
                <textarea name="goal" rows="3" required placeholder="e.g., Increase leads by 50%" />
              </div>
              <button type="submit" className={styles.glowSubmitBtn}>Launch My {SERVICES.find(s => s.key === selectedService).title}</button>
            </form>
          )}

          {/* FAQs */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>FAQs About {SERVICES.find(s => s.key === selectedService)?.title}</h2>
            <details className={styles.faqItem}><summary>How long does it take to see results?</summary>
              <p>
                While initial improvements are noticeable in the first 3–4 weeks (especially technical fixes), meaningful results for campaigns like SEO, branding, or content marketing typically take 3–6 months.
              </p>
            </details>
            <details className={styles.faqItem}><summary>What kind of ROI can I expect?</summary>
              <p>
                ROI varies by service and industry, but our data-backed approach ensures that every rupee spent is optimized for measurable returns like conversions, engagement, or visibility.
              </p>
            </details>
            <details className={styles.faqItem}><summary>Do you customize the campaign based on my business?</summary>
              <p>
                Absolutely! We tailor each campaign after understanding your goals, audience, and competitors. Our services are never “one-size-fits-all”.
              </p>
            </details>
            <details className={styles.faqItem}><summary>Can I change my campaign later?</summary>
              <p>
                Yes — we’re flexible. Whether you want to upgrade to a larger package or combine services like email + content + analytics, we’ll make it work seamlessly.
              </p>
            </details>
          </section>
        </>
      )}

      {/* Footer CTA */}
      <section className={styles.footerCTA}>
        <p>Ready to start?</p>
        <button onClick={() => window.scrollTo(0, 0)}>Start Your Campaign ⬆️</button>
      </section>


    
    </main>
    <div className="footerWrapper">
  <Footer />
</div>


    </>
  );
}
