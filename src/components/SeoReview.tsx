import React, { useState } from 'react';
import { Globe, RefreshCw, X, Zap, Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import '../styles/seo-review.css';

export default function SeoReviewView({ onClose }: { onClose?: () => void }) {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <div className="seo-review-wrap">
      <div className="seo-top-bar">
        <div className="seo-tb-left"></div>
        <div className="seo-tb-right">
          <button className="seo-tb-btn active">
            SEO <ChevronDown size={14} />
          </button>
          <button className="seo-tb-btn quiet">
            <MoreHorizontal size={16} />
          </button>
          <button className="seo-tb-btn close-btn" onClick={() => onClose && onClose()}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="seo-header">
        <h2>Improve your SEO</h2>
        <p>Help your project get discovered in search engines and AI search by implementing best practices for search visibility.</p>
      </div>

      <div className="seo-content seo-scrollable">
        {introVisible && (
          <div className="seo-intro-card">
            <button className="seo-intro-close" onClick={() => setIntroVisible(false)}>
              <X size={16} />
            </button>
            <div className="seo-intro-top">
              <span role="img" aria-label="sparkles">✨</span> Introducing SEO
            </div>
            
            <div className="seo-features">
              <div className="seo-feature">
                <div className="seo-feature-icon">
                  <Globe size={16} />
                </div>
                <div className="seo-feature-content">
                  <h4>Reach more visitors</h4>
                  <p>SEO helps your project show up when people search Google or AI.</p>
                </div>
              </div>
              <div className="seo-feature">
                <div className="seo-feature-icon">
                  <Search size={16} />
                </div>
                <div className="seo-feature-content">
                  <h4>Find and fix what's holding you back</h4>
                  <p>Lovable scans your site, flags issues, and helps you fix them.</p>
                </div>
              </div>
            </div>

            <svg className="seo-intro-bg" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path d="M20,80 L80,20 L60,80 L50,60 L20,80 Z" fill="url(#cursorGradient)" className="seo-blur-path" />
              <path d="M25,75 L75,25 L58,75 L49,58 L25,75 Z" fill="url(#cursorGradient)" />
            </svg>
          </div>
        )}

        <div className="seo-grid">
          <div className="seo-card">
            <div className="seo-card-header">
              Ask Lovable to help
              <span className="seo-badge"><Zap size={10} /> Powered by Semrush</span>
            </div>
            <p className="seo-card-text">Ask about your competitors, keywords, and what helps similar sites stand out in search.</p>
            <div className="seo-questions">
              <button className="seo-question-btn">What countries search most for website cloning services?</button>
              <button className="seo-question-btn">What sites link to lovable.dev?</button>
              <button className="seo-question-btn">What's the search trend for 'clone website'?</button>
            </div>
            <button className="seo-refresh">
              <RefreshCw size={12} /> New questions
            </button>
          </div>

          <div className="seo-card">
            <div className="seo-card-header">
              Get a custom domain
              <span className="seo-badge seo-badge-pro">Pro</span>
            </div>
            <p className="seo-card-text">A custom domain helps your site stand out and rank higher in search.</p>
            <div className="seo-domains">
              <button className="seo-domain-btn">devremix.com</button>
              <button className="seo-domain-btn">sweetclone.com</button>
            </div>
            <div>
              <button className="seo-search-domain">Search domains</button>
            </div>
            <div className="seo-card-footer">
              Already own a domain? <a>Connect existing</a>
            </div>
          </div>
        </div>

        <div className="seo-empty-state">
          <p>No scans yet. Run your first scan to find SEO issues to fix.</p>
          <button className="seo-btn-primary">Scan project</button>
        </div>
      </div>
    </div>
  );
}
