'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';

export default function ServicesPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  const services = content.services || [];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <section style={heroStyle}>
        <div style={containerStyle}>
          <h1 style={pageTitle}>Our Services</h1>
          <p style={pageZhTitle}>我们的服务</p>
        </div>
      </section>

      {/* Services */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          {services.map((s, i) => (
            <div key={i} style={serviceBlock}>
              <div style={serviceContent}>
                <h2 style={serviceTitle}>{s.en}</h2>
                <p style={serviceZh}>{s.zh}</p>
                <p style={paragraph}>{s.fullDesc}</p>
                
                {s.benefits && s.benefits.length > 0 && (
                  <>
                    <h3 style={subTitle}>Benefits / 益处</h3>
                    <ul style={listStyle}>
                      {s.benefits.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </>
                )}
                
                {s.conditions && s.conditions.length > 0 && (
                  <>
                    <h3 style={subTitle}>Conditions It Helps / 适用症状</h3>
                    <ul style={listStyle}>
                      {s.conditions.map((c, j) => <li key={j}>{c}</li>)}
                    </ul>
                  </>
                )}
              </div>
              {s.image && (
                <img src={s.image} alt={s.en} style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', marginTop: '16px' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={ctaStyle}>
        <div style={containerStyle}>
          <h2 style={{ ...sectionTitle, color: '#fff' }}>Ready to Begin Your Healing Journey?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginTop: '16px', marginBottom: '32px' }}>
            Book your consultation today and discover how Classical Chinese Medicine can help you.
          </p>
          <a href="/contact" style={ctaBtn}>Book Appointment 预约</a>
        </div>
      </section>
    </div>
  );
}

const heroStyle = {
  padding: '80px 24px 60px',
  background: 'linear-gradient(135deg, #f5f5f0 0%, #e8f0e8 100%)',
  textAlign: 'center'
};

const pageTitle = {
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '12px'
};

const pageZhTitle = {
  fontSize: '22px',
  color: '#888'
};

const sectionStyle = {
  padding: '80px 24px'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const sectionTitle = {
  fontSize: 'clamp(26px, 4vw, 36px)',
  fontWeight: 'bold',
  textAlign: 'center'
};

const serviceBlock = {
  display: 'flex',
  gap: '48px',
  marginBottom: '80px',
  alignItems: 'flex-start',
  flexWrap: 'wrap'
};

const serviceContent = {
  flex: 1,
  minWidth: '300px'
};

const serviceTitle = {
  fontSize: 'clamp(24px, 3vw, 32px)',
  color: '#2d3436',
  marginBottom: '8px'
};

const serviceZh = {
  fontSize: '18px',
  color: '#C9A962',
  marginBottom: '20px'
};

const paragraph = {
  fontSize: '16px',
  lineHeight: 1.8,
  color: '#555',
  marginBottom: '16px'
};

const subTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2d3436',
  marginTop: '24px',
  marginBottom: '12px'
};

const listStyle = {
  marginLeft: '20px',
  lineHeight: 1.8,
  color: '#555'
};

const serviceImage = {
  flex: 1,
  minWidth: '300px',
  height: '280px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: '#ddd'
};

const ctaStyle = {
  padding: '80px 24px',
  background: 'linear-gradient(135deg, #2C2416 0%, #3D3426 100%)',
  textAlign: 'center'
};

const ctaBtn = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '600',
  boxShadow: '0 4px 15px rgba(201, 169, 98, 0.35)'
};
