'use client';

import React from 'react';
import styles from '@/styles/services/ServiceStats.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faSearchDollar,
  faTrophy,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  'chart-line': faChartLine,
  'search-dollar': faSearchDollar,
  'trophy': faTrophy,
  'dollar-sign': faDollarSign,
};

const StatsSection = ({ stats }) => {
  return (
    <div className={styles.statsSection}>
      <div className={styles.heading}>
        <h2>Trusted by businesses worldwide</h2>
        <p>Proven Results That Speak Volumes</p>
      </div>
      <div className={styles.grid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={iconMap[stat.icon]} size="lg" />
            </div>
            <h3 className={styles.value}>{stat.value}</h3>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
