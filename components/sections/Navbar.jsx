'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/navbar.module.css';
import { Send } from 'lucide-react';
import { usePathname } from 'next/navigation';


import {
  FaHouseUser, FaRegAddressCard, FaTasks, FaLaptopCode,
  FaPaperPlane, FaPenFancy, FaSearch, FaShareAlt, FaGoogle,
  FaEnvelope, FaLightbulb, FaFileAlt, FaChartBar, FaCode,
  FaMobileAlt, FaRobot,FaInstagram, FaWhatsapp,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Home', icon: <FaHouseUser />, path: '/' },
  { label: 'About', icon: <FaRegAddressCard />, path: '/about' },
  {
    label: 'Services',
    icon: <FaTasks />,
    path: '#',
    megaMenu: {
      'Digital Marketing': [
        { label: 'SEO Optimization', path: '/services/seo', icon: <FaSearch /> },
        { label: 'Social Media Marketing', path: '/services/social-media', icon: <FaShareAlt /> },
        { label: 'Google Ads (PPC)', path: '/services/ppc', icon: <FaGoogle /> },
        { label: 'Email Marketing', path: '/services/email', icon: <FaEnvelope /> },
      ],
      'Creative Services': [
        { label: 'Brand Strategy', path: '/services/branding', icon: <FaLightbulb /> },
        { label: 'Content Creation', path: '/services/content', icon: <FaFileAlt /> },
        { label: 'Analytics & Reporting', path: '/services/analytics', icon: <FaChartBar /> },
      ],
      Development: [
        { label: 'Web Development', path: '/services/web-development', icon: <FaCode /> },
        { label: 'App Development', path: '/services/app-development', icon: <FaMobileAlt /> },
        { label: 'AI Development', path: '/services/ai-development', icon: <FaRobot /> },
      ],
    },
  },
  { label: 'Blog', icon: <FaPenFancy />, path: '/blog' },
  { label: 'Contact', icon: <FaPaperPlane />, path: '/contact' },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const sidebarRef = useRef(null);

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Handle navigation and close sidebar
  const handleClick = (path) => {
    router.push(path);
    setSidebarOpen(false);
  };

  

  // Close sidebar if click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [sidebarOpen]);

  useEffect(() => {
    if (showContactForm) {
      document.body.classList.add('contactPanelOpen');
    } else {
      document.body.classList.remove('contactPanelOpen');
    }
  }, [showContactForm]);

  return (
    <>
      {/* Desktop Navbar */}

      


      <div className={styles.navbarContainer}>
  <div className={styles.logoContainer}>
    <img
      src="/logo.png"
      alt="Logo"
      className={styles.logo}
      onClick={() => router.push('/')}
    />
  </div>

  <div className={styles.navWrapper}>
    <nav className={styles.menu}>
      {menuItems.map((item, index) => {
  const isActive = item.path !== '#' && pathname === item.path;

  return (
    <div
      key={item.label}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (item.path !== '#') {
          router.push(item.path);
        } else {
          setActiveIndex(index === activeIndex ? null : index);
        }
      }}
    >
      <span className={styles.linkIcon}>{item.icon}</span>
      <span className={styles.linkTitle}>{item.label}</span>

      {/* Mega Dropdown */}
      {item.megaMenu && (
        <div className={styles.megaDropdown}>
          <div className={styles.megaDropdownWrapper}>
            {Object.entries(item.megaMenu).map(([title, links]) => (
              <div className={styles.megaColumn} key={title}>
                <h4 className={styles.megaTitle}>{title}</h4>
                {links.map((link) => (
                  <div
                    key={link.label}
                    className={styles.dropdownItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(link.path);
                      setActiveIndex(null);
                    }}
                  >
                    {link.icon && <span>{link.icon}</span>}
                    {link.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
})}
    </nav>
    <div className={`${styles.letsTalkButton} ${styles.desktopOnly}`} onClick={() => setShowContactForm(true)}>
  <Send size={20} strokeWidth={2.2} />
  Let’s Talk
</div>


  </div>
</div>

      {/* Hamburger for Mobile */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar for Mobile */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`} ref={sidebarRef} data-lenis-prevent>

        <div className={styles.sidebarLogo}>
    <img src="/logo.png" alt="Logo" onClick={() => handleClick('/')} />
  </div>
        {menuItems.map((item) => (
  <div key={item.label}>
    <div
      className={styles.sidebarLink}
      onClick={() => {
        if (item.label === 'Services') {
          setMobileServicesOpen((prev) => !prev);
        } else {
          handleClick(item.path);
        }
      }}
    >
      {item.icon}
      {item.label}
      {item.label === 'Services' && (
        <span
  className={`${styles.arrowIcon} ${mobileServicesOpen ? styles.arrowOpen : ''}`}
>
  &gt;
</span>

      )}
    </div>

    {/* Mobile dropdown for Services */}
    {item.label === 'Services' && mobileServicesOpen && (
      <div className={styles.mobileDropdown}>
        {Object.entries(item.megaMenu).map(([section, links]) => (
          <div key={section} className={styles.mobileDropdownSection}>
            <div className={styles.mobileDropdownTitle}>{section}</div>
            {links.map((link) => (
              <div
                key={link.label}
                className={styles.mobileDropdownItem}
                onClick={() => handleClick(link.path)}
              >
                {link.icon} {link.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

  </div>
))}

 {/* Let’s Talk inside sidebar (mobile) */}
<div className={styles.sidebarFooter}>
   <button
     className={styles.letsTalkSidebarButton}
     onClick={() => {
       setShowContactForm(true);
       setSidebarOpen(false);
     }}
   >
     <Send size={20} strokeWidth={2.2} />
     Let’s Talk
   </button>
 </div>
      </div>

      {/* Contact Slide-in Panel */}
{/* Contact Slide-in Panel */}
{/* Contact Slide-in Panel */}
<div className={`${styles.contactPanel} ${showContactForm ? styles.open : ''}`} data-lenis-prevent>
  <div className={styles.contactHeader}>
    <h4>Let’s Connect</h4>
    <p>Have an idea or question? Fill out the form and we’ll be in touch shortly.</p>
    <button className={styles.closeButton} onClick={() => setShowContactForm(false)}>×</button>
  </div>

  <div style={{ marginTop: 20 }} />

  {/* ------------- FORM ------------- */}
  {(() => {
    const [status, setStatus] = React.useState('idle');

    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('loading');
      const fd = new FormData(e.currentTarget);
      const payload = Object.fromEntries(fd.entries());

      try {
        await fetch('/api/letsTalkForm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setStatus('sent');
        setTimeout(() => {
          setStatus('idle');
          e.currentTarget.reset();
        }, 4000);
      } catch {
        setStatus('idle');
      }
    }

    return (
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input name="fullname" type="text" placeholder="Enter your full name" required />
        <input name="email" type="email" placeholder="Enter your email address" required />
        <input name="phone" type="tel" placeholder="Enter your phone number" />
        <select name="service" required>
          <option value="">Please Select Your Service</option>
          <option>SEO</option>
          <option>Social Media</option>
          <option>Web Development</option>
          <option>App Development</option>
          <option>AI Development</option>
          <option>Google Ads</option>
          <option>Email Marketing</option>
          <option>Brand Strategy</option>
          <option>Content Creation</option>
          <option>Analytics and Reporting</option>
        </select>
        <textarea name="message" placeholder="How may we help you?" required />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={styles.submitBtn}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, minWidth: 110 }}
        >
          {status === 'loading' && (
            <svg
              style={{ animation: 'spin 1s linear infinite' }}
              width={16}
              height={16}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {status === 'loading' ? 'Sending…' : status === 'sent' ? 'Submitted ✓' : 'Submit'}
        </button>
      </form>
    );
  })()}
  {/* ------------- /FORM ------------- */}

  <div className={styles.socialContact} style={{ marginTop: 24 }}>
    <a
      href="https://wa.me/919269529252?text=Hi%2C%20I%20would%20like%20to%20know%20more"
      className={styles.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp /> WhatsApp
    </a>
    <a
      href="https://instagram.com/rankersmind"
      className={styles.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram /> Instagram
    </a>
  </div>
</div>


    </>
  );
}
