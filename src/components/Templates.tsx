export function Templates() {
  return (
    <section className="templates">
      <div className="templates-container">
        <div className="templates-header">
          <div>
            <h2 className="templates-title">Discover templates</h2>
            <p className="templates-subtitle">Start your next project with a template</p>
          </div>
          <button className="btn-outline">View all</button>
        </div>
        <div className="template-grid">
          <div className="template-card">
            <div className="template-preview" style={{ background: '#1a1a1a' }}>
              <div className="template-preview-inner portfolio-preview">
                <span className="preview-name">SARAH<br />MITCHELL</span>
              </div>
            </div>
            <h4 className="template-name">Personal portfolio</h4>
            <p className="template-desc">Personal work showcase</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: 'linear-gradient(135deg, #ff6b9d, #c44dff, #ff6b35)' }}>
              <div className="template-preview-inner slides-preview">
                <div className="slides-icon">▶</div>
                <span className="preview-label">LovableSlides</span>
              </div>
            </div>
            <h4 className="template-name">Lovable slides</h4>
            <p className="template-desc">Code-powered presentation builder</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: '#2a2a2a' }}>
              <div className="template-preview-inner architect-preview">
                <span className="preview-heading">MINIMAL<br />ARCHITECTURE</span>
              </div>
            </div>
            <h4 className="template-name">Architect Portfolio</h4>
            <p className="template-desc">Firm website & showcase</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: '#f5f0eb' }}>
              <div className="template-preview-inner fashion-preview">
                <span className="preview-brand">VESPER</span>
                <div className="preview-tagline">Fashion & Style</div>
              </div>
            </div>
            <h4 className="template-name">Fashion blog</h4>
            <p className="template-desc">Minimal, playful design</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: '#fafafa' }}>
              <div className="template-preview-inner events-preview">
                <span className="preview-events-text">Discover</span>
                <div className="preview-badges">
                  <span className="badge badge-green">events</span>
                  <span className="badge badge-blue">near</span>
                  <span className="badge badge-yellow">you</span>
                </div>
              </div>
            </div>
            <h4 className="template-name">Event Platform</h4>
            <p className="template-desc">Find, register, create events</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: 'linear-gradient(180deg, #d4c5a9, #8b7355)' }}>
              <div className="template-preview-inner blog-preview">
                <span className="preview-blog-title">Journey Through<br />Life's Spectrum</span>
              </div>
            </div>
            <h4 className="template-name">Personal blog</h4>
            <p className="template-desc">Muted, intimate design</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: '#f0f0f0' }}>
              <div className="template-preview-inner lifestyle-preview">
                <div className="preview-nav-mock">nexus</div>
                <div className="preview-featured">Featured Article</div>
              </div>
            </div>
            <h4 className="template-name">Lifestyle Blog</h4>
            <p className="template-desc">Sophisticated blog design</p>
          </div>
          <div className="template-card">
            <div className="template-preview" style={{ background: '#f8f6f3' }}>
              <div className="template-preview-inner ecommerce-preview">
                <div className="preview-shop-nav">LINEA</div>
                <div className="preview-products">
                  <div className="preview-product"></div>
                  <div className="preview-product"></div>
                </div>
              </div>
            </div>
            <h4 className="template-name">Ecommerce Store</h4>
            <p className="template-desc">Premium design for webstore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
