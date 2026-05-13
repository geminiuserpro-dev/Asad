import {
  FileText, Code, MoreHorizontal, Monitor, ExternalLink, RefreshCw, MessageSquare, Plus, Check, Pencil, Trash, Bolt, Undo2, ThumbsUp, ThumbsDown, Copy, Bot, LayoutTemplate, LineChart, ChevronDown, ChevronLeft, Gift, Settings, Link, Repeat, Globe2, Edit2, Star, Info, Palette, HelpCircle
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Analytics from './Analytics';
import GlobalSidebar from './GlobalSidebar';
import { useAuth } from '../contexts/AuthContext';
import '../styles/analytics.css';
import '../styles/project-menu.css';
import '../styles/preview-modes.css';

export default function Editor({ setView }: any) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<{id: number; text: string; done: boolean}[]>([
    { id: 1, text: 'asdf', done: true },
    { id: 2, text: 'noyhing', done: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [globalSidebarOpen, setGlobalSidebarOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'preview' | 'files' | 'code'>('code');
  const projectMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectMenuRef.current && !projectMenuRef.current.contains(event.target as Node)) {
        setProjectMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Enhance transition animation and remove financial highlights and add more slides' },
    { role: 'ai', content: 'Done. Removed the Financial Highlights slide, expanded to **15 slides** (added *How It Works*, *Traction & Roadmap*, *Go-to-Market*, *Competitive Landscape*), and injected alternating **Fade / Push** slide transitions into the .pptx XML so PowerPoint will animate between slides.\n\n**QA:** Rendered all 15 slides to images. Caught and fixed a timeline overflow on slide 8 (nodes were clipping the slide edges) — now properly inset. Updated pitch script timed for the new 15-slide flow.', title: 'AutoDev Systems Pitch', tools: 21, time: '4s' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearDone = () => {
    setTodos(todos.filter(t => !t.done));
  };

  const activeCount = todos.filter(t => !t.done).length;

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div id="editor-view" className="active">
      <div className="browser-window">
        <main className="lovable-shell">
          <section className="lovable-topbar">
            {globalSidebarOpen && <GlobalSidebar isOpen={globalSidebarOpen} onClose={() => setGlobalSidebarOpen(false)} setView={setView} />}
            <div className="project-cell">
              <div 
                className="editor-ws-trigger" 
                onClick={() => setGlobalSidebarOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px 8px 4px 6px', borderRadius: '6px', background: 'transparent', marginRight: '8px', border: '1px solid transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = '#27272a'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                  {user && user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" style={{ width: 20, height: 20, borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: '4px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>
                      {user?.email?.[0].toUpperCase() || 'A'}
                    </div>
                  )}
                 <span style={{ fontSize: '13px', fontWeight: 500, color: '#e5e5e5' }}>{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'ASAD'}'s Lovable</span>
                 <ChevronDown size={14} color="#a1a1aa" />
              </div>
              <div ref={projectMenuRef} className="project-copy" style={{ position: 'relative' }}>
                <button className="project-name" onClick={() => setProjectMenuOpen(!projectMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Remix of Sweet Clone
                  <ChevronDown size={14} />
                </button>
                <span>Previewing last saved version</span>

                {projectMenuOpen && (
                  <div className="editor-project-menu">
                    <div className="epm-section">
                      <button className="epm-item" onClick={() => setView('dashboard')}>
                        <div className="epm-item-left">
                          <span className="epm-icon"><ChevronLeft size={14} /></span>
                          Go to Dashboard
                        </div>
                      </button>
                    </div>

                    <div className="epm-section">
                      <div className="epm-user-info">
                        <div className="epm-user-left">
                          <div className="epm-avatar">A</div>
                          ASAD's Lovable
                        </div>
                        <span className="epm-badge">FREE</span>
                      </div>
                      <div className="epm-credits-info">
                        <div className="epm-credits-header">
                          <span>Credits</span>
                          <span>5 left</span>
                        </div>
                        <div className="epm-credits-bar-bg">
                          <div className="epm-credits-bar-fill"></div>
                        </div>
                        <div className="epm-credits-sub">
                          <span className="epm-credits-dot"></span>
                          Daily credits reset at midnight UTC
                        </div>
                      </div>
                    </div>

                    <div className="epm-section">
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Gift size={14} /></span>
                          Get free credits
                        </div>
                      </button>
                    </div>

                    <div className="epm-section">
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Settings size={14} /></span>
                          Settings
                        </div>
                        <div className="epm-item-right">Ctrl .</div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Link size={14} /></span>
                          Connectors
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Repeat size={14} /></span>
                          Remix this project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Globe2 size={14} /></span>
                          Publish to profile
                        </div>
                        <span className="epm-badge-new">New</span>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Edit2 size={14} /></span>
                          Rename project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Star size={14} /></span>
                          Star project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Info size={14} /></span>
                          Details
                        </div>
                      </button>
                    </div>

                    <div className="epm-section">
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><Palette size={14} /></span>
                          Appearance
                        </div>
                        <div className="epm-item-right"><ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} /></div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon"><HelpCircle size={14} /></span>
                          Help
                        </div>
                        <div className="epm-item-right">↗</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="project-tools">
                <button className="tool-button quiet rotating">
                  <RefreshCw size={18} />
                </button>
                <button className="tool-button quiet">
                  <LayoutTemplate size={18} />
                </button>
              </div>
            </div>

            <div className="preview-toolbar">
              <div className="left-mode-controls">
                {editorMode === 'preview' ? (
                  <button className="pill-button active" type="button">
                    <Monitor size={18} />
                    <span>Preview</span>
                  </button>
                ) : (
                  <button className="tool-button" onClick={() => setEditorMode('preview')}>
                    <Monitor size={18} />
                  </button>
                )}
                {editorMode === 'files' ? (
                  <button className="pill-button active" type="button">
                    <FileText size={18} />
                    <span>Files</span>
                  </button>
                ) : (
                  <button className="tool-button" onClick={() => setEditorMode('files')}>
                    <FileText size={18} />
                  </button>
                )}
                {editorMode === 'code' ? (
                  <button className="pill-button active" type="button">
                    <Code size={18} />
                    <span>Code</span>
                  </button>
                ) : (
                  <button className="tool-button" onClick={() => setEditorMode('code')}>
                    <Code size={18} />
                  </button>
                )}
                <button className="tool-button">
                  <MoreHorizontal size={18} />
                </button>
                <div className="chrome-divider" style={{height: '18px', margin: '0 4px', background: '#333'}}></div>
                <button 
                  className={`pill-button ${showAnalytics ? 'active' : ''}`}
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  style={{ width: '130px', background: showAnalytics ? 'var(--blue-soft)' : 'transparent', color: showAnalytics ? '#3982ff' : '#d7d7d7' }}
                >
                  <LineChart size={18} />
                  <span>Analytics</span>
                </button>
              </div>

              {editorMode === 'preview' && (
                <div className="url-controls">
                  <button className="device-button">
                    <Monitor size={18} />
                  </button>
                  <div className="preview-url">/</div>
                  <button className="url-icon">
                    <ExternalLink size={18} />
                  </button>
                  <button className="url-icon">
                    <RefreshCw size={18} />
                  </button>
                </div>
              )}

              <div className="right-actions">
                <button className="tool-button chat-toggle">
                  <MessageSquare size={18} />
                </button>
                <button className="avatar-stack">
                  <span></span><span></span>
                </button>
                <button className="share-button">Share</button>
                <button className="upgrade-button">
                  <Bolt size={18} fill="currentColor" />
                  <span>Upgrade</span>
                </button>
                <button className="publish-button">Publish</button>
              </div>
            </div>
          </section>

          <section className="workspace">
            <aside className="chat-panel">
              <div className="chat-scroll">
                
                {messages.map((msg, i) => (
                  <React.Fragment key={i}>
                    {msg.role === 'user' ? (
                      <article className="prompt-bubble">{msg.content}</article>
                    ) : (
                      <>
                        <p className="thought-label">Thought for {msg.time || '11s'}</p>
                        <div style={{ background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '500', color: '#e5e5e5', marginBottom: '16px', cursor: 'pointer' }}>
                          <span>Used {msg.tools || '4'} tools</span>
                          <ChevronRightIcon />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                          <div style={{ flex: 1, background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ color: '#f59e0b' }}><FileText size={16} /></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '12px', color: '#e5e5e5', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>AutoDev Systems P...</span>
                              <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: '600' }}>PPTX</span>
                            </div>
                          </div>
                          <div style={{ flex: 1, background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ color: '#3b82f6' }}><FileText size={16} /></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '12px', color: '#e5e5e5', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>AutoDev Systems P...</span>
                              <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: '600' }}>MARKDOWN</span>
                            </div>
                          </div>
                        </div>
                        <p className="assistant-copy" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n\n/g, '<br/><br/>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }}></p>
                        <div className="reaction-row">
                          <button className="reaction-button"><Undo2 size={17} /></button>
                          <button className="reaction-button"><ThumbsUp size={17} /></button>
                          <button className="reaction-button"><ThumbsDown size={17} /></button>
                          <button className="reaction-button"><Copy size={17} /></button>
                          <button className="reaction-button"><MoreHorizontal size={17} /></button>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="suggestion-row">
                <button>Add bulk actions</button>
                <button>Add due dates</button>
                <button>Add keyboard navigation</button>
                <button>Add editing accessibility</button>
              </div>

              <form className="composer" onSubmit={(e) => { e.preventDefault(); if(chatInput) { setMessages([...messages, { role: 'user', content: chatInput }]); setChatInput(''); }}}>
                <div className="credits-line">
                  <strong>0 free credits remaining today</strong>
                  <span></span>
                  <button className="upgrade-now">
                    <Bolt size={18} fill="currentColor" />
                    <span>Upgrade Now</span>
                  </button>
                  <button className="close-credits" type="button"></button>
                </div>
                <label className="chat-input-wrap has-value">
                  {chatInput.length === 0 && <span className="input-placeholder">Ask Lovable...</span>}
                  <textarea id="chatInput" rows={1} value={chatInput} onChange={e => setChatInput(e.target.value)}></textarea>
                </label>
                <div className="composer-actions">
                  <div className="composer-left">
                    <button className="round-control" type="button"><Plus size={20} /></button>
                    <button className="visual-edits" type="button"><Bot size={18} /><span>Visual edits</span></button>
                  </div>
                  <div className="composer-right">
                    <button className="build-select" type="button">Build</button>
                    <button className="send-control" type="submit"><ArrowUpIcon /></button>
                  </div>
                </div>
              </form>
            </aside>

            <section className="preview-stage" style={{ position: 'relative' }}>
              {showAnalytics && <Analytics onClose={() => setShowAnalytics(false)} />}
              
              {editorMode === 'preview' && (
              <div className="preview-canvas">
                
                {/* Embedded Todo App */}
                <div className="todo-preview">
                  <p className="todo-date">Monday, May 11</p>
                  <h1>Today.</h1>

                  <form className="todo-entry" onSubmit={addTodo}>
                    <input type="text" id="todoInput" placeholder="What needs to happen?" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                    <button type="submit"><Plus size={25} /></button>
                  </form>

                  <div className="todo-list">
                    {filteredTodos.map(todo => (
                      <article key={todo.id} className={`todo-row ${todo.done ? 'complete' : ''} active-row`}>
                        <button className="check-button" type="button" onClick={() => toggleTodo(todo.id)}>
                          <Check size={18} />
                        </button>
                        <span>{todo.text}</span>
                        <div className="todo-actions">
                          <button type="button"><Pencil size={19} /></button>
                          <button type="button" onClick={() => deleteTodo(todo.id)}><Trash size={19} /></button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <footer className="todo-footer">
                    <span>{activeCount} left</span>
                    <div className="todo-filters">
                      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                      <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
                      <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Done</button>
                    </div>
                    <button className="clear-done" onClick={clearDone}>Clear done</button>
                  </footer>
                </div>

              </div>
              )}

              {editorMode === 'files' && (
                <div className="mode-files-container">
                  <div className="pm-sidebar">
                    <div className="pm-sidebar-header">
                      <span>Files</span>
                    </div>
                    <div className="pm-search">
                      <input type="text" placeholder="Search files" />
                    </div>
                    <div className="pm-section-title">RECENT</div>
                    <div className="pm-file-list">
                      <div className="pm-file-item">
                        <div className="pm-file-item-left"><FileText size={14}/> <span className="pm-file-item-name">AutoDev_Systems_Pitch_Script_v2.md</span></div>
                        <span style={{fontSize: '10px'}}>2 hours ago</span>
                      </div>
                      <div className="pm-file-item active">
                        <div className="pm-file-item-left"><FileText size={14}/> <span className="pm-file-item-name">AutoDev_Systems_Pitch_v2.pptx</span></div>
                        <span style={{fontSize: '10px'}}>2 hours ago</span>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left"><FileText size={14}/> <span className="pm-file-item-name">AutoDev_Systems_Pitch_Script.md</span></div>
                        <span style={{fontSize: '10px'}}>3 hours ago</span>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left"><FileText size={14}/> <span className="pm-file-item-name">AutoDev_Systems_Pitch.pptx</span></div>
                        <span style={{fontSize: '10px'}}>3 hours ago</span>
                      </div>
                      <div className="pm-file-item mt-4">
                        <div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">Documents</span></div>
                        <span style={{fontSize: '10px'}}>4</span>
                      </div>
                    </div>
                  </div>
                  <div className="pm-main">
                    <div className="pm-main-header">
                      <div className="pm-tabs">
                        <div className="pm-tab">
                          AutoDev_Systems_Pitch_v2.pptx
                          <span className="pm-tab-close">×</span>
                        </div>
                      </div>
                      <div className="pm-header-actions">
                        <button className="pm-header-btn">Download</button>
                      </div>
                    </div>
                    <div className="file-preview-area">
                      <div className="pptx-slide dark">
                        <h1 className="pptx-title-lg">AUTODEV SYSTEMS</h1>
                        <p className="pptx-subtitle">Build a full web app — just by describing it.</p>
                      </div>
                      <div className="pptx-slide">
                        <h2 className="pptx-title">The Problem</h2>
                        <p className="pptx-text">Building software is too slow, too expensive, too technical.</p>
                        <div className="pptx-grid">
                          <div className="pptx-card">
                            <h3>4M</h3>
                            <p>Global shortage of developers</p>
                          </div>
                          <div className="pptx-card">
                            <h3>$50K+</h3>
                            <p>Cost of a single custom web app</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editorMode === 'code' && (
                <div className="mode-code-container">
                  <div className="pm-sidebar">
                    <div className="pm-search">
                      <input type="text" placeholder="Search code" />
                    </div>
                    <div className="pm-file-list" style={{padding: '0 8px'}}>
                      <div className="pm-file-item"><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">.lovable</span></div></div>
                      <div className="pm-file-item"><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">public</span></div></div>
                      <div className="pm-file-item"><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>⌄</span> <span className="pm-file-item-name">src</span></div></div>
                      
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">assets</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">components</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">hooks</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">integrations/supabase</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>›</span> <span className="pm-file-item-name">lib</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><span style={{width:'14px',display:'inline-block'}}>⌄</span> <span className="pm-file-item-name">pages</span></div></div>
                      <div className="pm-file-item active" style={{paddingLeft: '38px'}}><div className="pm-file-item-left"><Code size={14} color="#38bdf8"/> <span className="pm-file-item-name">Index.tsx</span></div></div>
                      
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><FileText size={14} color="#94a3b8"/> <span className="pm-file-item-name">App.css</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><Code size={14} color="#38bdf8"/> <span className="pm-file-item-name">App.tsx</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><FileText size={14} color="#94a3b8"/> <span className="pm-file-item-name">index.css</span></div></div>
                      <div className="pm-file-item" style={{paddingLeft: '24px'}}><div className="pm-file-item-left"><Code size={14} color="#38bdf8"/> <span className="pm-file-item-name">main.tsx</span></div></div>
                    </div>
                  </div>
                  <div className="pm-main">
                    <div className="pm-main-header">
                      <div className="pm-tabs">
                        <div className="pm-tab">
                          src/pages/Index.tsx
                          <span className="pm-tab-close">×</span>
                        </div>
                        <div className="pm-tab preview">.lovable/install.md <span className="pm-tab-close">×</span></div>
                        <div className="pm-tab preview">.lovable/plan.md</div>
                        <div className="pm-tab preview">.lovable/system.md</div>
                      </div>
                      <div className="pm-header-actions">
                        <span style={{color: '#a1a1aa', fontSize: '12px'}}>Read only</span>
                        <button className="upgrade-now" style={{padding: '4px 8px'}}>Upgrade</button>
                        <button className="pm-header-btn">Close</button>
                      </div>
                    </div>
                    <div className="code-editor-area">
                      <div className="code-line"><span className="code-line-num">1</span><span className="code-line-content"><span style={{color:'#c678dd'}}>import</span> React, {'{'} useState, useEffect {'}'} <span style={{color:'#c678dd'}}>from</span> <span style={{color:'#98c379'}}>'react'</span>;</span></div>
                      <div className="code-line"><span className="code-line-num">2</span><span className="code-line-content"><span style={{color:'#c678dd'}}>import</span> {'{'} ChevronsLeft, ChevronsRight {'}'} <span style={{color:'#c678dd'}}>from</span> <span style={{color:'#98c379'}}>'lucide-react'</span>;</span></div>
                      <div className="code-line"><span className="code-line-num">3</span><span className="code-line-content"><span style={{color:'#c678dd'}}>import</span> {'{'} Sidebar {'}'} <span style={{color:'#c678dd'}}>from</span> <span style={{color:'#98c379'}}>'@/components/layout/Sidebar'</span>;</span></div>
                      <div className="code-line"><span className="code-line-num">4</span><span className="code-line-content"><span style={{color:'#c678dd'}}>import</span> {'{'} Toolbar {'}'} <span style={{color:'#c678dd'}}>from</span> <span style={{color:'#98c379'}}>'@/components/layout/Toolbar'</span>;</span></div>
                      <div className="code-line"><span className="code-line-num">5</span><span className="code-line-content"></span></div>
                      <div className="code-line"><span className="code-line-num">6</span><span className="code-line-content"><span style={{color:'#e5c07b'}}>export default</span> <span style={{color:'#c678dd'}}>function</span> <span style={{color:'#61afef'}}>Index</span>() {'{'}</span></div>
                      <div className="code-line"><span className="code-line-num">7</span><span className="code-line-content">  <span style={{color:'#c678dd'}}>const</span> [activeSlideIndex, setActiveSlideIndex] = <span style={{color:'#56b6c2'}}>useState</span>(0);</span></div>
                      <div className="code-line"><span className="code-line-num">8</span><span className="code-line-content">  <span style={{color:'#c678dd'}}>const</span> [showGrid, setShowGrid] = <span style={{color:'#56b6c2'}}>useState</span>(<span style={{color:'#d19a66'}}>false</span>);</span></div>
                      <div className="code-line"><span className="code-line-num">9</span><span className="code-line-content"></span></div>
                      <div className="code-line"><span className="code-line-num">10</span><span className="code-line-content">  <span style={{color:'#7f848e', fontStyle: 'italic'}}>// Toggle dark mode</span></span></div>
                      <div className="code-line"><span className="code-line-num">11</span><span className="code-line-content">  <span style={{color:'#56b6c2'}}>useEffect</span>(() =&gt; {'{'}</span></div>
                      <div className="code-line"><span className="code-line-num">12</span><span className="code-line-content">    document.documentElement.classList.toggle(<span style={{color:'#98c379'}}>'dark'</span>, isDarkMode);</span></div>
                      <div className="code-line"><span className="code-line-num">13</span><span className="code-line-content">  {'}'}, [isDarkMode]);</span></div>
                      <div className="code-line"><span className="code-line-num">14</span><span className="code-line-content"></span></div>
                      <div className="code-line"><span className="code-line-num">15</span><span className="code-line-content">  <span style={{color:'#c678dd'}}>return</span> (</span></div>
                      <div className="code-line"><span className="code-line-num">16</span><span className="code-line-content">    &lt;<span style={{color:'#e06c75'}}>div</span> <span style={{color:'#d19a66'}}>className</span>=<span style={{color:'#98c379'}}>"flex h-screen w-full"</span>&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">17</span><span className="code-line-content">      &lt;<span style={{color:'#e06c75'}}>Sidebar</span> /&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">18</span><span className="code-line-content">      &lt;<span style={{color:'#e06c75'}}>div</span> <span style={{color:'#d19a66'}}>className</span>=<span style={{color:'#98c379'}}>"flex-1 flex flex-col"</span>&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">19</span><span className="code-line-content">        &lt;<span style={{color:'#e06c75'}}>Toolbar</span> /&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">20</span><span className="code-line-content">      &lt;/<span style={{color:'#e06c75'}}>div</span>&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">21</span><span className="code-line-content">    &lt;/<span style={{color:'#e06c75'}}>div</span>&gt;</span></div>
                      <div className="code-line"><span className="code-line-num">22</span><span className="code-line-content">  );</span></div>
                      <div className="code-line"><span className="code-line-num">23</span><span className="code-line-content">{'}'}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

function StarIcon() { return <svg viewBox="0 0 24 24" width="19" height="19" strokeWidth="1.7"><path d="m12 2 2.9 6.1 6.7.9-4.8 4.7 1.2 6.6-6-3.2-6 3.2 1.2-6.6L2.4 9l6.7-.9L12 2Z" /></svg>; }
function ArrowUpIcon() { return <svg viewBox="0 0 24 24" width="20" height="20" strokeWidth="2"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></svg>; }
function ChevronRightIcon() { return <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>; }
