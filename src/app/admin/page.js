'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function AdminPage() {
  const [content, setContent] = useState({ business: {}, home: {}, about: {}, services: [], conditions: [], blog: [] });
  const [activeTab, setActiveTab] = useState('business');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const autoSave = useCallback(async (dataToSave) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });
      if (res.ok) {
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
    setSaving(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      autoSave(content);
    }, 1500);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, loading, autoSave]);

  if (loading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', fontSize: '18px' }}>
        加载中...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#333' }}>⚙️ 网站管理后台</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" target="_blank" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>查看网站 →</a>
          <span style={{ 
            padding: '6px 12px', 
            borderRadius: '4px',
            fontSize: '12px',
            background: saving ? '#fff3cd' : '#d4edda',
            color: saving ? '#856404' : '#155724'
          }}>
            {saving ? '💾 自动保存中...' : lastSaved ? `✓ 已保存 ${lastSaved.toLocaleTimeString()}` : '✓ 已保存'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', background: '#fff', padding: '20px', borderRight: '1px solid #ddd', minHeight: 'calc(100vh - 60px)' }}>
          <NavButton active={activeTab === 'business'} onClick={() => setActiveTab('business')}>🏢 商家信息</NavButton>
          <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')}>🏠 首页</NavButton>
          <NavButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>📖 关于我们</NavButton>
          <NavButton active={activeTab === 'services'} onClick={() => setActiveTab('services')}>💆 服务</NavButton>
          <NavButton active={activeTab === 'conditions'} onClick={() => setActiveTab('conditions')}>🏥 病症</NavButton>
          <NavButton active={activeTab === 'blog'} onClick={() => setActiveTab('blog')}>📝 博客</NavButton>
          <NavButton active={activeTab === 'images'} onClick={() => setActiveTab('images')}>🖼️ 图片管理</NavButton>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {activeTab === 'business' && <BusinessTab content={content} setContent={setContent} />}
          {activeTab === 'home' && <HomeTab content={content} setContent={setContent} />}
          {activeTab === 'about' && <AboutTab content={content} setContent={setContent} />}
          {activeTab === 'services' && <ServicesTab content={content} setContent={setContent} />}
          {activeTab === 'conditions' && <ConditionsTab content={content} setContent={setContent} />}
          {activeTab === 'blog' && <BlogTab content={content} setContent={setContent} />}
          {activeTab === 'images' && <ImageManager content={content} setContent={setContent} />}
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: 'block', width: '100%', padding: '12px 16px', 
        background: active ? '#4a7c59' : 'transparent',
        color: active ? '#fff' : '#666',
        border: 'none', borderRadius: '6px', cursor: 'pointer',
        textAlign: 'left', marginBottom: '8px', fontSize: '14px'
      }}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, type = 'text', rows = 3 }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#555', marginBottom: '6px' }}>{label}</label>
      {type === 'textarea' ? (
        <textarea 
          value={value || ''} 
          onChange={handleChange}
          rows={rows}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
        />
      ) : (
        <input 
          type="text" 
          value={value || ''} 
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
        />
      )}
    </div>
  );
}

// 图片上传组件
function ImageUploader({ label, value, onChange, placeholder = '点击选择图片' }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('请选择图片文件！');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert('上传失败！');
      }
    } catch (err) {
      console.error(err);
      alert('上传失败！');
    }
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#555', marginBottom: '6px' }}>{label}</label>
      
      {/* 预览区域 */}
      {value && (
        <div style={{ marginBottom: '8px', position: 'relative', display: 'inline-block' }}>
          <img 
            src={value} 
            alt="预览" 
            style={{ maxWidth: '200px', width: '100%', height: 'auto', borderRadius: '8px', border: '2px solid #ddd' }} 
          />
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '-8px', right: '-8px',
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#e74c3c', color: '#fff', border: 'none',
              cursor: 'pointer', fontSize: '12px', lineHeight: '24px'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      {/* 上传区域 */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? '#4a7c59' : '#ccc'}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: uploading ? 'wait' : 'pointer',
          background: dragOver ? '#f0f9f4' : '#fafafa',
          transition: 'all 0.2s'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
        {uploading ? (
          <span style={{ color: '#666' }}>⏳ 上传中...</span>
        ) : (
          <span style={{ color: '#666' }}>
            📷 {placeholder}<br/>
            <small style={{ color: '#999' }}>拖拽或点击上传 (支持 JPG, PNG, WebP)</small>
          </span>
        )}
      </div>
      
      {/* URL输入框 */}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="或者直接输入图片 URL"
        style={{
          width: '100%', padding: '10px', border: '1px solid #ddd',
          borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', marginTop: '8px'
        }}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #4a7c59' }}>{title}</h2>
      {children}
    </div>
  );
}

function BusinessTab({ content, setContent }) {
  const update = (key, value) => {
    setContent(prev => ({ ...prev, business: { ...prev.business, [key]: value } }));
  };

  return (
    <Section title="🏢 商家信息">
      <ImageUploader label="Logo 图片" value={content.business?.logo} onChange={v => update('logo', v)} placeholder="上传金色 Logo" />
      <Field label="公司名称 (英文)" value={content.business?.name} onChange={v => update('name', v)} />
      <Field label="公司名称 (中文)" value={content.business?.nameZh} onChange={v => update('nameZh', v)} />
      <Field label="电话" value={content.business?.phone} onChange={v => update('phone', v)} />
      <Field label="邮箱" value={content.business?.email} onChange={v => update('email', v)} />
      <Field label="地址" value={content.business?.address} onChange={v => update('address', v)} type="textarea" />
      <Field label="营业时间" value={content.business?.hours} onChange={v => update('hours', v)} />
    </Section>
  );
}

function HomeTab({ content, setContent }) {
  const update = (key, value) => {
    setContent(prev => ({ ...prev, home: { ...prev.home, [key]: value } }));
  };

  return (
    <>
      <Section title="🏠 首页 - Hero 区域">
        <Field label="标题 (英文)" value={content.home?.heroTitle} onChange={v => update('heroTitle', v)} />
        <Field label="标题 (中文)" value={content.home?.heroTitleZh} onChange={v => update('heroTitleZh', v)} />
        <Field label="副标题 (英文)" value={content.home?.heroSubtitle} onChange={v => update('heroSubtitle', v)} />
        <ImageUploader label="主图" value={content.home?.heroImage} onChange={v => update('heroImage', v)} placeholder="上传首页主图" />
      </Section>
      <Section title="📝 首页 - 介绍区域">
        <Field label="标题 (英文)" value={content.home?.positioningTitle} onChange={v => update('positioningTitle', v)} />
        <Field label="标题 (中文)" value={content.home?.positioningZh} onChange={v => update('positioningZh', v)} />
        <Field label="介绍内容 (英文)" value={content.home?.positioningContent} onChange={v => update('positioningContent', v)} type="textarea" rows={4} />
        <ImageUploader label="介绍图片" value={content.home?.positioningImage} onChange={v => update('positioningImage', v)} placeholder="上传介绍图片" />
      </Section>
    </>
  );
}

function AboutTab({ content, setContent }) {
  const update = (key, value) => {
    setContent(prev => ({ ...prev, about: { ...prev.about, [key]: value } }));
  };

  const updateFeature = (index, field, value) => {
    setContent(prev => {
      const newFeatures = [...(prev.about?.features || [])];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prev, about: { ...prev.about, features: newFeatures } };
    });
  };

  const addFeature = () => {
    setContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        features: [...(prev.about?.features || []), { title: '', titleZh: '', desc: '' }]
      }
    }));
  };

  const removeFeature = (index) => {
    setContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        features: (prev.about?.features || []).filter((_, i) => i !== index)
      }
    }));
  };

  const features = content.about?.features || [];

  return (
    <Section title="📖 关于我们">
      <Field label="页面标题 (英文)" value={content.about?.title} onChange={v => update('title', v)} />
      <Field label="页面标题 (中文)" value={content.about?.titleZh} onChange={v => update('titleZh', v)} />
      <Field label="理念标题" value={content.about?.philosophyTitle} onChange={v => update('philosophyTitle', v)} />
      <Field label="理念内容" value={content.about?.philosophyContent} onChange={v => update('philosophyContent', v)} type="textarea" rows={5} />
      <ImageUploader label="关于我们图片" value={content.about?.image} onChange={v => update('image', v)} placeholder="上传关于我们图片" />
      
      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <h3 style={{ marginBottom: '16px', color: '#4a7c59' }}>什么是古典中医 (Features)</h3>
      <Field label="Section标题 (英文)" value={content.about?.featuresTitle} onChange={v => update('featuresTitle', v)} />
      <Field label="Section标题 (中文)" value={content.about?.featuresTitleZh} onChange={v => update('featuresTitleZh', v)} />
      {features.map((feature, i) => (
        <div key={i} style={{ marginBottom: '20px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <strong>Feature {i + 1}</strong>
            <button onClick={() => removeFeature(i)} style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>删除</button>
          </div>
          <Field label="标题 (英文)" value={feature.title} onChange={v => updateFeature(i, 'title', v)} />
          <Field label="标题 (中文)" value={feature.titleZh} onChange={v => updateFeature(i, 'titleZh', v)} />
          <Field label="描述" value={feature.desc} onChange={v => updateFeature(i, 'desc', v)} type="textarea" rows={2} />
        </div>
      ))}
      <button onClick={addFeature} style={{ background: '#4a7c59', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>+ 添加 Feature</button>
      
      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <h3 style={{ marginBottom: '16px', color: '#4a7c59' }}>为什么选择我们</h3>
      <Field label="为什么存在 (英文标题)" value={content.about?.whyUsTitle} onChange={v => update('whyUsTitle', v)} />
      <Field label="为什么存在 (中文标题)" value={content.about?.whyUsZh} onChange={v => update('whyUsZh', v)} />
      <Field label="为什么存在 (内容，每行一段)" value={(content.about?.whyUsContent || []).join('\n')} onChange={v => update('whyUsContent', v.split('\n').filter(t => t.trim()))} type="textarea" rows={5} />
    </Section>
  );
}

function ServicesTab({ content, setContent }) {
  const updateService = (index, key, value) => {
    setContent(prev => {
      const newServices = [...(prev.services || [])];
      newServices[index] = { ...newServices[index], [key]: value };
      return { ...prev, services: newServices };
    });
  };

  return (
    <Section title="💆 服务项目">
      {(content.services || []).map((service, i) => (
        <div key={i} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: '#4a7c59' }}>{service.en}</h3>
          <Field label="标题 (英文)" value={service.en} onChange={v => updateService(i, 'en', v)} />
          <Field label="标题 (中文)" value={service.zh} onChange={v => updateService(i, 'zh', v)} />
          <Field label="描述" value={service.fullDesc} onChange={v => updateService(i, 'fullDesc', v)} type="textarea" rows={3} />
          <ImageUploader label="服务图片" value={service.image} onChange={v => updateService(i, 'image', v)} placeholder="上传服务图片" />
        </div>
      ))}
    </Section>
  );
}

function ConditionsTab({ content, setContent }) {
  const updateCondition = (index, key, value) => {
    setContent(prev => {
      const newConditions = [...(prev.conditions || [])];
      newConditions[index] = { ...newConditions[index], [key]: value };
      return { ...prev, conditions: newConditions };
    });
  };

  const addCondition = () => {
    setContent(prev => {
      const newConditions = [...(prev.conditions || []), {
        slug: `condition-${Date.now()}`,
        en: 'New Condition',
        zh: '新病症',
        preview: '',
        symptoms: '',
        symptomsList: [],
        tcmPerspective: '',
        treatment: '',
        image: ''
      }];
      return { ...prev, conditions: newConditions };
    });
  };

  const removeCondition = (index) => {
    if (!confirm('确定删除这个病症？')) return;
    setContent(prev => {
      const newConditions = [...(prev.conditions || [])];
      newConditions.splice(index, 1);
      return { ...prev, conditions: newConditions };
    });
  };

  return (
    <Section title="🏥 病症页面">
      {(content.conditions || []).map((condition, i) => (
        <div key={i} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#4a7c59', margin: 0 }}>{condition.en || `病症 ${i + 1}`}</h3>
            <button onClick={() => removeCondition(i)} style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer' }}>删除</button>
          </div>
          <Field label="标题 (英文)" value={condition.en} onChange={v => updateCondition(i, 'en', v)} />
          <Field label="标题 (中文)" value={condition.zh} onChange={v => updateCondition(i, 'zh', v)} />
          <Field label="简介" value={condition.preview} onChange={v => updateCondition(i, 'preview', v)} />
          <Field label="症状介绍" value={condition.symptoms} onChange={v => updateCondition(i, 'symptoms', v)} type="textarea" rows={3} />
          <Field label="中医观点" value={condition.tcmPerspective} onChange={v => updateCondition(i, 'tcmPerspective', v)} type="textarea" rows={3} />
          <Field label="治疗方法" value={condition.treatment} onChange={v => updateCondition(i, 'treatment', v)} type="textarea" rows={3} />
          <ImageUploader label="病症图片" value={condition.image} onChange={v => updateCondition(i, 'image', v)} placeholder="上传病症图片" />
        </div>
      ))}
      <button onClick={addCondition} style={{ background: '#4a7c59', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>+ 添加新病症</button>
    </Section>
  );
}

function BlogTab({ content, setContent }) {
  const updateBlog = (index, key, value) => {
    setContent(prev => {
      const newBlog = [...(prev.blog || [])];
      newBlog[index] = { ...newBlog[index], [key]: value };
      return { ...prev, blog: newBlog };
    });
  };

  return (
    <Section title="📝 博客文章">
      {(content.blog || []).map((post, i) => (
        <div key={i} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: '#4a7c59' }}>{post.en}</h3>
          <Field label="标题 (英文)" value={post.en} onChange={v => updateBlog(i, 'en', v)} />
          <Field label="标题 (中文)" value={post.zh} onChange={v => updateBlog(i, 'zh', v)} />
          <Field label="日期" value={post.date} onChange={v => updateBlog(i, 'date', v)} />
          <Field label="摘要" value={post.excerpt} onChange={v => updateBlog(i, 'excerpt', v)} type="textarea" rows={2} />
          <Field label="全文内容" value={post.content} onChange={v => updateBlog(i, 'content', v)} type="textarea" rows={5} />
          <ImageUploader label="博客图片" value={post.image} onChange={v => updateBlog(i, 'image', v)} placeholder="上传博客封面图" />
        </div>
      ))}
    </Section>
  );
}

// 图片管理页面
function ImageManager({ content, setContent }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      setUploadedImages(data.images || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteImage = async (filename) => {
    if (!confirm('确定删除这张图片？')) return;
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('已复制图片链接！');
  };

  return (
    <Section title="🖼️ 图片管理">
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          上传的图片会保存在 <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>/public/uploads/</code> 文件夹中。
        </p>
        <p style={{ color: '#666', fontSize: '13px' }}>
          你也可以在各个内容编辑页面直接上传图片到指定位置。
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>加载中...</p>
      ) : uploadedImages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999', background: '#f9f9f9', borderRadius: '8px' }}>
          暂无上传的图片
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {uploadedImages.map((img, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={img.url} 
                alt={img.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
              />
              <div style={{ padding: '12px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px', wordBreak: 'break-all' }}>{img.name}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => copyToClipboard(img.url)}
                    style={{ flex: 1, padding: '6px', fontSize: '12px', background: '#4a7c59', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    复制链接
                  </button>
                  <button 
                    onClick={() => deleteImage(img.name)}
                    style={{ padding: '6px 12px', fontSize: '12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
