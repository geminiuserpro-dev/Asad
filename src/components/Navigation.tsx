import { useState } from 'react';

export function Navigation({ setView, setModal }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setView('landing'); }}>
            <svg className="logo-icon" viewBox="0 0 32 32" width="28" height="28" fill="none">
              <circle cx="12" cy="20" r="10" fill="#FF6B35" />
              <circle cx="20" cy="16" r="10" fill="#E63946" opacity="0.85" />
            </svg>
            <span className="logo-text">Lovable</span>
          </a>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="nav-links">
            <div className="nav-dropdown" id="nav-solutions">
              <button className="nav-link nav-dropdown-trigger">
                Solutions
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Founders</a>
                <a href="#" className="dropdown-item">Product Managers</a>
                <a href="#" className="dropdown-item">Designers</a>
                <a href="#" className="dropdown-item">Marketers</a>
                <a href="#" className="dropdown-item">Sales</a>
                <a href="#" className="dropdown-item">Ops</a>
              </div>
            </div>
            <div className="nav-dropdown" id="nav-resources">
              <button className="nav-link nav-dropdown-trigger">
                Resources
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Learn</a>
                <a href="#" className="dropdown-item">Templates</a>
                <a href="#" className="dropdown-item">Guides</a>
                <a href="#" className="dropdown-item">Videos</a>
                <a href="#" className="dropdown-item">Blog</a>
              </div>
            </div>
            <a href="#" className="nav-link">Community</a>
            <a href="#" className="nav-link">Enterprise</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Security</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="btn-ghost" onClick={() => setModal('login')}>Log in</button>
          <button className="btn-primary" onClick={() => setView('signup')}>Get started</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
