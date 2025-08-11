'use client';

import { useState } from 'react';
import Section from './section';
import styles from '@/styles/aboutStepper.module.css';

import Image from 'next/image';
import aboutImage from '@/public/aboutUs.png';
import smilingMan from '@/public/smilingMan.png';
import whyChooseUsImage from '@/public/whyChooseUs.png';

const AboutStepper = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    const isAbout = activeTab === 'about';
    const contentImage = isAbout ? aboutImage : whyChooseUsImage;
    const overlayImg = isAbout ? smilingMan : null;

    return (
      <div className={styles.aboutContent}>
        <div className={styles.aboutImage}>
          <Image
            src={contentImage}
            alt={isAbout ? "About Us" : "Why Choose Us"}
            width={460}
            height={525}
            className={styles.image}
          />

          {overlayImg && (
            <Image
              src={overlayImg}
              alt="Smiling Man"
              width={300}
              height={450}
              className={styles.overlayImage}
            />
          )}
        </div>

        <div className={styles.aboutText}>
          <h3>{isAbout ? 'Who We Are' : 'Why We Are The Best'}</h3>
          <p>
            {isAbout
              ? `Rankers Mind stands as a beacon of digital innovation, a Web and App Development Company propelled by the aspiration of delivering cutting-edge digital products across the globe. Our mission is to craft digital solutions that not only meet the current demands of the market but also anticipate future trends, setting new industry standards. We are a collective of visionary developers, creative designers, and strategic thinkers dedicated to transforming your ideas into digital realities that captivate and inspire.`
              : `Some businesses struggle to make their marketing really pay off. Some wouldn’t know even if it was. Luckily, lots more have found Pixated. Your business has goals and obstacles unlike anyone else’s—and it deserves a carefully crafted strategy that’s as unique as your brand. We work with a broad spectrum of clients, each with their own fascinating story, their own challenges and vision for the future. And our results speak for themselves.`}
          </p>

          {isAbout ? (
            <>
              <a href="/about" className={styles.exploreBtn}>Explore</a>
              <div className={styles.achievements}>
                <div className={styles.achievementItem}>
                  <h4>200+</h4>
                  <p>Global Clients</p>
                </div>
                <div className={styles.achievementItem}>
                  <h4>150+</h4>
                  <p>Projects Delivered</p>
                </div>
                <div className={styles.achievementItem}>
                  <h4>5+</h4>
                  <p>Years of Excellence</p>
                </div>
                <div className={styles.achievementItem}>
                  <h4>20+</h4>
                  <p>Team Members</p>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.achievements}>
              <div className={styles.achievementItem}>
                <h4>95</h4>
                <p>client retention</p>
              </div>
              <div className={styles.achievementItem}>
                <h4>178</h4>
                <p>avg. yearly growth</p>
              </div>
              <div className={styles.achievementItem}>
                <h4>63</h4>
                <p>conversion rate uplift</p>
              </div>
              <div className={styles.achievementItem}>
                <h4>6.5</h4>
                <p>ROAS</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Section className={styles.aboutsteppersection} disableOverlay>

      <div className={styles.aboutWrapper}>
  <div className={styles.topRow}>
    <div className={styles.left}>
      <h2>{activeTab === 'about' ? 'About Us' : 'Why Choose Us'}</h2>
      <div className={styles.subheadingMobile}>
        <p>{activeTab === 'about' ? 'Know about our journey and values.' : 'See why clients choose us.'}</p>
      </div>
    </div>

    <div className={styles.tabButtons}>
      <button className={activeTab === 'about' ? styles.active : ''} onClick={() => setActiveTab('about')}>
        About Us
      </button>
      <button className={activeTab === 'why' ? styles.active : ''} onClick={() => setActiveTab('why')}>
        Why Choose Us
      </button>
    </div>
  </div>

  <div className={styles.right}>
    <div className={styles.content}>
      {renderContent()}
    </div>
  </div>
</div>

{/* ... existing JSX ... */}

   <div className={styles.trustedBy}>
    <h2 className={styles.trustedTitle}>Trusted By</h2>
  <div className={styles.bgText}>OUR CLIENTS</div>

  <div className={styles.marqueeBox}>
    <div className={styles.marqueeStrip}>
      {/* SET 1 */}
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Spotify_logo_without_text.svg" alt="Spotify" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Spotify_logo_without_text.svg" alt="Spotify" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" /></div>
      </div>

      {/* SET 2 (exact duplicate of SET 1) */}
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Spotify_logo_without_text.svg" alt="Spotify" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" /></div>
      </div>
      <div className={styles.logoRow}>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Spotify_logo_without_text.svg" alt="Spotify" /></div>
        <div className={styles.logoBox}><img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" /></div>
      </div>
    </div>
  </div>
</div>

    </Section>
  );
};

export default AboutStepper;