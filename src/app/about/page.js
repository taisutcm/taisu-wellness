'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';

export default function AboutPage() {
  const [content, setContent] = useState(contentData);
  const business = content.business || {};
  const about = content.about || {};
  const features = about.features || [];

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <section style={heroStyle}>
        <div style={containerStyle}>
          <h1 style={pageTitle}>{about.title || '关于我们'}</h1>
          <p style={pageZhTitle}>{about.titleZh || ''}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>{about.philosophyTitle || '治疗理念'}</h2>
          <p style={zhSubtitle}>{about.philosophyZh || ''}</p>
          
          <div style={twoColumn}>
            <div style={textCol}>
              {about.philosophyContent && (
                <p style={paragraph}>{about.philosophyContent}</p>
              )}
            </div>
            {about.image && (
              <div style={imageBox}>
                <img src={about.image} alt="About Taisu Wellness" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What is CCM */}
      <section style={lightBg}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>{about.featuresTitle || 'What is Classical Chinese Medicine?'}</h2>
          <p style={zhSubtitle}>{about.featuresTitleZh || '什么是古典中医？'}</p>
          
          <div style={featureGrid}>
            {features.map((f, i) => (
              <div key={i} style={featureCard}>
                <h3>{f.titleZh ? `${f.title} / ${f.titleZh}` : f.title}</h3>
                {f.desc && <p>{f.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>{about.whyUsTitle || 'Why We Exist'}</h2>
          <p style={zhSubtitle}>{about.whyUsZh || '我们为什么存在'}</p>
          
          {(about.whyUsContent || []).map((text, i) => (
            <p key={i} style={paragraph}>{text}</p>
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/contact" style={primaryBtn}>Book Your Consultation</a>
          </div>
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
  padding: '80px 24px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const lightBg = {
  ...sectionStyle,
  background: '#FAF7F2'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const sectionTitle = {
  fontSize: 'clamp(26px, 4vw, 36px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '8px',
  textAlign: 'center'
};

const zhSubtitle = {
  fontSize: '18px',
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

const paragraph = {
  fontSize: '17px',
  lineHeight: 1.8,
  color: '#555',
  marginBottom: '20px'
};

const imageBox = {
  flex: 1,
  minWidth: '300px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: '#ddd'
};

const featureGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px'
};

const featureCard = {
  background: '#fff',
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(201, 169, 98, 0.15)',
  border: '1px solid rgba(201, 169, 98, 0.2)'
};

const primaryBtn = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  boxShadow: '0 4px 15px rgba(201, 169, 98, 0.35)'
};
