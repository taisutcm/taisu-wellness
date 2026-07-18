'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [content, setContent] = useState(contentData);
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        const found = (data.blog || []).find(p => p.slug === slug);
        setPost(found);
      })
      .catch(() => {
        const found = (contentData.blog || []).find(p => p.slug === slug);
        setPost(found);
      });
  }, [slug]);

  const blog = content.blog || [];

  if (!post) {
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
          <span style={date}>{post.date}</span>
          <h1 style={title}>{post.en}</h1>
          <p style={zhTitle}>{post.zh}</p>
        </div>
      </section>

      <section style={contentSection}>
        <div style={container}>
          <div style={layout}>
            {post.image && (
              <div style={featuredImage}>
                <img src={post.image} alt={post.en} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
              </div>
            )}
            
            <article style={article}>
              <p style={excerpt}>{post.excerpt}</p>
              <div style={blogContent}>
                {post.content || ''}
              </div>
            </article>
          </div>

          {/* Back to Blog */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <a href="/blog" style={backLink}>← Back to Blog / 返回博客</a>
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
  maxWidth: '900px',
  margin: '0 auto'
};

const date = {
  fontSize: '14px',
  color: '#888'
};

const title = {
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 'bold',
  color: '#2d3436',
  marginBottom: '8px',
  marginTop: '12px'
};

const zhTitle = {
  fontSize: '20px',
  color: '#C9A962'
};

const contentSection = {
  padding: '60px 24px 80px'
};

const layout = {
  maxWidth: '900px',
  margin: '0 auto'
};

const featuredImage = {
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '40px',
  background: '#ddd'
};

const article = {
  lineHeight: 1.8
};

const excerpt = {
  fontSize: '18px',
  color: '#555',
  fontStyle: 'italic',
  marginBottom: '32px',
  paddingBottom: '32px',
  borderBottom: '1px solid #eee'
};

const blogContent = {
  fontSize: '17px',
  color: '#444',
  lineHeight: 1.8
};

const backLink = {
  color: '#C9A962',
  textDecoration: 'none',
  fontWeight: '500'
};
