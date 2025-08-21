'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Taipei = { name: 'Taipei', lat: 25.04, lon: 121.56 };
const Tokyo = { name: 'Tokyo', lat: 35.68, lon: 139.76 };

export default function WeatherChart() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const url = (lat, lon) =>
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    Promise.all([fetch(url(Taipei.lat, Taipei.lon)), fetch(url(Tokyo.lat, Tokyo.lon))])
      .then(async ([r1, r2]) => [await r1.json(), await r2.json()])
      .then(([d1, d2]) => {
        setA(d1.daily);
        setB(d2.daily);
      })
      .catch((e) => setErr(String(e)));
  }, []);

  const data = useMemo(() => {
    if (!a || !b) return [];
    const len = Math.min(a.time.length, b.time.length);
    return Array.from({ length: len }).map((_, i) => ({
      date: a.time[i].slice(5),
      [`${Taipei.name}-Max`]: a.temperature_2m_max[i],
      [`${Taipei.name}-Min`]: a.temperature_2m_min[i],
      [`${Tokyo.name}-Max`]: b.temperature_2m_max[i],
      [`${Tokyo.name}-Min`]: b.temperature_2m_min[i],
    }));
  }, [a, b]);

  if (err) return <p style={{ padding: 24, color: 'crimson' }}>載入失敗：{err}</p>;
  if (!a || !b) return <p style={{ padding: 24 }}>載入中…</p>;

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <a style={{ margin: 10 }} href="http://localhost:3000/">
        回首頁
      </a>

      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        未來 7 日氣溫堆疊圖（{Taipei.name} vs {Tokyo.name}）
      </h1>

      <div
        style={{
          height: 420,
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: 16,
          padding: 16,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit="°C" />
            <Tooltip />
            <Legend />
            <Bar dataKey={`${Taipei.name}-Max`} stackId="A" fill="#ff6384" />
            <Bar dataKey={`${Taipei.name}-Min`} stackId="A" fill="#77a2f2ff" />
            <Bar dataKey={`${Tokyo.name}-Max`} stackId="B" fill="#eb093aff" />
            <Bar dataKey={`${Tokyo.name}-Min`} stackId="B" fill="#0967ebff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>
        資料來源：Open-Meteo（公共氣象 API，免金鑰）
      </p>
    </div>
  );
}
