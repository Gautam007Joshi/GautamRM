'use client';

import React, { useState } from 'react';
import styles from '@/styles/services/ServicePricingPlans.module.css';

const ServicePricingPlans = ({ plans }) => {
  const [showYearly, setShowYearly] = useState(false);

  if (!plans || !Array.isArray(plans)) return null;

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Pricing Header */}
        <div className={styles.pricingHeader}>
          <h2 className={styles.heading}>
            Simple, Transparent <span className={styles.highlight}>Pricing</span>
          </h2>
          <p className={styles.subtext}>
            Choose the perfect plan for your business needs
          </p>

          {/* Toggle Switch */}
          <div className={styles.billingToggle}>
            <span className={!showYearly ? styles.active : ''}>Monthly</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={showYearly}
                onChange={() => setShowYearly(!showYearly)}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={showYearly ? styles.active : ''}>
              Yearly <span className={styles.saveText}>(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={styles.grid}>
          {plans.map((plan, idx) => (
            <div key={idx} className={`${styles.card} card-hover`}>
              <div className={styles.cardContent}>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <div className={styles.price}>
                  <span className={`${styles.priceValue} ${!showYearly ? '' : styles.hidden}`}>
                    {plan.priceMonthly}
                  </span>
                  <span className={`${styles.priceValue} ${showYearly ? '' : styles.hidden}`}>
                    {plan.priceYearly}
                  </span>
                  <span className={styles.unit}>/month</span>
                </div>
                <a href="#" className={styles.ctaButton}>Get Started</a>
              </div>

              <div className={styles.featuresSection}>
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i} className={styles.featureItem}>
                      <i className={`fas fa-check ${styles.icon}`}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Plan CTA */}
        <div className={styles.customSection}>
          <p>Need something custom? We've got you covered.</p>
          <a href="#" className={styles.customBtn}>Request Custom Plan</a>
        </div>
      </div>
    </section>
  );
};

export default ServicePricingPlans;
