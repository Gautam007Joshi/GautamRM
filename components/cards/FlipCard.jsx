'use client';

import React, { useState } from 'react';
import styles from '@/styles/FlipCard.module.css';

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    // Prevent flip if clicking a link or button
    if (
      e.target.tagName.toLowerCase() === 'a' ||
      e.target.tagName.toLowerCase() === 'button'
    ) {
      return;
    }
    setIsFlipped(true); // flip on click
  };

  const handleMouseLeave = () => {
    setIsFlipped(false); // unflip when mouse leaves
  };

  return (
    <div
      className={styles.cardContainer}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.inner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>{front}</div>
        <div className={`${styles.face} ${styles.back}`}>{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;
