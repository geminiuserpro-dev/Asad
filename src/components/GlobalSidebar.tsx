import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDown, Home, Search, FolderOpen, Star, FolderLock, Plus, Zap, Heart, Gift, Settings, LogOut } from 'lucide-react';
import '../styles/dashboard.css';

export default function GlobalSidebar({ isOpen, onClose, setView }: { isOpen: boolean, onClose: () => void, setView: (v: string) => void }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={onClose} />
      <div className="db-sidebar" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10000, width: '256px', background: '#18181b', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
        
        {/* Workspace Dropdown */}
        <div style={{ padding: '16px' }}>
          <div className="db-ws-dropdown" style={{ margin: 0, width: '100%' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="db-ws-left">
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="db-ws-avatar" />
              ) : (
                <div className="db-ws-avatar" style={{ background: '#2563eb' }}>
                  {user?.email?.[0].toUpperCase() || 'A'}
                </div>
              )}
              <div className="db-ws-name">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'ASAD'}'s Lovable</div>
            </div>
            <svg className="db-ws-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="db-sidebar-scroll" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="db-nav-group">
            <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
              <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Home
            </div>
            <div className="db-nav-item">
              <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Search
              <div className="db-nav-shortcut"><kbd>Ctrl</kbd> <kbd>K</kbd></div>
            </div>
            <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
              <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
              Resources
            </div>
            <div className="db-nav-item">
              <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="4" rx="1" ry="1" /><path d="M12 6v2" /><path d="M12 12v2" /><path d="M12 22v-6" /><path d="M8 22v-6" /><path d="M16 22v-6" /></svg>
              Connectors
            </div>
          </div>

          <div className="db-sidebar-section-title" style={{ marginTop: '24px', fontSize: '11px', fontWeight: 600, color: '#71717a', padding: '0 12px', marginBottom: '8px' }}>
             Projects
          </div>
          <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            All projects
          </div>
          <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Starred
          </div>
          <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Created by me
          </div>
          <div className="db-nav-item" onClick={() => { setView('dashboard'); onClose(); }}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Shared with me
          </div>
          
          <div className="db-sidebar-section-title" style={{ marginTop: '24px', fontSize: '11px', fontWeight: 600, color: '#71717a', padding: '0 12px', marginBottom: '8px' }}>
            Recents
          </div>
          <div className="db-project-list">
             <div className="db-project-item">
               <div className="db-project-name">Remix of Sweet Clone</div>
             </div>
             <div className="db-project-item active">
               <div className="db-project-name">Remix of Sweet Clone</div>
             </div>
          </div>
        </div>

        <div className="db-sidebar-bottom">
          <div className="db-bottom-item">
            <div>
              Share Lovable
              <span className="db-bottom-item-sub">100 credits per paid referral</span>
            </div>
            <div className="db-icon-box" style={{ background: '#27272a' }}>
               <Gift size={12} color="#a1a1aa" />
            </div>
          </div>
          
          <div className="db-sidebar-user">
            <div className="db-user-avatar-wrap" onClick={() => logout()}>
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="db-user-avatar-small" />
              ) : (
                <div className="db-user-avatar-small" style={{ background: '#2563eb' }}>
                  {user?.email?.[0].toUpperCase() || 'A'}
                </div>
              )}
            </div>
            <div className="db-user-info">
              <div className="db-user-email">{user?.email || 'asad@lovable.dev'}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
