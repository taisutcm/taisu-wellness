'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';
import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function ContactPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  const business = content.business || {};

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={heroStyle}>
        <div style={container}>
          <h1 style={title}>Contact Us</h1>
          <p style={zhTitle}>联系我们</p>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <div style={twoCol}>
            {/* Contact Info */}
            <div style={infoSection}>
              <h2 style={sectionTitle}>Get in Touch</h2>
              <p style={sectionZh}>联系我们</p>
              
              <div style={contactItem}>
                <h3>📍 Address / 地址</h3>
                <p>{business.address || ''}</p>
              </div>

              <div style={contactItem}>
                <h3>📞 Phone / 电话</h3>
                <p>{business.phone || ''}</p>
              </div>

              <div style={contactItem}>
                <h3>✉️ Email / 邮箱</h3>
                <p>{business.email || ''}</p>
              </div>

              <div style={contactItem}>
                <h3>🕐 Hours / 营业时间</h3>
                <p>{business.hours || ''}</p>
              </div>

              <div style={mapContainer}>
                <GoogleMapsEmbed
                  apiKey="AIzaSyBP4dMJSN2hi_73WLnuO-HXuD0f9ylHzRI"
                  mode="place"
                  q={business.address}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div style={formSection}>
              <h2 style={sectionTitle}>Book an Appointment</h2>
              <p style={sectionZh}>预约咨询</p>
              
              <form style={form}>
                <div style={formGroup}>
                  <label style={label}>Name / 姓名 *</label>
                  <input type="text" style={input} placeholder="Your name" />
                </div>

                <div style={formGroup}>
                  <label style={label}>Email *</label>
                  <input type="email" style={input} placeholder="your@email.com" />
                </div>

                <div style={formGroup}>
                  <label style={label}>Phone / 电话</label>
                  <input type="tel" style={input} placeholder="(604) XXX-XXXX" />
                </div>

                <div style={formGroup}>
                  <label style={label}>Service of Interest / 感兴趣的服务</label>
                  <select style={{ ...input, cursor: 'pointer' }}>
                    <option value="">Select a service</option>
                    <option value="consultation">Consultation 咨询</option>
                    <option value="acupuncture">Acupuncture 针灸</option>
                    <option value="herbal">Herbal Medicine 中草药</option>
                  </select>
                </div>

                <div style={formGroup}>
                  <label style={label}>Message / 留言</label>
                  <textarea style={{ ...input, height: '120px' }} placeholder="Tell us about your health concerns..."></textarea>
                </div>

                <button type="submit" style={submitBtn}>Send Message 发送</button>
              </form>
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

const container = {
  maxWidth: '1100px',
  margin: '0 auto'
};

const title = {
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '8px'
};

const zhTitle = {
  fontSize: '20px',
  color: '#888'
};

const section = {
  padding: '60px 24px 80px'
};

const twoCol = {
  display: 'flex',
  gap: '60px',
  flexWrap: 'wrap'
};

const infoSection = {
  flex: 1,
  minWidth: '300px'
};

const formSection = {
  flex: 1.2,
  minWidth: '320px'
};

const sectionTitle = {
  fontSize: '26px',
  color: '#2d3436',
  marginBottom: '4px'
};

const sectionZh = {
  fontSize: '16px',
  color: '#888',
  marginBottom: '28px'
};

const contactItem = {
  marginBottom: '24px'
};

const mapContainer = {
  marginTop: '24px',
  height: '250px',
  borderRadius: '12px',
  overflow: 'hidden'
};

const mapPlaceholder = {
  marginTop: '24px',
  height: '250px',
  background: '#e0e0e0',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column'
};

const label = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
  marginBottom: '6px'
};

const input = {
  padding: '12px 14px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '16px',
  outline: 'none'
};

const submitBtn = {
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '14px 28px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '8px',
  boxShadow: '0 4px 15px rgba(201, 169, 98, 0.35)'
};
