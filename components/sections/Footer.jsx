import styles from '@/styles/footer.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Column 1: Brand & Contact */}
        <div className={styles.col}>
          <h2 className={styles.logo}><span>Rankers</span> Mind</h2>
          <p>We empower businesses with smart SEO strategies, AI-driven tools, and conversion-focused solutions to dominate search rankings.</p>
          <ul className={styles.contactList}>
            <li>📧 info@rankersmind.com</li>
            <li>📞 +91 9588910582</li>
            <li>📍 Jaipur, India • Serving Worldwide</li>
          </ul>

          {/* 🟦 Tooltip Social Icons */}
          <ul className={styles.wrapper}>
  <li className={`${styles.icon} ${styles.facebook}`}>
    <a href="https://facebook.com/rankersmind" target="_blank" rel="noopener noreferrer">
      <span className={styles.tooltip}>Facebook</span>
      <FaFacebookF />
    </a>
  </li>
  <li className={`${styles.icon} ${styles.twitter}`}>
    <a href="https://twitter.com/rankersmind" target="_blank" rel="noopener noreferrer">
      <span className={styles.tooltip}>Twitter</span>
      <FaTwitter />
    </a>
  </li>
  <li className={`${styles.icon} ${styles.linkedin}`}>
    <a href="https://linkedin.com/company/rankersmind" target="_blank" rel="noopener noreferrer">
      <span className={styles.tooltip}>LinkedIn</span>
      <FaLinkedinIn />
    </a>
  </li>
  <li className={`${styles.icon} ${styles.instagram}`}>
    <a href="https://instagram.com/rankersmind" target="_blank" rel="noopener noreferrer">
      <span className={styles.tooltip}>Instagram</span>
      <FaInstagram />
    </a>
  </li>
</ul>

        </div>

        {/* Column 2: Services */}
        {/* Column 2: Services (Updated) */}
<div className={styles.col}>
  <h3>Our Services</h3>
  <ul>
    <li><a href="/services/seo">SEO Optimization</a></li>
    <li><a href="/services/social-media">Social Media Marketing</a></li>
    <li><a href="/services/ppc">Google Ads (PPC)</a></li>
    <li><a href="/services/branding">Brand Strategy</a></li>
    <li><a href="/services/email">Email Marketing</a></li>
    <li><a href="/services/web-development">Web Development</a></li>
    <li><a href="/services/content">Content Creation</a></li>
    <li><a href="/services/analytics">Analytics & Reporting</a></li>
    <li><a href="/services/app-development">App Development</a></li>
    <li><a href="/services/ai-development">AI Development</a></li>
  </ul>
</div>


        {/* Column 3: Company */}
        <div className={styles.col}>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Rankersmind</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.cta}>
        <h4>Get Smart SEO Tips in Your Inbox</h4>
        <p>Weekly insights, strategies & exclusive growth hacks directly from Rankersmind.</p>
        <div className={styles.subscribe}>
          <input type="email" placeholder="Your email address" />
          <button>🚀 Subscribe</button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottomBar}>
        <p>© 2025 Rankersmind. All rights reserved.</p>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
