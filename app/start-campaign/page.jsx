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
      'Unlock your website’s full potential with our comprehensive SEO strategies.',
      'Our team performs meticulous keyword research, targeting high-converting terms tailored to your niche.',
      'We conduct a thorough technical SEO audit, optimizing site speed, mobile UX, and site architecture for maximum crawlability.',
      'Our content strategy includes creating pillar pages, blogs, and resources that resonate with your audience.',
      'We build high-quality backlinks with reputable publications to enhance your domain authority.',
      'Our ongoing optimization includes monthly reviews, leveraging analytics insights for continuous improvement.'
    ]
  },
  social: {
    title: 'Social Media Mastery',
    paragraphs: [
      'Social media is more than just a platform; it’s a conversation. We help you join the dialogue in a way that feels authentic and impactful.',
      'We analyze your ideal customers across platforms like Facebook, Instagram, and LinkedIn, ensuring your message reaches the right ears.',
      'Our custom content calendar is a roadmap to engagement, filled with visuals and copy that captivate and inspire.',
      'Engagement strategies are not just tactics; they’re opportunities to build genuine connections. Polls, quizzes, and user-generated content bring your audience closer.',
      'Ad retargeting is about turning interest into action. We convert engaged users into loyal advocates.',
      'In-depth analytics are our compass, guiding us through the metrics of reach, engagement, follower growth, and ROI.'
    ]
  },
  ppc: {
    title: 'Google Ads (PPC) Campaign',
    paragraphs: [
      'In the competitive landscape of online advertising, our PPC campaigns are designed to make every click count.',
      'Keyword research is the foundation of our strategy. We filter out the noise to focus on terms that truly matter.',
      'Smart bidding strategies are our secret weapon. We maximize ROI with precision, ensuring every budget is well-spent.',
      'Ad copy testing is an art. We optimize to improve Quality Scores, making your ads stand out in a crowded field.',
      'Conversion tracking and landing page performance upgrades are our ongoing commitment to excellence.',
      'Weekly budget pacing and performance reporting keep you in the loop, ensuring transparency and control.'
    ]
  },
  branding: {
    title: 'Brand Strategy Development',
    paragraphs: [
      'Your brand is your promise to the world. Our brand discovery workshop helps you define your mission, voice, and tone with clarity.',
      'Visual identity is your brand’s face. We create logos, color palettes, and typography that reflect your essence.',
      'Brand messaging guidelines ensure consistency across all communications, reinforcing your brand’s story.',
      'Positioning strategy is about standing out. We help you carve a unique space in the marketplace.',
      'Brand rollout is a celebration. We ensure your brand shines across digital, print, and social touchpoints.'
    ]
  },
  email: {
    title: 'Email Marketing Automation',
    paragraphs: [
      'Email marketing is a direct line to your audience. Our list segmentation ensures your message reaches the right people at the right time.',
      'Design and setup of automated workflows are our way of turning leads into loyal customers.',
      'Personalized and dynamic content is the heartbeat of our email campaigns, driving open and click-through rates.',
      'A/B testing is our method of continuous improvement. We optimize subject lines, content, and send times for peak performance.',
      'Monthly deliverability monitoring, list hygiene, and campaign reporting keep your email strategy healthy and effective.'
    ]
  },
  web: {
    title: 'Web Development Package',
    paragraphs: [
      'Your website is your digital storefront. Our responsive and SEO-friendly design ensures it’s always open for business.',
      'Fast loading times and optimized images are our commitment to a seamless user experience.',
      'CMS integration gives you the power to update and manage your site with ease.',
      'Conversion rate optimization is our focus. We place CTAs strategically and track UX flows for maximum impact.',
      'Quality testing across browsers and devices ensures your site performs flawlessly, with ongoing support to keep it running smoothly.'
    ]
  },
  content: {
    title: 'Content Creation Suite',
    paragraphs: [
      'Content is the bridge between you and your audience. Our buyer persona-driven planning ensures your message resonates deeply.',
      'In-depth articles, guides, infographics, and videos are our tools for captivating and educating your audience.',
      'SEO optimization is our way of making sure your content is found. Internal linking, meta tags, and schema tags enhance visibility.',
      'Regular performance reviews and content refreshes keep your message current and relevant.',
      'Custom distribution via newsletters and social media amplifies your voice, ensuring it’s heard.'
    ]
  },
  analytics: {
    title: 'Analytics & Reporting Framework',
    paragraphs: [
      'Data is the language of success. Our full audit of Google Analytics, Tag Manager, and tracking setup ensures you’re speaking it fluently.',
      'Custom dashboards are our way of making data accessible. KPIs like traffic, sessions, conversion, and ROI are at your fingertips.',
      'Event tracking gives you insights into user behavior. Forms, clicks, scroll-depth, and micro-conversions tell a story.',
      'Heatmaps and session recordings provide a window into the user experience, guiding UX improvements.',
      'Monthly analysis and QBRs ensure your strategy evolves with the data, staying agile and effective.'
    ]
  },
  app: {
    title: 'App Development Solution',
    paragraphs: [
      'In a mobile-first world, your app is your brand’s ambassador. Our requirements gathering and wireframes ensure it’s built with purpose.',
      'UI/UX design follows the latest trends, ensuring your app feels modern and intuitive.',
      'Backend integration with CMS, APIs, payments, and push notifications keeps your app connected and functional.',
      'App store optimization is our way of making sure your app is found. Better visibility means more downloads.',
      'Launch is just the beginning. Bug fixes, tracking, and a roadmap for future updates ensure your app’s success.'
    ]
  },
  ai: {
    title: 'AI Development Services',
    paragraphs: [
      'AI is the future, and we’re here to help you navigate it. Our AI use-case workshop explores chatbots, data insights, and automation workflows.',
      'Model design and selection are tailored to your needs. Whether it’s GPT, custom NLP, or predictive ML, we find the right fit.',
      'Prototype development and feedback loop integration ensure your AI solution evolves with your business.',
      'System implementation and API integrations bring your AI vision to life, seamlessly integrating with existing tools.',
      'Ongoing tuning, monitoring, and performance evaluation ensure your AI solution remains effective and efficient.'
    ]
  }
};

export default function StartCampaign() {
  const detailRef = useRef(null);
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
  if (selectedService && detailRef.current) {
    detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [selectedService]);


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
<section className={styles.detailDive} ref={detailRef}>
  <h2>{SERVICE_DETAILS[selectedService].title}</h2>
  <div className={styles.detailCards}>
    {SERVICE_DETAILS[selectedService].paragraphs.map((p, i) => (
      <div key={i} className={styles.detailCard} style={{ animationDelay: `${i * 0.2}s` }}>
        <div className={styles.detailCardIcon}>{SERVICES.find(s => s.key === selectedService).icon}</div>
        <p>{p}</p>
      </div>
    ))}
  </div>
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
