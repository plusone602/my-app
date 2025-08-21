'use client';

import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="http://localhost:3000/mui-buttons">第一題</a>
      <a href="http://localhost:3000/weather-chart">第二題</a>
    </div>
  );
}
