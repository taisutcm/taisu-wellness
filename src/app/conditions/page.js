'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';

export default function ConditionsPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  const conditions = content.conditions || [];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <section style={heroStyle}>
        <div style={containerStyle}>
          <h1 style={pageTitle}>Conditions We Treat</h1>
          <p style={pageZhTitle}>我们治疗的病症</p>
          <p style={heroDesc}>
            Classical Chinese Medicine offers effective treatment for a wide range of chronic conditions. 
            Below are common conditions we help with using acupuncture and Jing Fang herbal therapy in Richmond, BC.
          </p>
        </div>
      </section>

      {/* Conditions List */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={conditionGrid}>
            {conditions.map((c, i) => (
              <a key={i} href={`/conditions/${c.slug}`} style={conditionCard}>
                {c.image && (
                  <div style={conditionImage}>
                    <img src={c.image} alt={c.en} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={conditionContent}>
                  <h2 style={conditionTitle}>{c.en}</h2>
                  <p style={conditionZh}>{c.zh}</p>
                  <p style={conditionDesc}>{c.preview}</p>
                  <span style={learnMore}>Learn more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section style={lightBg}>
        <div style={containerStyle}>
          <h2 style={sectionTitle}>How Chinese Medicine Helps</h2>
          <p style={zhSubtitle}>中医如何帮助您</p>
          
          <div style={qaGrid}>
            {qa.map((q, i) => (
              <div key={i} style={qaCard}>
                <h3>{q.q}</h3>
                <p>{q.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const qa = [
  { q: 'How long does treatment take?', a: 'Most patients notice improvement within 2-4 weeks. Chronic conditions may require 2-3 months of consistent treatment.' },
  { q: 'Is acupuncture painful?', a: 'Most patients feel minimal discomfort. The needles are hair-thin and inserted skillfully. Many find acupuncture deeply relaxing.' },
  { q: 'Do I need both acupuncture and herbs?', a: 'For many conditions, the combination is most effective. Your practitioner will recommend the best approach for your case.' },
  { q: 'Is Chinese Medicine safe?', a: 'When practiced by trained professionals using quality herbs, Chinese Medicine is extremely safe with minimal side effects.' }
];

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

const heroDesc = {
  maxWidth: '700px',
  margin: '24px auto 0',
  fontSize: '17px',
  color: '#666',
  lineHeight: 1.7
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

const lightBg = {
  padding: '80px 24px',
  background: '#fafafa'
};

const conditionGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px'
};

const conditionCard = {
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  textDecoration: 'none',
  boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s, box-shadow 0.2s'
};

const conditionImage = {
  background: '#ddd',
  overflow: 'hidden'
};

const conditionContent = {
  padding: '24px'
};

const conditionTitle = {
  fontSize: '22px',
  color: '#2d3436',
  marginBottom: '8px'
};

const conditionZh = {
  fontSize: '16px',
  color: '#C9A962',
  marginBottom: '12px'
};

const conditionDesc = {
  fontSize: '15px',
  color: '#666',
  lineHeight: 1.6,
  marginBottom: '16px'
};

const learnMore = {
  color: '#C9A962',
  fontWeight: '500'
};

const qaGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px'
};

const qaCard = {
  background: '#fff',
  padding: '28px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(201, 169, 98, 0.15)',
  border: '1px solid rgba(201, 169, 98, 0.2)'
};
