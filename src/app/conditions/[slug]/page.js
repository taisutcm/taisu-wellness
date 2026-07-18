'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function ConditionPage() {
  const params = useParams();
  const slug = params.slug;
  const [content, setContent] = useState(contentData);
  const [condition, setCondition] = useState(null);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        const found = (data.conditions || []).find(c => c.slug === slug);
        setCondition(found);
      })
      .catch(() => {
        const found = (contentData.conditions || []).find(c => c.slug === slug);
        setCondition(found);
      });
  }, [slug]);

  const conditions = content.conditions || [];
  const relatedConditions = conditions.filter(c => c.slug !== slug).slice(0, 3);
  const business = content.business || {};

  if (!condition) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '50vh' }}>
        <p>Loading... / 加载中...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={heroStyle}>
        <div style={container}>
          <h1 style={title}>{(condition.en || '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in Richmond, BC</h1>
          <p style={zhTitle}>{condition.zh} - 列治文</p>
        </div>
      </section>

      <section style={contentSection}>
        <div style={container}>
          <div style={twoCol}>
            <div style={mainContent}>
              {/* Image */}
              {condition.image && (
                <div style={heroImage}>
                  <img src={condition.image} alt={condition.en} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
                </div>
              )}

              {/* Symptoms */}
              <div style={section}>
                <h2>Understanding {condition.en} 了解{condition.zh}</h2>
                <p style={paragraph}>{condition.symptoms}</p>
                {condition.symptomsList && condition.symptomsList.length > 0 && (
                  <ul style={list}>
                    {condition.symptomsList.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>

              {/* TCM Perspective */}
              <div style={section}>
                <h2>The Chinese Medicine Perspective 中医观点</h2>
                <p style={paragraph}>{condition.tcmPerspective}</p>
              </div>

              {/* Treatment */}
              <div style={section}>
                <h2>Our Treatment Approach 治疗方法</h2>
                <p style={paragraph}>{condition.treatment}</p>
              </div>

              {/* Why Us */}
              <div style={section}>
                <h2>Why Choose Taisu Wellness? 为什么选择太素养生?</h2>
                <ul style={list}>
                  <li><strong>Root-cause treatment</strong> - We don't just suppress symptoms / 治本而非治标</li>
                  <li><strong>Classical Jing Fang formulas</strong> - Time-tested, precise herbal prescriptions / 经典经方</li>
                  <li><strong>Personalized care</strong> - Your treatment evolves as you improve / 个性化治疗</li>
                  <li><strong>Bilingual service</strong> - Available in English and Chinese / 中英文服务</li>
                </ul>
              </div>
            </div>

            <div style={sidebar}>
              <div style={ctaBox}>
                <h3>Ready to Get Started?</h3>
                <p>Book your consultation and discover how Chinese Medicine can help you.</p>
                <a href="/contact" style={ctaBtn}>Book Appointment 预约</a>
                {business.phone && (
                  <a href={`tel:${business.phone.replace(/[^0-9]/g, '')}`} style={phoneBtn}>Call {business.phone}</a>
                )}
              </div>

              <div style={infoBox}>
                <h4>Related Conditions 相关病症</h4>
                <ul style={linkList}>
                  {relatedConditions.map((c, i) => (
                    <li key={i}><a href={`/conditions/${c.slug}`}>{c.en} →</a></li>
                  ))}
                </ul>
              </div>
            </div>
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

const title = {
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '8px'
};

const zhTitle = {
  fontSize: '20px',
  color: '#888'
};

const contentSection = {
  padding: '60px 24px 80px'
};

const container = {
  maxWidth: '1100px',
  margin: '0 auto'
};

const twoCol = {
  display: 'flex',
  gap: '48px',
  flexWrap: 'wrap'
};

const mainContent = {
  flex: 1,
  minWidth: '300px'
};

const heroImage = {
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '32px',
  background: '#ddd'
};

const section = {
  marginBottom: '40px'
};

const paragraph = {
  fontSize: '16px',
  lineHeight: 1.8,
  color: '#555',
  marginBottom: '16px'
};

const list = {
  paddingLeft: '20px',
  lineHeight: 2,
  color: '#555'
};

const sidebar = {
  width: '320px',
  flexShrink: 0
};

const ctaBox = {
  background: 'linear-gradient(135deg, #2C2416 0%, #3D3426 100%)',
  padding: '28px',
  borderRadius: '12px',
  color: '#fff',
  marginBottom: '24px'
};

const ctaBtn = {
  display: 'block',
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '6px',
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: '600',
  marginTop: '16px',
  boxShadow: '0 4px 15px rgba(201, 169, 98, 0.35)'
};

const phoneBtn = {
  display: 'block',
  background: 'transparent',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '6px',
  border: '2px solid rgba(255,255,255,0.5)',
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: '500',
  marginTop: '12px'
};

const infoBox = {
  background: '#f5f5f0',
  padding: '24px',
  borderRadius: '12px'
};

const linkList = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};
