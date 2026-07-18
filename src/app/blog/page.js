'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';

export default function BlogPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent(contentData));
  }, []);

  const blog = content.blog || [];

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={heroStyle}>
        <div style={container}>
          <h1 style={title}>Wellness Blog</h1>
          <p style={zhTitle}>健康博客</p>
          <p style={subtitle}>Insights on Classical Chinese Medicine, health tips, and wellness education.</p>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <div style={blogGrid}>
            {blog.map((post, i) => (
              <article key={i} style={blogCard}>
                {post.image && (
                  <div style={blogImage}>
                    <img src={post.image} alt={post.en} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={blogContent}>
                  <span style={blogDate}>{post.date}</span>
                  <h2 style={blogTitle}>{post.en}</h2>
                  <p style={blogZh}>{post.zh}</p>
                  <p style={blogExcerpt}>{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} style={readMore}>Read more →</a>
                </div>
              </article>
            ))}
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
  maxWidth: '1200px',
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
  color: '#888',
  marginBottom: '16px'
};

const subtitle = {
  fontSize: '17px',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto'
};

const section = {
  padding: '60px 24px 80px'
};

const blogGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '32px'
};

const blogCard = {
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
};

const blogImage = {
  background: '#ddd',
  overflow: 'hidden'
};

const blogContent = {
  padding: '24px'
};

const blogDate = {
  fontSize: '13px',
  color: '#888'
};

const blogTitle = {
  fontSize: '20px',
  color: '#2d3436',
  margin: '8px 0 4px',
  lineHeight: 1.4
};

const blogZh = {
  fontSize: '15px',
  color: '#C9A962',
  marginBottom: '12px'
};

const blogExcerpt = {
  fontSize: '15px',
  color: '#666',
  lineHeight: 1.6,
  marginBottom: '16px'
};

const readMore = {
  color: '#C9A962',
  fontWeight: '500',
  textDecoration: 'none'
};
