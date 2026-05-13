import React, { useState } from 'react';
import '../styles/dashboard.css';

const templates = [
  {
    id: 'lovable-slides',
    title: 'Lovable slides',
    desc: 'Code-powered presentation builder',
    bg: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
    iconText: 'LovableSlides',
    hasPreviewImage: false
  },
  {
    id: 'asset-wise',
    title: 'AssetWise',
    desc: 'Track company equipment, assign assets to employees, m...',
    bg: '#f8fafc',
    iconText: 'AssetWise',
    hasPreviewImage: true
  },
  {
    id: 'eventspark',
    title: 'EventSpark',
    desc: 'Full-stack event management app with branded registratio...',
    bg: '#fff',
    iconText: 'EventSpark',
    hasPreviewImage: true
  },
  {
    id: 'commcalc',
    title: 'CommCalc',
    desc: 'Real-time commission engine with comp plan builder, deal...',
    bg: '#0f172a',
    iconText: 'CommCalc',
    hasPreviewImage: true
  },
  {
    id: 'architect-portfolio',
    title: 'Architect Portfolio Website Template',
    desc: 'Firm website & showcase',
    bg: '#e2e8f0',
    iconText: 'MINIMAL ARCHITECTURE',
    hasPreviewImage: true
  },
  {
    id: 'continuum',
    title: 'Continuum',
    desc: 'A calm, distraction-free habit tracker with streak counters, ...',
    bg: '#fcd34d',
    iconText: 'Continuum',
    hasPreviewImage: true
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Store Website Template',
    desc: 'Premium design for webstore',
    bg: '#e2e8f0',
    iconText: 'LINEA',
    hasPreviewImage: true
  },
  {
    id: 'inspo-canvas',
    title: 'Inspo Canvas',
    desc: 'Spatial canvas for collecting, arranging, and sharing visual i...',
    bg: '#fecdd3',
    iconText: 'Inspo',
    hasPreviewImage: true
  },
  {
    id: 'event-platform',
    title: 'Event Platform Website Template',
    desc: 'Find, register, create events',
    bg: '#fff',
    iconText: 'Event Platform',
    hasPreviewImage: true
  },
  {
    id: 'pinpost',
    title: 'PinPost',
    desc: 'See exactly how your post looks on Instagram, LinkedIn, X, ...',
    bg: '#f8fafc',
    iconText: 'PinPost',
    hasPreviewImage: true
  },
  {
    id: 'lifestyle-blog',
    title: 'Lifestyle Blog',
    desc: 'Sophisticated blog design',
    bg: '#fff',
    iconText: 'Lifestyle Blog',
    hasPreviewImage: true
  },
  {
    id: 'upvote',
    title: 'Upvote',
    desc: 'Collaborative feature voting board where teams submit ide...',
    bg: '#e0e7ff',
    iconText: 'Upvote',
    hasPreviewImage: true
  },
];

export default function ResourcesView({ setPreviewTemplate }: { setPreviewTemplate: (id: string | null) => void }) {
  return (
    <div className="resources-view">
      <div className="resources-header">
        <h1>Resources</h1>
        <p>Start from a template to build your next project</p>
      </div>

      <div className="resources-grid">
        {templates.map(tpl => (
          <div key={tpl.id} className="resource-card" onClick={() => setPreviewTemplate(tpl.id)}>
            <div className="resource-thumb" style={{ background: tpl.bg }}>
              {tpl.hasPreviewImage ? (
                <div className="resource-thumb-mock">
                  <span style={{ fontWeight: 'bold', color: tpl.bg === '#0f172a' ? '#fff' : '#000' }}>{tpl.iconText}</span>
                </div>
              ) : (
                <div className="resource-thumb-mock">
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: '600' }}>{tpl.iconText}</span>
                </div>
              )}
            </div>
            <div className="resource-info">
              <h3>{tpl.title}</h3>
              <p>{tpl.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
