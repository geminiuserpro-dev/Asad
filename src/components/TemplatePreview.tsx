import React, { useState } from 'react';

export default function TemplatePreview({ id, onClose }: { id: string, onClose: () => void }) {
  return (
    <div className="template-preview-overlay" onClick={onClose}>
      <div className="template-preview-dialog" onClick={e => e.stopPropagation()}>
        <div className="tpd-header">
          <div className="tpd-title">{id === 'lovable-slides' ? 'Lovable slides' : 'AssetWise'} <span>by Lovable</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="tpd-use-btn">Use template</button>
            <button style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: '4px' }} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div className="tpd-content">
          <div className="tpd-img-wrap">
             {id === 'lovable-slides' ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1 style={{ color: '#ec4899', fontSize: '32px', marginBottom: '16px' }}>LovableSlides</h1>
                  <p style={{ color: '#64748b' }}>Build stunning, interactive presentations with the power of code</p>
                </div>
             ) : (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1 style={{ color: '#0f172a', fontSize: '32px', marginBottom: '16px', fontWeight: 'bold' }}>The only asset tracker <br/><span style={{ fontWeight: 400, color: '#64748b' }}>built for your team</span></h1>
                  <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>A simple, reliable way to log, assign, and monitor all company equipment.</p>
                </div>
             )}
          </div>
          <div className="tpd-nav">
            <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <span>1 / 6</span>
            <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
}
