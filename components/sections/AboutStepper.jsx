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
    <Section>
      <div className={styles.aboutWrapper}>
        <div className={styles.left}>
  <h2>{activeTab === 'about' ? 'About Us' : 'Why Choose Us'}</h2>
  <div className={styles.subheadingMobile}>
    <p>{activeTab === 'about' ? 'Know about our journey and values.' : 'See why clients choose us.'}</p>
  </div>
</div>

        <div className={styles.right}>
          <div className={styles.tabButtons}>
            <button className={activeTab === 'about' ? styles.active : ''} onClick={() => setActiveTab('about')}>
              About Us
            </button>
            <button className={activeTab === 'why' ? styles.active : ''} onClick={() => setActiveTab('why')}>
              Why Choose Us
            </button>
          </div>
          <div className={styles.content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutStepper;