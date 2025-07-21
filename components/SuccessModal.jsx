'use client';
import React from 'react';
import styles from '@/styles/SuccessModal.module.css';
import { CheckCircle, XCircle } from 'lucide-react';

export default function SuccessModal({ show, type, message, onClose }) {
  if (!show) return null;

  const isSuccess = type === 'success';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {isSuccess ? (
          <CheckCircle size={50} color="green" />
        ) : (
          <XCircle size={50} color="red" />
        )}
        <h2>{isSuccess ? 'Success!' : 'Oops!'}</h2>
        <p>{message}</p>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
