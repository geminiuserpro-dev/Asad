import React, { useRef, useEffect } from 'react';
import { Globe, Link as LinkIcon, ChevronRight, Globe2, Link2, Download, Upload, Users, UserPlus } from 'lucide-react';
import '../styles/share-menu.css';

export default function ShareMenu({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: any }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="share-dropdown-wrap" ref={menuRef}>
      <div className="sd-title">Share project</div>
      <div className="sd-input-wrap">
        <input type="text" className="sd-input" placeholder="Add people" />
      </div>

      <div className="sd-section-title">Project access</div>
      
      <div className="sd-list">
        <div className="sd-item">
          <div className="sd-item-left">
            <div className="sd-item-icon">
              <Globe2 size={12} />
            </div>
            <div className="sd-item-name">People you invited</div>
          </div>
          <div className="sd-item-right">
            <div className="sd-avatar-stack">
              <div className="sd-av-green">M</div>
              <div className="sd-av-gray">E</div>
            </div>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="sd-item">
          <div className="sd-item-left">
            <div className="sd-item-icon sd-icon-blue">
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="sd-item-name">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'ASAD'}'s Lovable</div>
          </div>
          <div className="sd-item-right">
            Can edit <ChevronRight size={14} className="sd-chevron-up" />
          </div>
        </div>

        <div className="sd-item">
          <div className="sd-item-left">
            <div className="sd-item-icon sd-icon-brown">
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="sd-item-info">
              <div className="sd-item-name">{user?.displayName || 'ASAD ALI'}</div>
              <div className="sd-item-sub">{user?.email || 'asad@lovable.dev'}</div>
            </div>
          </div>
          <div className="sd-item-right sd-text-light">
            Owner
          </div>
        </div>

        <div className="sd-item">
          <div className="sd-item-left">
            <div className="sd-item-icon">
              <UserPlus size={12} />
            </div>
            <div className="sd-item-name">Invite link</div>
          </div>
          <div className="sd-item-right">
            Disabled <ChevronRight size={14} className="sd-chevron-up" />
          </div>
        </div>
      </div>

      <div className="sd-buttons">
        <button className="sd-btn-primary">Create invite link</button>
        <button className="sd-btn-secondary">
          <Upload size={14} /> Publish project
        </button>
        <button className="sd-btn-secondary">
          <LinkIcon size={14} /> Share preview
        </button>
      </div>
    </div>
  );
}
