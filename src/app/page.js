'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';
import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function HomePage() {
  const [content, setContent] = useState(contentData);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  const c = content.home || {};
  const business = content.business || {};
  const allConditions = content.conditions || [];
  const allServices = content.services || [];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>
            {c.heroTitle || '首页标题'}
          </h1>
          <p style={heroSubtitle}>
            {c.heroSubtitle || '请在管理后台设置副标题'}
            <br />
            <span style={{ fontSize: '18px', opacity: 0.8 }}>{c.heroTitleZh || ''}</span>
          </p>
          <div style={heroButtons}>
            <a href="/contact" style={primaryBtn}>Book Appointment 预约</a>
            <a href={`tel:${(business.phone || '').replace(/[^0-9]/g, '')}`} style={secondaryBtn}>Call Now 致电</a>
          </div>
        </div>
        {c.heroImage && (
          <div style={imagePlaceholder}>
            <img src={c.heroImage} alt="Clinic" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
          </div>
        )}
      </section>

      {/* Positioning Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>{c.positioningTitle || '介绍标题'}</h2>
          <p style={zhTitle}>{c.positioningZh || ''}</p>
          
          <div style={twoColumn}>
            <div style={textCol}>
              {c.positioningContent && (
                <p style={paragraphStyle}>{c.positioningContent}</p>
              )}
            </div>
            {c.positioningImage && (
              <div style={imagePlaceholderSmall}>
                <img src={c.positioningImage} alt="Herbal Medicine" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section style={lightBgStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>Common Conditions We Treat</h2>
          <p style={zhTitle}>我们治疗的常见病症</p>
          
          <div style={conditionGrid}>
            {allConditions.map((item, i) => (
              <a key={i} href={`/conditions/${item.slug}`} style={conditionCard}>
                <h3 style={conditionTitle}>{item.en}</h3>
                <p style={conditionZh}>{item.zh}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>Our Services</h2>
          <p style={zhTitle}>我们的服务</p>
          
          <div style={serviceGrid}>
            {allServices.map((s, i) => (
              <div key={i} style={serviceCard}>
                {s.image && (
                  <img src={s.image} alt={s.en} style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0', display: 'block' }} />
                )}
                <h3>{s.en}</h3>
                <p style={{ color: '#666' }}>{s.zh}</p>
                <p style={serviceDesc}>{s.fullDesc?.split('\n')[0] || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={greenBgStyle}>
        <div style={containerStyle}>
          <h2 style={{ ...sectionTitle, color: '#fff' }}>Why Choose Taisu Wellness?</h2>
          <div style={trustGrid}>
            {(c.trustItems || []).map((item, i) => (
              <div key={i} style={trustItem}>
                <h3 style={{ color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>Visit Us</h2>
          <p style={zhTitle}>联系我们</p>
          
          <div style={twoColumn}>
            <div style={textCol}>
              {business.name && <p style={paragraphStyle}><strong>{business.name}</strong></p>}
              {business.address && <p style={paragraphStyle}>{business.address}</p>}
              {business.phone && <p style={paragraphStyle}>Phone: {business.phone}</p>}
              {business.email && <p style={paragraphStyle}>Email: {business.email}</p>}
              <div style={{ marginTop: '24px' }}>
                <a href="/contact" style={primaryBtn}>Get in Touch 联系我们</a>
              </div>
            </div>
            {business.address && (
              <div style={mapContainer}>
                <GoogleMapsEmbed
                  apiKey="AIzaSyBP4dMJSN2hi_73WLnuO-HXuD0f9ylHzRI"
                  mode="place"
                  q={business.address}
                  style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const heroStyle = {
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #FAF7F2 0%, #F5E6C8 100%)',
  padding: '80px 24px'
};

const heroContent = {
  maxWidth: '600px'
};

const heroTitle = {
  fontSize: 'clamp(32px, 5vw, 56px)',
  fontWeight: 'bold',
  color: '#2d3436',
  lineHeight: 1.2,
  marginBottom: '24px'
};

const heroSubtitle = {
  fontSize: 'clamp(16px, 2vw, 22px)',
  color: '#666',
  lineHeight: 1.6,
  marginBottom: '32px'
};

const heroButtons = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap'
};

const primaryBtn = {
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  display: 'inline-block',
  boxShadow: '0 4px 15px rgba(201, 169, 98, 0.35)'
};

const secondaryBtn = {
  background: 'transparent',
  color: '#C9A962',
  padding: '14px 28px',
  borderRadius: '8px',
  border: '2px solid #C9A962',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  display: 'inline-block'
};

const imagePlaceholder = {
  flex: 1,
  background: '#eee',
  borderRadius: '16px',
  minHeight: '300px',
  marginLeft: '48px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const sectionStyle = {
  padding: '80px 24px'
};

const lightBgStyle = {
  ...sectionStyle,
  background: '#FAF7F2'
};

const greenBgStyle = {
  ...sectionStyle,
  background: 'linear-gradient(135deg, #2C2416 0%, #3D3426 100%)'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const sectionTitle = {
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '8px',
  textAlign: 'center'
};

const zhTitle = {
  fontSize: '20px',
  color: '#888',
  marginBottom: '48px',
  textAlign: 'center'
};

const twoColumn = {
  display: 'flex',
  gap: '48px',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const textCol = {
  flex: 1,
  minWidth: '300px'
};

const paragraphStyle = {
  fontSize: '17px',
  lineHeight: 1.8,
  color: '#555',
  marginBottom: '16px'
};

const imagePlaceholderSmall = {
  flex: 1,
  minWidth: '300px',
  background: '#ddd',
  borderRadius: '12px',
  overflow: 'hidden'
};

const conditionGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px'
};

const conditionCard = {
  background: '#fff',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 4px 20px rgba(201, 169, 98, 0.15)',
  border: '1px solid rgba(201, 169, 98, 0.2)'
};

const conditionTitle = {
  color: '#2d3436',
  fontSize: '18px',
  marginBottom: '8px'
};

const conditionZh = {
  color: '#888',
  fontSize: '14px'
};

const serviceGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '32px'
};

const serviceCard = {
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(201, 169, 98, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(201, 169, 98, 0.2)'
};

const serviceDesc = {
  padding: '20px',
  color: '#555',
  lineHeight: 1.6
};

const trustGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '32px',
  marginTop: '40px'
};

const trustItem = {
  textAlign: 'center'
};

const mapContainer = {
  flex: 1,
  minWidth: '300px',
  height: '300px',
  borderRadius: '12px',
  overflow: 'hidden'
};

const mapPlaceholder = {
  flex: 1,
  minWidth: '300px',
  height: '300px',
  background: '#e0e0e0',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
