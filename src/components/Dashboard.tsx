import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import ResourcesView from './ResourcesView';
import TemplatePreview from './TemplatePreview';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, currentUser: any) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Dashboard({ setView }: { setView: (v: string) => void }) {
  const { user, logout } = useAuth();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeSearchItem, setActiveSearchItem] = useState('My Daily Tasks (80)');
  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [contextMenuProject, setContextMenuProject] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [dashboardTab, setDashboardTab] = useState('lovable_templates');
  
  const [firebaseProjects, setFirebaseProjects] = useState<any[]>([]);
  const [promptText, setPromptText] = useState('');
  const [renameProjectTarget, setRenameProjectTarget] = useState<{ id: string, name: string } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');
  
  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, 'projects'),
          where('ownerId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // sort locally
        docs.sort((a: any, b: any) => {
          const tA = a.updatedAt?.toMillis() || 0;
          const tB = b.updatedAt?.toMillis() || 0;
          return tB - tA;
        });
        setFirebaseProjects(docs);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'projects', user);
      }
    };
    fetchProjects();
  }, [user]);

  const lovableTemplates = [
    { id: '1', title: 'Lovable slides', desc: 'Code-powered presentation builder', bg: 'linear-gradient(135deg, #FF3366, #FF9933, #FF33CC)', textColor: '#fff', thumbJsx: <div style={{display:'flex', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', fontSize:'24px', fontWeight:'bold', color:'rgba(255,255,255,0.4)'}}>LovableSlides</div> },
    { id: '2', title: 'AssetWise', desc: 'Track company equipment, assign assets to employees, monitor defaults', bg: '#f9f9f9', textColor: '#000', thumbJsx: <div style={{padding:'20px'}}><div style={{fontSize:'18px', fontWeight:600, color:'#000'}}>The only asset tracker<br/>built for your team</div><div style={{marginTop:'10px', width:'100%', height:'100px', background:'#fff', border:'1px solid #eee', borderRadius:'8px', display:'flex', gap:'10px', padding:'10px'}}><div style={{flex:1, background:'#f4f4f5', borderRadius:'4px' }}></div><div style={{flex:1, background:'#f4f4f5', borderRadius:'4px'}}></div></div></div> },
    { id: '3', title: 'EventSpark', desc: 'Full-stack event management app with branded registration pages', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:600, color:'#000'}}>The event platform<br/>where ideas become</div><div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'20px'}}><div style={{width:'40px', height:'30px', background:'#ef4444', borderRadius:'4px'}}></div><div style={{width:'40px', height:'30px', background:'#3b82f6', borderRadius:'4px'}}></div></div></div> },
    { id: '4', title: 'CommCalc', desc: 'Real-time commission engine with comp plan builder, deal tracki...', bg: '#1f2937', textColor: '#fff', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:600, color:'#fff'}}>Stop guessing commissions.<br/>Start calculating them.</div><div style={{display:'flex', gap:'4px', alignItems:'flex-end', justifyContent:'center', marginTop:'20px', height:'40px'}}><div style={{width:'15px', height:'40%', background:'#f59e0b'}}/><div style={{width:'15px', height:'70%', background:'#10b981'}}/><div style={{width:'15px', height:'100%', background:'#3b82f6'}}/></div></div> },
    { id: '5', title: 'Architect Portfolio Website Template', desc: 'Firm website & showcase', bg: '#e5e7eb', textColor: '#000', thumbJsx: <div style={{display:'flex', flexDirection:'column', width:'100%', height:'100%', position:'relative'}}><div style={{height:'30px', background:'#000', color:'#fff', fontSize:'10px', display:'flex', alignItems:'center', padding:'0 10px'}}>HOME SERVICES ABOUT</div><div style={{flex:1, background:'#a1a1aa', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{fontSize:'24px', fontWeight:'bold', color:'#fff', letterSpacing:'4px'}}>MINIMAL<br/>ARCHITECTURE</div></div></div> },
    { id: '6', title: 'Continuum', desc: 'A calm, distraction-free habit tracker with streak counters, calenda...', bg: '#f3f4f6', textColor: '#000', thumbJsx: <div style={{padding:'20px'}}><div style={{fontSize:'20px', fontWeight:600, color:'#000', width:'60%'}}>Build lasting habits,<br/>one day at a time</div><div style={{marginTop:'20px', display:'flex', gap:'8px'}}><div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid #10b981'}}></div><div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid #10b981'}}></div><div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px dashed #9ca3af'}}></div></div></div> },
    { id: '7', title: 'Ecommerce Store Website Template', desc: 'Premium design for webstore', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{display:'flex', width:'100%', height:'100%'}}><div style={{flex:1, background:'#f4f4f5', padding:'20px'}}><div style={{width:'100%', height:'150px', background:'#e4e4e7', borderRadius:'8px'}}></div></div></div> },
    { id: '8', title: 'Inspo Canvas', desc: 'Spatial canvas for collecting, arranging, and sharing visual inspirati...', bg: '#fdf8f6', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center', position:'relative'}}><div style={{position:'absolute', top:'10px', left:'10px', width:'50px', height:'50px', background:'#fda4af', borderRadius:'8px', transform:'rotate(-10deg)'}}></div><div style={{position:'absolute', top:'30px', right:'20px', width:'60px', height:'40px', background:'#cbd5e1', borderRadius:'8px', transform:'rotate(5deg)'}}></div><div style={{fontSize:'24px', fontWeight:'bold', color:'#000', marginTop:'40px'}}>Inspo</div></div> },
    { id: '9', title: 'Event Platform Website Template', desc: 'Find, register, create events', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{padding:'40px 20px', textAlign:'center'}}><div style={{fontSize:'24px', fontWeight:'bold', color:'#000'}}>Discover <span style={{background:'#fbcfe8', padding:'2px 8px', borderRadius:'8px'}}>events</span><br/>near <span style={{border:'2px solid #000', padding:'2px 8px', borderRadius:'16px'}}>you</span></div></div> },
    { id: '10', title: 'PinPost', desc: 'See exactly how your post looks on Instagram, LinkedIn, X, and Fac...', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:600, color:'#000'}}>See exactly how your post<br/>looks before the world does</div><div style={{display:'flex', gap:'10px', marginTop:'20px', justifyContent:'center'}}><div style={{width:'40px', height:'60px', background:'#f1f5f9', borderRadius:'4px'}}></div><div style={{width:'40px', height:'60px', background:'#f1f5f9', borderRadius:'4px'}}></div><div style={{width:'40px', height:'60px', background:'#f1f5f9', borderRadius:'4px'}}></div></div></div> },
    { id: '11', title: 'Lifestyle Blog', desc: 'Sophisticated blog design', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{display:'flex', padding:'20px', gap:'10px'}}><div style={{width:'40%', background:'#f8fafc', borderRadius:'8px'}}></div><div style={{flex:1}}><div style={{fontSize:'16px', fontWeight:'bold'}}>Featured Article Title</div><div style={{fontSize:'10px', color:'#64748b', marginTop:'10px'}}>Featured article description...</div></div></div> },
    { id: '12', title: 'Upvote', desc: 'Collaborative feature voting board where teams submit ideas, upvo...', bg: '#f8fafc', textColor: '#000', thumbJsx: <div style={{padding:'20px'}}><div style={{width:'60%', background:'#fff', padding:'10px', borderRadius:'8px', border:'1px solid #e2e8f0', boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}><div style={{fontSize:'14px', fontWeight:600}}>Let your team<br/>decide what gets<br/>built next</div></div></div> },
    { id: '13', title: 'Visual Landing Page Website Template', desc: 'Showcase your company', bg: '#111827', textColor: '#fff', thumbJsx: <div style={{display:'flex', width:'100%', height:'100%'}}><div style={{width:'50%', padding:'20px'}}><div style={{fontSize:'24px', fontWeight:'bold', color:'#fff'}}>AI FILM<br/>PRODUCTION<br/>WITHOUT LIMITS</div></div><div style={{width:'50%', background:'#374151'}}></div></div> },
    { id: '14', title: 'Dealflow', desc: 'Visual pipeline board with drag-and-drop deals, activity logging, fo...', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:600}}>Close more deals<br/>with less busywork</div><div style={{display:'flex', gap:'10px', marginTop:'20px'}}><div style={{flex:1, background:'#f1f5f9', height:'80px', borderRadius:'8px'}}></div><div style={{flex:1, background:'#f1f5f9', height:'60px', borderRadius:'8px'}}></div><div style={{flex:1, background:'#f1f5f9', height:'100px', borderRadius:'8px'}}></div></div></div> },
    { id: '15', title: 'Photographer portfolio', desc: 'Interactive image showcase', bg: '#fdfbf7', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'12px', letterSpacing:'2px'}}>- MORGAN BLAKE -</div><div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'4px', marginTop:'10px'}}>{Array.from({length:15}).map((_,i)=><div key={i} style={{aspectRatio:'1', background:'#d6d3d1'}}></div>)}</div></div> },
    { id: '16', title: 'ExpenseDesk', desc: 'Centralized expense submission, approval workflows, and reimbur...', bg: '#f8fafc', textColor: '#000', thumbJsx: <div style={{display:'flex', height:'100%'}}><div style={{width:'30%', background:'#fff', borderRight:'1px solid #e2e8f0', padding:'10px'}}><div style={{width:'100%', height:'20px', background:'#f1f5f9', marginBottom:'10px'}}></div><div style={{width:'100%', height:'20px', background:'#f1f5f9'}}></div></div><div style={{flex:1, padding:'20px'}}><div style={{width:'100%', height:'100%', background:'#e2e8f0', borderRadius:'8px'}}></div></div></div> },
    { id: '17', title: 'Personal portfolio', desc: 'Personal work showcase', bg: '#1c1917', textColor: '#fff', thumbJsx: <div style={{display:'flex', width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}><div style={{fontSize:'20px', letterSpacing:'4px'}}>SARAH<br/>MITCHELL</div></div> },
    { id: '18', title: 'QuoteKit', desc: 'Create branded proposals with AI-assisted content, reusable temp...', bg: '#f0fdfa', textColor: '#000', thumbJsx: <div style={{padding:'20px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:600}}>Win more deals with<br/><span style={{color:'#0ea5e9'}}>beautiful proposals</span></div><div style={{width:'80%', height:'80px', background:'#fff', margin:'20px auto 0', borderRadius:'8px', border:'1px solid #bae6fd'}}></div></div> },
    { id: '19', title: 'Visual gallery', desc: 'Portfolio with image carousel', bg: '#ffffff', textColor: '#000', thumbJsx: <div style={{display:'flex', padding:'20px', gap:'10px', alignItems:'center'}}><div style={{width:'100px'}}><div style={{fontSize:'16px', fontWeight:'bold'}}>Jamie Rodrigues</div></div><div style={{display:'flex', gap:'5px', overflow:'hidden'}}><div style={{width:'40px', height:'120px', background:'#fef08a'}}></div><div style={{width:'40px', height:'120px', background:'#fca5a5'}}></div><div style={{width:'40px', height:'120px', background:'#a7f3d0'}}></div><div style={{width:'40px', height:'120px', background:'#bfdbfe'}}></div></div></div> },
  ];

  const handleCreateProject = async () => {
    if (!user || !promptText.trim()) return;
    try {
      const newDoc = {
        title: promptText,
        ownerId: user.uid,
        placeholderBg: '#1e3a8a',
        published: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'projects'), newDoc);
      setPromptText('');
      setFirebaseProjects(prev => [{ id: docRef.id, ...newDoc, createdAt: { toMillis: () => Date.now() }, updatedAt: { toMillis: () => Date.now() } }, ...prev]);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'projects', user);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setFirebaseProjects(prev => prev.filter(p => p.id !== projectId));
      setContextMenuProject(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'projects', user);
    }
  };

  const handleRenameProjectSubmit = async () => {
    if (!user || !renameProjectTarget || !renameInput.trim()) return;
    try {
      await updateDoc(doc(db, 'projects', renameProjectTarget.id), {
        title: renameInput.trim(),
        updatedAt: serverTimestamp()
      });
      setFirebaseProjects(prev => prev.map(p => p.id === renameProjectTarget.id ? { ...p, title: renameInput.trim() } : p));
      setRenameProjectTarget(null);
      setRenameInput('');
      setContextMenuProject(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'projects', user);
    }
  };

  const handleToggleStar = async (projectId: string, currentStarred: boolean) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        starred: !currentStarred,
        updatedAt: serverTimestamp()
      });
      setFirebaseProjects(prev => prev.map(p => p.id === projectId ? { ...p, starred: !currentStarred } : p));
      setContextMenuProject(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'projects', user);
    }
  };

  // Toggle search modal with Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (cmdOpen) setCmdOpen(false);
        if (wsDropdownOpen) setWsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmdOpen, wsDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setWsDropdownOpen(false);
      }
      // Click outside for context menu
      if (!(event.target as Element).closest('.db-project-context-menu') && !(event.target as Element).closest('.db-project-more')) {
        setContextMenuProject(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const projects = [
    { title: 'My Daily Tasks (80)', time: 'Edited 1 day ago', placeholderBg: '#fff', published: true, jsx: (
      <div style={{ color: '#000', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Today.</div>
        <div style={{ fontSize: '10px' }}>What needs to happen?</div>
      </div>
    ) },
    { title: 'Pixel Perfect Clone', time: 'Edited 1 day ago', placeholderBg: '#1f1f22', published: false, jsx: (
      <div style={{ padding: '20px', width: '100%' }}>
        <div style={{ width: '40px', height: '6px', background: '#3f3f46', borderRadius: '4px', marginBottom: '8px' }}></div>
        <div style={{ width: '60px', height: '6px', background: '#3f3f46', borderRadius: '4px', marginBottom: '16px' }}></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '30px', height: '20px', background: '#27272a', borderRadius: '4px' }}></div>
          <div style={{ flex: 1, height: '20px', background: '#27272a', borderRadius: '4px' }}></div>
        </div>
      </div>
    ) },
    { title: 'Remix of Lovable slides (00)', time: 'Edited 2 days ago', placeholderBg: '#18181b', published: false, jsx: (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ background: '#064e3b', width: '50%', display: 'grid', placeItems: 'center' }}>
          <span style={{ fontSize: '24px' }}>🇵🇰</span>
        </div>
        <div style={{ background: '#78350f', width: '50%', opacity: 0.8 }}></div>
      </div>
    ) },
    { title: 'Remix of Lovable slides', time: 'Edited 3 days ago', placeholderBg: '#1e3a8a', published: true, jsx: (
      <div style={{ textAlign: 'left', width: '100%', padding: '24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '12px' }}>Build presentations<br />in code.</div>
        <div style={{ width: '100px', height: '4px', background: '#3b82f6', borderRadius: '2px' }}></div>
      </div>
    ) },
    { title: 'Build something Lovable', time: 'Edited 3 days ago', placeholderBg: '#eff6ff', published: false, jsx: (
      <div style={{ textAlign: 'center', color: '#000' }}>
        <div style={{ fontSize: '16px', fontWeight: 800 }}>Build something</div>
        <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '-4px' }}>Lovable</div>
      </div>
    ) },
    { title: 'Feed Wizard', time: 'Edited 4 days ago', placeholderBg: '#f9fafb', published: false, jsx: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}></div>
        <div style={{ width: '120px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
      </div>
    ) },
    { title: 'Financial Forecast App', time: 'Edited 5 days ago', placeholderBg: '#0f172a', published: true, jsx: (
      <div style={{ textAlign: 'left', width: '100%', padding: '24px', color: '#fff' }}>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Investor-ready<br />in under a min...</div>
      </div>
    ) },
    { title: 'Anthropic Model Checker', time: 'Edited 23 days ago', placeholderBg: '#fff', published: false, jsx: (
      <div style={{ textAlign: 'center', color: '#000', opacity: 0.5 }}>
        <div style={{ fontSize: '10px' }}>Your app starts here</div>
      </div>
    ) },
  ];

  return (
    <div id="dashboard-view">
      {/* Rename Modal */}
      <div className={`cmd-modal ${renameProjectTarget ? 'active' : ''}`} onClick={() => setRenameProjectTarget(null)}>
        <div className="cmd-box" onClick={e => e.stopPropagation()} style={{ padding: '24px', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Rename Project</h2>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '8px' }}>Project Name</label>
            <input 
              type="text" 
              value={renameInput} 
              onChange={e => setRenameInput(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#131314', border: '1px solid #27272a', color: '#fff', fontSize: '14px' }} 
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button onClick={() => setRenameProjectTarget(null)} style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleRenameProjectSubmit} style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', background: '#ea580c', border: 'none', color: '#fff', cursor: 'pointer' }}>Rename</button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <div className={`cmd-modal ${settingsOpen ? 'active' : ''}`} onClick={() => setSettingsOpen(false)}>
        <div className="cmd-box" onClick={e => e.stopPropagation()} style={{ padding: '24px', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Settings</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '8px' }}>Theme</label>
            <select style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#131314', border: '1px solid #27272a', color: '#fff', fontSize: '14px' }}>
              <option>Dark Mode</option>
              <option>Light Mode</option>
              <option>System Default</option>
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '8px' }}>Default Project Privacy</label>
            <select style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#131314', border: '1px solid #27272a', color: '#fff', fontSize: '14px' }}>
              <option>Private</option>
              <option>Public</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button onClick={() => setSettingsOpen(false)} style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => setSettingsOpen(false)} style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', background: '#ea580c', border: 'none', color: '#fff', cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      </div>

      <div className={`cmd-modal ${cmdOpen ? 'active' : ''}`} onClick={() => setCmdOpen(false)}>
        <div className="cmd-box" onClick={e => e.stopPropagation()}>
          <div className="cmd-input-wrap">
            <input type="text" className="cmd-input" placeholder="Search..." autoFocus />
          </div>
          <div className="cmd-body">
            <div className="cmd-left">
              <div className="cmd-group-title">Recent projects</div>
              <div className="cmd-item active" onClick={() => setActiveSearchItem('My Daily Tasks (80)')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                My Daily Tasks (80)
              </div>
              <div className="cmd-item" onClick={() => setActiveSearchItem('Pixel Perfect Clone')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Pixel Perfect Clone
              </div>
              <div className="cmd-item" onClick={() => setActiveSearchItem('Remix of Lovable slides (00)')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Remix of Lovable slides (00)
              </div>
              <div className="cmd-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Your Personal Hub
              </div>
              
              <div className="cmd-group-title">Navigate to</div>
              <div className="cmd-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                Dashboard
              </div>
              <div className="cmd-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Create new project
              </div>
            </div>
            
            <div className="cmd-right">
              {activeSearchItem === 'My Daily Tasks (80)' && (
                <>
                  <div className="cmd-preview-thumb" style={{ background: '#fff' }}>
                    <div style={{ color: '#000', textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Today.</div>
                      <div style={{ fontSize: '12px' }}>What needs to happen?</div>
                    </div>
                  </div>
                  <div className="cmd-preview-details">
                    <div className="cmd-preview-title">My Daily Tasks (80)</div>
                    <div className="cmd-meta-grid">
                      <div className="cmd-meta-group">
                        <div className="cmd-meta-label">Created by</div>
                        <div className="cmd-meta-value">Asad Ali</div>
                      </div>
                      <div className="cmd-meta-group">
                        <div className="cmd-meta-label">Status</div>
                        <div className="cmd-meta-value">Published</div>
                      </div>
                      <div className="cmd-meta-group">
                        <div className="cmd-meta-label">Created</div>
                        <div className="cmd-meta-value">2 days ago</div>
                      </div>
                      <div className="cmd-meta-group">
                        <div className="cmd-meta-label">Last edited</div>
                        <div className="cmd-meta-value">1 day ago</div>
                      </div>
                      <div className="cmd-meta-group">
                        <div className="cmd-meta-label">Last opened</div>
                        <div className="cmd-meta-value">19 hours ago</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="cmd-footer">
            <span>Open published project <kbd>Ctrl</kbd> <kbd>↵</kbd></span>
            <span>Open project <kbd>↵</kbd></span>
          </div>
        </div>
      </div>

      <div className={`db-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="db-sidebar-header">
          <div className="db-brand-logo">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#lovable-grad)"/>
              <defs>
                <linearGradient id="lovable-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fb923c" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <button className="db-sidebar-collapse" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>

        <div className="db-ws-dropdown-container" ref={dropdownRef}>
          <div className="db-ws-dropdown" onClick={() => setWsDropdownOpen(!wsDropdownOpen)}>
            <div className="db-ws-left">
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="db-ws-avatar" />
              ) : (
                <div className="db-ws-avatar">
                  {user?.email?.[0].toUpperCase() || 'A'}
                </div>
              )}
              <div className="db-ws-name">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}'s Lovable</div>
            </div>
            <svg className="db-ws-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {wsDropdownOpen && (
            <div className="db-ws-popover">
              <div className="db-ws-popover-header">
                <div className="db-ws-avatar db-ws-avatar-lg">A</div>
                <div className="db-ws-popover-info">
                  <div className="db-ws-popover-name">Asad's Lovable</div>
                  <div className="db-ws-popover-plan">Free Plan • 3 members</div>
                </div>
              </div>
              <div className="db-ws-popover-actions">
                <button className="db-ws-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Settings
                </button>
                <button className="db-ws-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                  Invite members
                </button>
              </div>

              <div className="db-ws-promo">
                <div className="db-ws-promo-left">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  Turn Pro
                </div>
                <button className="db-ws-upgrade-btn">Upgrade</button>
              </div>

              <div className="db-ws-credits">
                <div className="db-ws-credits-header">
                  <span>Credits</span>
                  <span className="db-ws-credits-upgrade">Upgrade &gt;</span>
                </div>
                <div className="db-ws-progress">
                  <div className="db-ws-progress-fill" style={{width: '20%'}}></div>
                </div>
                <div className="db-ws-credits-info">
                  <div className="db-ws-credits-dot"></div>
                  Free credits reset on 01 Jun
                </div>
              </div>

              <div className="db-ws-list">
                <div className="db-ws-list-header">All workspaces</div>
                <div className="db-ws-list-item active">
                  <div className="db-ws-avatar db-ws-avatar-sm">A</div>
                  <span className="db-ws-list-name">Asad's Lovable</span>
                  <span className="db-ws-badge">FREE</span>
                  <svg className="db-ws-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="db-ws-list-item">
                  <div className="db-ws-avatar db-ws-avatar-sm" style={{background: '#2563eb'}}>A</div>
                  <span className="db-ws-list-name">ASAD's Lovable</span>
                  <span className="db-ws-badge">FREE</span>
                </div>
                <div className="db-ws-list-item">
                  <div className="db-ws-avatar db-ws-avatar-sm" style={{background: '#e11d48'}}>M</div>
                  <span className="db-ws-list-name">Mian's Lovable</span>
                  <span className="db-ws-badge">FREE</span>
                </div>
              </div>
              <div className="db-ws-create">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create new workspace
              </div>
            </div>
          )}
        </div>

        <div className="db-sidebar-scroll" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="db-nav-group">
            <div className={`db-nav-item ${activeNav === 'home' ? 'active' : ''}`} onClick={() => setActiveNav('home')}>
              <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Home
            </div>
          <div className="db-nav-item" onClick={() => setCmdOpen(true)}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            Search
            <div className="db-nav-shortcut"><kbd>Ctrl</kbd> <kbd>K</kbd></div>
          </div>
          <div className={`db-nav-item ${activeNav === 'resources' ? 'active' : ''}`} onClick={() => setActiveNav('resources')}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
            Resources
          </div>
          <div className="db-nav-item">
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="4" rx="1" ry="1" /><path d="M12 6v2" /><path d="M12 12v2" /><path d="M12 22v-6" /><path d="M8 22v-6" /><path d="M16 22v-6" /></svg>
            Connectors
          </div>

          <div className="db-sidebar-section-title" style={{ marginTop: '24px', fontSize: '11px', fontWeight: 600, color: '#71717a', padding: '0 12px', marginBottom: '8px' }}>
             Projects
          </div>
          <div className={`db-nav-item ${activeNav === 'all_projects' ? 'active' : ''}`} onClick={() => setActiveNav('all_projects')}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            All projects
          </div>
          <div className={`db-nav-item ${activeNav === 'starred' ? 'active' : ''}`} onClick={() => setActiveNav('starred')}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Starred
          </div>
          {firebaseProjects.filter(p => p.starred).length > 0 && (
            <div className="db-sidebar-subgroup" style={{ marginBottom: '4px' }}>
              {firebaseProjects.filter(p => p.starred).map(proj => (
                <div key={proj.id} className="db-nav-subitem" onClick={() => setActiveNav('home')}>
                  <span className="db-nav-subitem-title">{proj.title}</span>
                  <button 
                    className="db-nav-subitem-more"
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setContextMenuPos({ x: rect.right + 8, y: rect.bottom });
                      setContextMenuProject(proj.id);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className={`db-nav-item ${activeNav === 'created_by_me' ? 'active' : ''}`} onClick={() => setActiveNav('created_by_me')}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Created by me
          </div>
          <div className={`db-nav-item ${activeNav === 'shared_with_me' ? 'active' : ''}`} onClick={() => setActiveNav('shared_with_me')}>
            <svg className="db-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Shared with me
          </div>

          <div className="db-sidebar-section-title" style={{ marginTop: '24px', fontSize: '11px', fontWeight: 600, color: '#71717a', padding: '0 12px', marginBottom: '8px' }}>
            Recents
          </div>

          <div className="db-project-list">
            {firebaseProjects.map(proj => (
              <div key={proj.id} className={`db-project-item ${proj.starred ? 'starred' : ''}`}>
                <div className="db-project-name">{proj.title}</div>
                <button 
                  className="db-project-more" 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setContextMenuPos({ x: rect.right + 8, y: rect.top });
                    setContextMenuProject(proj.id);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {contextMenuProject && (
          <div className="db-project-context-menu" style={{ left: contextMenuPos.x, top: contextMenuPos.y }}>
            <div className="db-project-context-item" onClick={() => {
              const proj = firebaseProjects.find(p => p.id === contextMenuProject);
              if (proj) handleToggleStar(proj.id, proj.starred === true);
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              {firebaseProjects.find(p => p.id === contextMenuProject)?.starred ? 'Unstar' : 'Star'}
            </div>
            <div className="db-project-context-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              Move to folder
            </div>
            <div className="db-project-context-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              Remix
            </div>
            <div className="db-project-context-item" onClick={() => {
              const proj = firebaseProjects.find(p => p.id === contextMenuProject);
              setRenameProjectTarget({ id: contextMenuProject, name: proj?.title || '' });
              setRenameInput(proj?.title || '');
              setContextMenuProject(null);
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              Rename
            </div>
            <div className="db-project-context-item" onClick={() => { setSettingsOpen(true); setContextMenuProject(null); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </div>
            <div className="db-project-context-item danger" onClick={() => handleDeleteProject(contextMenuProject)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              Delete
            </div>
          </div>
        )}

        <div className="db-sidebar-bottom">
          <div className="db-bottom-item" onClick={() => setSettingsOpen(true)}>
            <div>
              Settings
              <span className="db-bottom-item-sub">Project configurations</span>
            </div>
            <div className="db-icon-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
          </div>
          <div className="db-bottom-item">
            <div>
              Share Lovable
              <span className="db-bottom-item-sub">100 credits per paid referral</span>
            </div>
            <div className="db-icon-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
            </div>
          </div>
          <div className="db-bottom-item">
            <div>
              Upgrade to Pro
              <span className="db-bottom-item-sub">Unlock more features</span>
            </div>
            <div className="db-icon-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
          </div>
          <div className="db-sidebar-user">
            <div className="db-user-avatar-wrap" onClick={() => logout()}>
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="db-user-avatar-small" />
              ) : (
                <div className="db-user-avatar-small">
                  {user?.email?.[0].toUpperCase() || 'A'}
                </div>
              )}
              <div className="db-user-status-dot"></div>
            </div>
            <div className="db-inbox-wrap">
              <svg className="db-bell-icon" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><polyline points="3 7 12 13 21 7" /></svg>
              <div className="db-inbox-badge">1</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="db-main">
        <div className="db-mesh-bg"></div>
        <div className="db-content-scroll">
          {activeNav === 'home' ? (
            <>
              <div className="db-hero">
                <div className="db-hero-pill">
                  <div className="db-circle-group">
                    <span className="db-circle-logo" style={{background: '#ea580c'}}></span>
                    <span className="db-circle-logo" style={{background: '#0ea5e9'}}></span>
                    <span className="db-circle-logo" style={{background: '#4f46e5'}}></span>
                  </div>
                  Power your app with connectors
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
                <h1 className="db-hero-title">Got an idea, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}?</h1>
                
                <div className="db-prompt-bar-wrap">
                  <div className="db-prompt-input-row">
                    <textarea className="db-prompt-input" placeholder="Ask Lovable to create a dashboard to..." rows={1} value={promptText} onChange={(e) => setPromptText(e.target.value)} />
                    <div className="db-prompt-input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                  </div>
                  <div className="db-prompt-tools">
                    <button className="db-prompt-tool-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <div className="db-prompt-build-grp">
                      <div className="db-build-select">
                        Build
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                      <button className="db-prompt-tool-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                      </button>
                      <button className="db-build-btn" onClick={handleCreateProject}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="db-projects-box">
                <div className="db-tabs-bar">
                  <div className="db-tabs">
                    <button className={`db-tab ${dashboardTab === 'my_projects' ? 'active' : ''}`} onClick={() => setDashboardTab('my_projects')}>My projects</button>
                    <button className={`db-tab ${dashboardTab === 'recently_viewed' ? 'active' : ''}`} onClick={() => setDashboardTab('recently_viewed')}>Recently viewed</button>
                    <button className={`db-tab ${dashboardTab === 'starred' ? 'active' : ''}`} onClick={() => setDashboardTab('starred')}>Starred</button>
                    <button className={`db-tab ${dashboardTab === 'shared_with_me' ? 'active' : ''}`} onClick={() => setDashboardTab('shared_with_me')}>Shared with me</button>
                    <button className={`db-tab ${dashboardTab === 'lovable_templates' ? 'active' : ''}`} onClick={() => setDashboardTab('lovable_templates')}>Lovable templates</button>
                  </div>
                  <button className="db-browse-all">
                    Browse all
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                </div>

                <div className="db-grid">
                  {dashboardTab === 'lovable_templates' ? (
                    lovableTemplates.map((t, i) => (
                      <div key={t.id} className="db-card template-card" onClick={() => { setPromptText(`I want an app like ${t.title}`); setView('editor'); }}>
                        <div className="db-card-thumb-wrap">
                          <div className="db-card-placeholder" style={{ background: t.bg }}>
                            {t.thumbJsx}
                          </div>
                        </div>
                        <div className="db-card-meta template-meta">
                          <div className="db-card-text">
                            <div className="db-card-title">{t.title}</div>
                            <div className="db-card-desc" style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '4px' }}>{t.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    firebaseProjects.map((p, i) => (
                      <div key={p.id} className="db-card" onClick={() => setView('editor')}>
                        <div className="db-card-thumb-wrap">
                          <div className="db-card-placeholder" style={{ background: p.placeholderBg }}>
                            <div style={{ textAlign: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold', padding: '20px' }}>{p.title}</div>
                          </div>
                          {p.published && <div className="db-card-badge">Published</div>}
                        </div>
                        <div className="db-card-meta">
                          <div className="db-card-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><polyline points="11 3 11 11 14 8 17 11 17 3" /></svg>
                          </div>
                          <div className="db-card-text">
                            <div className="db-card-title">{p.title}</div>
                            <div className="db-card-desc">Just now</div>
                          </div>
                          <button 
                            className="db-project-more"
                            style={{ marginLeft: 'auto', background: 'transparent', alignSelf: 'center', opacity: 0.6 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const rect = e.currentTarget.getBoundingClientRect();
                              setContextMenuPos({ x: rect.right - 180, y: rect.bottom + 8 });
                              setContextMenuProject(p.id);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : activeNav === 'resources' ? (
            <ResourcesView setPreviewTemplate={setPreviewTemplate} />
          ) : (
            <div className="db-project-view">
              <h2 className="db-view-title">
                {activeNav === 'starred' ? 'Starred' : activeNav === 'created_by_me' ? 'Created by me' : activeNav === 'shared_with_me' ? 'Shared with me' : 'All projects'}
              </h2>
              
              <div className="db-view-toolbar">
                <div className="db-view-search-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" className="db-view-search" placeholder={`Search ${activeNav.replace(/_/g, ' ')}...`} />
                </div>
                <button className="db-view-filter">Last edited <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                <button className="db-view-filter">Any visibility <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                <button className="db-view-filter">Any status <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                <button className="db-view-filter">All creators <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                
                <div className="db-view-toggles">
                  <div className="db-view-viewmode">
                    <button className="db-view-viewbtn active">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                    <button className="db-view-viewbtn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>
                  </div>
                  <button className="db-view-viewbtn" style={{ marginLeft: '4px', border: '1px solid #27272a', borderRadius: '8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </button>
                </div>
              </div>

              {((activeNav === 'starred' && !firebaseProjects.some(p => p.starred)) || 
                (activeNav === 'all_projects' && firebaseProjects.length === 0) ||
                (activeNav === 'created_by_me' && firebaseProjects.filter(p => p.ownerId === user?.uid).length === 0) ||
                (activeNav === 'shared_with_me' && firebaseProjects.filter(p => p.ownerId !== user?.uid).length === 0)) ? (
                <div className="db-empty-state">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" color="#52525b" opacity="0.6">
                    {activeNav === 'starred' ? (
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    ) : (
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/>
                    )}
                  </svg>
                  <h3 className="db-empty-title">
                    {activeNav === 'starred' ? 'Star projects to access them quickly from any workspace' : 'No projects found here'}
                  </h3>
                  <button className="db-empty-btn" onClick={() => setActiveNav('home')}>Browse projects</button>
                  <div className="db-empty-img">
                    <div className="db-empty-img-glass">
                      <div className="db-empty-img-content">lovable / attach / workspace</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="db-grid" style={{ marginTop: '0' }}>
                  {firebaseProjects
                    .filter(p => {
                      if (activeNav === 'starred') return p.starred;
                      if (activeNav === 'created_by_me') return p.ownerId === user?.uid;
                      if (activeNav === 'shared_with_me') return p.ownerId !== user?.uid;
                      return true;
                    })
                    .map((p, i) => (
                    <div key={p.id} className="db-card" onClick={() => setView('editor')}>
                      <div className="db-card-thumb-wrap">
                        <div className="db-card-placeholder" style={{ background: p.placeholderBg }}>
                          <div style={{ textAlign: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold', padding: '20px' }}>{p.title}</div>
                        </div>
                        {p.published && <div className="db-card-badge">Published</div>}
                      </div>
                      <div className="db-card-meta">
                        <div className="db-card-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><polyline points="11 3 11 11 14 8 17 11 17 3" /></svg>
                        </div>
                        <div className="db-card-text">
                          <div className="db-card-title">{p.title}</div>
                          <div className="db-card-desc">Just now</div>
                        </div>
                        <button 
                          className="db-project-more"
                          style={{ marginLeft: 'auto', background: 'transparent', alignSelf: 'center', opacity: 0.6 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setContextMenuPos({ x: rect.right - 180, y: rect.bottom + 8 });
                            setContextMenuProject(p.id);
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {previewTemplate && <TemplatePreview id={previewTemplate} onClose={() => setPreviewTemplate(null)} />}
    </div>
  );
}
