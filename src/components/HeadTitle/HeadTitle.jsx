import React from 'react';
import styles from './HeadTitle.module.css';

export default function HeadTitle({ title }) {
  return <div className={styles.title}>{title}</div>;
}
