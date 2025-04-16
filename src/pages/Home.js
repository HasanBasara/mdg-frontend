import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 32 }}>
      <header style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1>Modern Dijital Gelişim Platformuna Hoş Geldiniz</h1>
        <p>Geleceğinizi şekillendirin, yeni beceriler edinin</p>
        <Link to="/register">
          <Button type="primary" size="large">Hemen Başla</Button>
        </Link>
      </header>
      <section>
        <h2>Özellikler</h2>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2', padding: 24, minWidth: 200 }}>
            <h3>Canlı Dersler</h3>
            <p>Uzman eğitmenlerle interaktif öğrenme deneyimi</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2', padding: 24, minWidth: 200 }}>
            <h3>Sertifikalar</h3>
            <p>Tamamladığınız kurslar için resmi sertifikalar</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2', padding: 24, minWidth: 200 }}>
            <h3>Esnek Öğrenme</h3>
            <p>Kendi hızınızda öğrenme imkanı</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;