'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/chatbot/Chatbot.module.css';
import { Bot, User, X } from 'lucide-react';

/* ---------- MASSIVE FAQ (unchanged) ---------- */
const faq = {
  services:
    'We offer Website Dev, App Dev, UI/UX, Branding, SEO, DevOps, QA, API Integrations, E-commerce, CMS, Hosting & more.',
  'website development':
    'Full-stack responsive sites (React, Next.js, Node, Laravel, Shopify, WordPress).',
  'app development':
    'Cross-platform (React-Native, Flutter) & native iOS/Android.',
  'ui ux design':
    'User-research → wireframes → Figma prototypes → design-systems.',
  branding: 'Logo, identity kit, brand guidelines & social kits.',
  seo: 'On-page, technical, local & semantic SEO; Core Web Vitals >90.',
  devops: 'CI/CD, Docker, AWS, GCP, Azure, Vercel, Netlify, DigitalOcean.',
  qa: 'Unit, e2e & regression tests (Jest, Cypress, Playwright).',
  api: 'REST, GraphQL, Webhooks, third-party integrations.',
  ecommerce: 'Shopify, WooCommerce, Magento, custom headless storefronts.',
  cms: 'Sanity, Strapi, Contentful, WordPress, Prismic.',
  hosting: 'Shared, VPS, dedicated, serverless, CDN, SSL.',
  maintenance:
    'Monthly retainers ₹1k–₹10k covering uptime, updates & small tweaks.',
  revisions: '2 free revision rounds included; extras at ₹800/hr.',
  'after delivery support':
    '30-day bug-fix window, then optional maintenance.',
  migration: 'WordPress → Headless, legacy → modern stack, zero downtime.',
  speed: 'Guaranteed <2 s load, 90+ Lighthouse scores.',
  security: 'SSL, CSP, WAF, Dependency scanning, OWASP compliance.',
  accessibility: 'WCAG 2.1 AA compliance, keyboard & screen-reader ready.',

  pricing:
    'Websites ₹15k–₹3L | Apps ₹25k–₹5L | Design from ₹8k. Fixed quotes after discovery.',
  'website price': 'Landing page ₹15k, E-commerce ₹50k+, SaaS ₹1L+.',
  'app price': 'MVP ₹25k, full-featured ₹1.5L+.',
  'hourly rate': 'Ad-hoc ₹800/hr.',
  'fixed quote': 'Sent within 24 h of discovery call.',
  'payment plan': '40 % advance • 40 % beta • 20 % launch.',
  refund:
    'Advance non-refundable; unused hours refundable within 30 days.',
  discounts: 'Non-profit & early-startup discounts available.',
  'maintenance cost': 'Starts ₹1k/month; scales with traffic/features.',

  'tech stack':
    'React, Next.js, TypeScript, Tailwind, Node, Express, Nest, PostgreSQL, MongoDB, Firebase, Supabase, AWS, Vercel, Netlify.',
  database: 'PostgreSQL, MySQL, MongoDB, Firestore, DynamoDB, Redis.',
  cloud: 'AWS, GCP, Azure, DigitalOcean.',
  analytics: 'GA4, Mixpanel, Amplitude, Hotjar, custom dashboards.',
  'headless cms': 'Sanity, Strapi, Contentful, Prismic, Storyblok.',
  'payment gateway': 'Stripe, Razorpay, PayPal, Apple Pay, Google Pay.',
  'email service': 'SendGrid, Mailgun, Postmark, AWS SES.',
  'push notifications': 'OneSignal, Firebase Cloud Messaging, Expo.',
  'video conferencing': 'WebRTC, Twilio, Daily.co integration.',
  chat: 'Socket.io, Pusher, Firebase Realtime.',
  blockchain: 'Web3, Solidity, NFT contracts, DeFi front-ends.',
  ai: 'ChatGPT, OpenAI, LangChain, vector DBs, embeddings.',
  testing: 'Jest, React Testing Library, Cypress, Playwright.',
  monitoring: 'Sentry, LogRocket, Datadog, New Relic.',
  ci_cd: 'GitHub Actions, GitLab CI, CircleCI, Jenkins.',
  docker: 'Containerized local & prod environments.',
  kubernetes: 'K8s orchestration for scale.',

  contact:
    'Email hello@yourco.in | WhatsApp +91 92695 29252 | Calendly 30-min call.',
  whatsapp: 'https://wa.me/919269529252',
  timeline: 'Landing page 2 w | Website 4–6 w | App 6–12 w.',
  process: 'Discovery → Proposal → Design → Dev → QA → Launch → Support.',
  'discovery call': 'Free 30-min Zoom to understand scope.',
  nda: 'We sign an NDA before any confidential discussion.',
  portfolio: 'yourco.in/portfolio',
  'case study': 'Available on request.',
  testimonials: '5-star reviews on Clutch, Google & Upwork.',
  team: '12 in-house devs & designers.',
  timezone: 'IST (GMT+5:30) but we overlap US & EU hours.',
  communication: 'Slack, Notion, Trello, Jira, weekly demos.',
  support: '1-month free support post-launch + optional maintenance plans.',

  partnership: 'White-label & agency partnerships welcome.',
  internship: 'We run paid internships for React & Node.',
  hiring: 'Always looking for senior React, Node & Flutter devs.',
  'custom solution':
    'Yes, we build custom platforms tailored to your needs.',
  demo: 'We can schedule a personalized live demo.',
  technologies:
    'We use cutting-edge technologies optimized for scalability, UX, and SEO.',

  __fallback__:
    'Sorry, I couldn’t find an answer. Re-phrase or chat with us on https://wa.me/919876543210',
};

const searchKey = (q) =>
  Object.keys(faq).find((k) => k.includes(q.toLowerCase().trim())) || '__fallback__';

const questions = {
  Services: {
    'Website Development':
      'Do you build landing pages, SaaS platforms, and e-commerce websites?',
    'App Development':
      'Can you build iOS and Android apps using Flutter or React Native?',
    'UI/UX Design':
      'Do you offer Figma-based design systems and responsive UI?',
    Branding: 'Do you design logos, brand kits, and social media visuals?',
    SEO: 'Do you optimize sites for speed and SEO rankings?',
    'CMS Integration': 'Can you integrate WordPress, Sanity, or Strapi?',
    Maintenance: 'What’s included in monthly maintenance?',
  },
  Pricing: {
    'Website Pricing': 'How much does a website cost?',
    'App Pricing': "What’s the starting price for mobile apps?",
    'Hourly Rate': 'Do you offer per-hour billing?',
    'Payment Plans': 'How are payments broken up?',
    'Refunds & Discounts': 'Do you offer refunds or startup discounts?',
  },
  'Tech Stack': {
    'Frontend Stack': 'What technologies do you use for frontend?',
    'Backend Stack': "What’s your backend & database stack?",
    'Cloud & Hosting': 'Where do you host projects?',
    'Security Practices': 'Do you follow OWASP & HTTPS practices?',
    'Analytics Tools': 'Do you use GA4, Mixpanel or Hotjar?',
  },
  Support: {
    'After Delivery Support': 'Do you offer free support after delivery?',
    'Bug Fixes': 'How quickly do you fix bugs?',
    Revisions: 'How many revision rounds are included?',
  },
  Process: {
    'Project Timeline': 'How long does it take to build a website or app?',
    Workflow: "What’s your design to development process?",
    'Discovery Call': 'What happens during the discovery call?',
    'NDA & Confidentiality': 'Do you sign NDAs before work begins?',
  },
  Other: {
    'Type your question...': 'You can ask me anything else not listed here!',
  },
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello 👋 How may I assist you today?', options: Object.keys(questions) },
  ]);
  const [typing, setTyping] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [awaitingCustomQuestion, setAwaitingCustomQuestion] = useState(false);

  const chatEndRef = useRef(null);

  /* Utility to add a new bot message and clear old buttons */
  const addBotMessage = (text, opts = []) =>
    setMessages((prev) => [...prev, { from: 'bot', text, options: opts }]);

  /* Utility to add a user message */
  const addUserMessage = (text) =>
    setMessages((prev) => [...prev, { from: 'user', text }]);

  const handleUserOption = (text) => {
    addUserMessage(text);
    setTyping(true);

    setTimeout(() => {
      /* 1. Drill-down into category */
      if (questions[text]) {
        addBotMessage(`More on ${text}:`, [...Object.keys(questions[text]), 'Main Menu']);
        setTyping(false);
        return;
      }

      /* 2. Main-menu requested */
      if (text === 'Main Menu') {
        addBotMessage('Sure, back to the main menu 👇', Object.keys(questions));
        setTyping(false);
        return;
      }

      /* 3. “Other” category -> free text input */
      if (text === 'Other') {
        addBotMessage('Sure, type your question below 👇');
        setTyping(false);
        setAwaitingCustomQuestion(true);
        return;
      }

      /* 4. Leaf answer inside category */
      for (const cat in questions) {
        if (questions[cat][text]) {
          addBotMessage(questions[cat][text]);
          addBotMessage('Was this helpful?', ['Yes', 'Not Useful', 'Main Menu']);
          setTyping(false);
          return;
        }
      }

      /* 5. Free-form FAQ */
      const key = searchKey(text);
      addBotMessage(faq[key]);
      addBotMessage('Was this helpful?', ['Yes', 'Not Useful', 'Main Menu']);
      setTyping(false);
    }, 700);
  };

  const handleFeedback = (feedback) => {
    addUserMessage(feedback);

    setTimeout(() => {
      if (feedback === 'Not Useful') {
        addBotMessage(
          <>
            No problem—let’s connect directly.{' '}
            <a
              className={styles.link}
              href="https://wa.me/919269529252"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with our team on WhatsApp
            </a>
            .
          </>
        );
      } else {
        addBotMessage('Glad I could help!');
      }
    }, 300);
  };

  const handleCustomQuestionSubmit = () => {
    const question = customQuestion.trim();
    if (!question) return;
    addUserMessage(question);
    setCustomQuestion('');
    setTyping(true);
    setAwaitingCustomQuestion(false);

    setTimeout(() => {
      addBotMessage(faq[searchKey(question)]);
      addBotMessage('Was this helpful?', ['Yes', 'Not Useful', 'Main Menu']);
      setTyping(false);
    }, 700);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat icon */}
      <div
        className={`${styles.chatIcon} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open support chat"
      >
        <Bot size={24} />
      </div>

      {/* Backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}

      {/* Chat window */}
      {isOpen && (
        <div className={styles.chatWrapper}>
          <header className={styles.chatHeader}>
            <span>Support Assistant</span>
            <X size={20} onClick={() => setIsOpen(false)} cursor="pointer" />
          </header>

          <main className={styles.chatBody}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.from === 'user' ? styles.user : styles.bot}`}
              >
                <div className={styles.avatar}>
                  {msg.from === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={styles.text}>
                  {typeof msg.text === 'string' ? msg.text : msg.text}
                  {msg.options && idx === messages.length - 1 && (
  <div className={styles.options}>
    {msg.options.map((opt) => (
      <button
        key={opt}
        onClick={() => {
          if (opt === 'Yes' || opt === 'Not Useful') handleFeedback(opt);
          else handleUserOption(opt);
        }}
      >
        {opt}
      </button>
    ))}
  </div>
)}

                </div>
              </div>
            ))}

            {awaitingCustomQuestion && (
              <div className={styles.customInput}>
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomQuestionSubmit()}
                  placeholder="Type your question..."
                />
                <button onClick={handleCustomQuestionSubmit}>Send</button>
              </div>
            )}

            {typing && <div className={styles.typing}>Typing…</div>}
            <div ref={chatEndRef} />
          </main>
        </div>
      )}
    </>
  );
}