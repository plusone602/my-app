'use client';

import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="https://adbert-test.vercel.app/mui-buttons">第一題</a>
      <a href="https://adbert-test.vercel.app/weather-chart">第二題</a>
    </div>
  );
}
