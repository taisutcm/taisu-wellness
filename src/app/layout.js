import contentData from '@/data/content.json';

const business = contentData.business || {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {/* 背景 Logo 水印 */}
        <div style={bgLogoStyle}>
          <img src="/uploads/bg-logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        
        <nav style={navStyle}>
          <div style={navContainer}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              {business.logo ? (
                <img src={business.logo} alt={business.name || 'Taisu Wellness'} style={{ height: '70px', width: 'auto' }} />
              ) : (
                <span style={logoStyle}>TAISU WELLNESS</span>
              )}
            </a>
            <div style={navLinks}>
              <a href="/" style={linkStyle}>Home</a>
              <a href="/about" style={linkStyle}>About</a>
              <a href="/services" style={linkStyle}>Services</a>
              <a href="/conditions" style={linkStyle}>Conditions</a>
              <a href="/blog" style={linkStyle}>Blog</a>
              <a href="/contact" style={ctaButton}>Book Now</a>
              <a href="/admin" style={{ ...linkStyle, marginLeft: '16px', color: '#888', fontSize: '13px' }}>⚙️ Admin</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer style={footerStyle}>
          <div style={footerContainer}>
            <p>© 2024 Taisu Wellness Studio | Chinese Medicine Richmond BC</p>
            <p style={{ fontSize: '14px', opacity: 0.7 }}> Richmond, British Columbia, Canada</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

const navStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  background: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  zIndex: 1000,
  padding: '16px 0'
};

const navContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#C9A962',
  textDecoration: 'none',
  letterSpacing: '2px'
};

const navLinks = {
  display: 'flex',
  alignItems: 'center',
  gap: '32px'
};

const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontSize: '15px',
  transition: 'color 0.2s'
};

const ctaButton = {
  background: 'linear-gradient(135deg, #D4A574 0%, #C9A962 100%)',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  boxShadow: '0 2px 8px rgba(201, 169, 98, 0.3)'
};

const footerStyle = {
  background: '#2C2416',
  padding: '48px 24px',
  textAlign: 'center',
  marginTop: '80px'
};

const footerContainer = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const bgLogoStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '900px',
  opacity: 0.15,
  pointerEvents: 'none',
  zIndex: 0
};
