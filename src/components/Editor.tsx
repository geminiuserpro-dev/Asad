import {
  FileText,
  Code,
  MoreHorizontal,
  Monitor,
  ExternalLink,
  RefreshCw,
  MessageSquare,
  Plus,
  Check,
  Pencil,
  Trash,
  Bolt,
  Undo2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Bot,
  LayoutTemplate,
  LineChart,
  ChevronDown,
  ChevronLeft,
  Gift,
  Settings,
  Link,
  Repeat,
  Globe2,
  Edit2,
  Star,
  Info,
  Palette,
  HelpCircle,
  Search,
  X,
  Hexagon,
  ArrowUp,
} from "lucide-react";
import { refractive } from "@hashintel/refractive";
import { motion } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import Analytics from "./Analytics";
import GlobalSidebar from "./GlobalSidebar";
import ShareMenu from "./ShareMenu";
import SeoReviewView from "./SeoReview";
import { useAuth } from "../contexts/AuthContext";
import "../styles/analytics.css";
import "../styles/project-menu.css";
import "../styles/preview-modes.css";

export default function Editor({ setView }: any) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<
    { id: number; text: string; done: boolean }[]
  >([
    { id: 1, text: "asdf", done: true },
    { id: 2, text: "noyhing", done: true },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [globalSidebarOpen, setGlobalSidebarOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<
    "preview" | "files" | "code" | "seo"
  >("seo");
  const projectMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target as Node)
      ) {
        setProjectMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [messages, setMessages] = useState([
    { role: "user", content: "Add Firecrawl edge API", isCustom: true },
    {
      role: "ai",
      content:
        "Created 4 Firecrawl edge functions ( `firecrawl-scrape` , `firecrawl-search` , `firecrawl-map` , `firecrawl-crawl` ) and a frontend API client at `src/lib/api/firecrawl.ts` — all wired to your connected Firecrawl API key.",
      time: "Mar 8 at 5:01 PM",
    },
    {
      role: "user",
      content: "as sfuncitn cal",
      author:
        user?.displayName?.split(" ")[0] ||
        user?.email?.split("@")[0] ||
        "ASAD ALI",
    },
    {
      role: "user",
      content:
        "Integrate Firecrawl scrape into the editor's chat so the AI can fetch website content when users share URLs",
      author:
        user?.displayName?.split(" ")[0] ||
        user?.email?.split("@")[0] ||
        "ASAD ALI",
      time: "Mar 8 at 5:01 PM",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), done: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearDone = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  const activeCount = todos.filter((t) => !t.done).length;

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div id="editor-view" className="active">
      <div className="browser-window">
        <main className="lovable-shell">
          <section className="lovable-topbar">
            {globalSidebarOpen && (
              <GlobalSidebar
                isOpen={globalSidebarOpen}
                onClose={() => setGlobalSidebarOpen(false)}
                setView={setView}
              />
            )}
            <div className="project-cell">
              <div
                className="editor-ws-trigger"
                onClick={() => setGlobalSidebarOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "4px 8px 4px 6px",
                  borderRadius: "6px",
                  background: "transparent",
                  marginRight: "8px",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#27272a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Avatar"
                    style={{ width: 20, height: 20, borderRadius: "4px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "4px",
                      background: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.email?.[0].toUpperCase() || "A"}
                  </div>
                )}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {user?.displayName?.split(" ")[0] ||
                    user?.email?.split("@")[0] ||
                    "ASAD"}
                  's Lovable
                </span>
                <ChevronDown size={14} color="#a1a1aa" />
              </div>
              <div
                ref={projectMenuRef}
                className="project-copy"
                style={{ position: "relative" }}
              >
                <button
                  className="project-name-btn"
                  onClick={() => setProjectMenuOpen(!projectMenuOpen)}
                >
                  Remix of Sweet Clone
                  <ChevronDown size={14} />
                </button>
                <span
                  style={{
                    color: "#a1a1aa",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  Previewing last saved version
                </span>

                {projectMenuOpen && (
                  <div className="editor-project-menu">
                    <div className="epm-section">
                      <button
                        className="epm-item"
                        onClick={() => setView("dashboard")}
                      >
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <ChevronLeft size={14} />
                          </span>
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
                          <span>2.4 left</span>
                        </div>
                        <div className="epm-credits-bar-bg">
                          <div
                            className="epm-credits-bar-fill"
                            style={{ width: "48%" }}
                          ></div>
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
                          <span className="epm-icon">
                            <Gift size={14} />
                          </span>
                          Get free credits
                        </div>
                      </button>
                    </div>

                    <div className="epm-section">
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Settings size={14} />
                          </span>
                          Settings
                        </div>
                        <div className="epm-item-right">Ctrl .</div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Link size={14} />
                          </span>
                          Connectors
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Repeat size={14} />
                          </span>
                          Remix this project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Globe2 size={14} />
                          </span>
                          Publish to profile
                        </div>
                        <span className="epm-badge-new">New</span>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Edit2 size={14} />
                          </span>
                          Rename project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Star size={14} />
                          </span>
                          Star project
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Info size={14} />
                          </span>
                          Details
                        </div>
                      </button>
                    </div>

                    <div className="epm-section">
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <Palette size={14} />
                          </span>
                          Appearance
                        </div>
                        <div className="epm-item-right">
                          <ChevronDown
                            size={14}
                            style={{ transform: "rotate(-90deg)" }}
                          />
                        </div>
                      </button>
                      <button className="epm-item">
                        <div className="epm-item-left">
                          <span className="epm-icon">
                            <HelpCircle size={14} />
                          </span>
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

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 100 }}
            >
              <refractive.div
                refraction={{ radius: 24, blur: 16, glassThickness: 1 }}
                className="preview-toolbar-pill"
              >
                <div className="mode-toggle-pill">
                  <button
                    className={`mode-toggle-btn ${editorMode === "preview" ? "active" : ""}`}
                    onClick={() => {
                      setEditorMode("preview");
                      setShowAnalytics(false);
                    }}
                  >
                    <Monitor size={16} />
                    {editorMode === "preview" && <span>Preview</span>}
                  </button>
                  <button
                    className={`mode-toggle-btn ${editorMode === "files" ? "active" : ""}`}
                    onClick={() => {
                      setEditorMode("files");
                      setShowAnalytics(false);
                    }}
                  >
                    <FileText size={16} />
                    {editorMode === "files" && <span>Files</span>}
                  </button>
                  <button
                    className={`mode-toggle-btn ${editorMode === "code" ? "active" : ""}`}
                    onClick={() => {
                      setEditorMode("code");
                      setShowAnalytics(false);
                    }}
                  >
                    <Code size={16} />
                    {editorMode === "code" && <span>Code</span>}
                  </button>
                  <button
                    className={`mode-toggle-btn ${editorMode === "seo" ? "active" : ""}`}
                    onClick={() => {
                      setEditorMode("seo");
                      setShowAnalytics(false);
                    }}
                  >
                    <Search size={16} />
                    {editorMode === "seo" && <span>SEO</span>}
                  </button>
                  <button className="mode-toggle-btn icon-only">
                    <MoreHorizontal size={16} />
                  </button>
                  <div className="mode-toggle-divider"></div>
                  <button
                    className={`mode-toggle-btn ${showAnalytics ? "active-soft" : ""}`}
                    onClick={() => setShowAnalytics(!showAnalytics)}
                  >
                    <LineChart size={16} />
                    {showAnalytics && <span>Analytics</span>}
                  </button>
                </div>

                {editorMode === "preview" ? (
                  <div className="url-controls">
                    <button className="device-button">
                      <Monitor size={16} />
                    </button>
                    <div className="preview-url">/</div>
                    <button className="url-icon">
                      <ExternalLink size={16} />
                    </button>
                    <button className="url-icon">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="url-controls-spacer"></div>
                )}

                <div className="right-actions">
                  <button className="mode-toggle-btn icon-only">
                    <MessageSquare size={16} />
                  </button>
                  <div className="share-menu-wrap">
                    <button
                      className="mode-toggle-btn share-trigger-btn"
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    >
                      <div className="share-avatars">
                        <div className="share-avatar share-avatar-green">M</div>
                        <div className="share-avatar share-avatar-white">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="black"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </div>
                      </div>
                      Share
                    </button>
                    <ShareMenu
                      isOpen={shareMenuOpen}
                      onClose={() => setShareMenuOpen(false)}
                      user={user}
                    />
                  </div>
                  <button
                    className="mode-toggle-btn primary-publish"
                    onClick={() => setView("dashboard")}
                  >
                    Publish
                  </button>
                </div>
              </refractive.div>
            </motion.div>
          </section>

          <section className="workspace">
            <aside className="chat-panel">
              <div className="chat-scroll">
                {messages.map((msg, i) => (
                  <React.Fragment key={i}>
                    {msg.role === "user" ? (
                      <div className="chat-msg-user">
                        {msg.isCustom ? (
                          <div className="chat-custom-module">
                            <div className="chat-custom-text">
                              {msg.content}
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button className="chat-custom-check">
                                <Check size={12} color="#10b981" /> Create
                                Firecrawl edge functions & API client
                              </button>
                            </div>
                            <div className="chat-custom-buttons">
                              <button className="chat-custom-btn">
                                Details
                              </button>
                              <button className="chat-custom-btn">
                                Preview
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {msg.author && (
                              <div className="chat-user-author">
                                <div className="chat-user-avatar">
                                  {msg.author[0].toUpperCase()}
                                </div>
                                <span className="chat-user-name">
                                  {msg.author}
                                </span>
                              </div>
                            )}
                            <article className="prompt-bubble user-bubble">
                              {msg.content}
                            </article>
                          </>
                        )}
                        {msg.time && (
                          <div className="chat-msg-time">{msg.time}</div>
                        )}
                      </div>
                    ) : (
                      <div className="chat-msg-ai">
                        <p
                          className="assistant-copy"
                          dangerouslySetInnerHTML={{
                            __html: msg.content
                              .replace(/`([^`]+)`/g, "<code>$1</code>")
                              .replace(/\n\n/g, "<br/><br/>")
                              .replace(
                                /\*\*([^*]+)\*\*/g,
                                "<strong>$1</strong>",
                              )
                              .replace(/\*([^*]+)\*/g, "<em>$1</em>"),
                          }}
                        ></p>
                        <div className="reaction-row">
                          <button className="reaction-button">
                            <Undo2 size={14} />
                          </button>
                          <button className="reaction-button">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="reaction-button">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="reaction-button">
                            <Copy size={14} />
                          </button>
                          <button className="reaction-button">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                        {msg.time && (
                          <div className="chat-msg-time">{msg.time}</div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="chat-suggestion-group">
                <button className="chat-suggestion-btn">
                  Verify URL bar works
                </button>
                <div className="chat-seo-module">
                  <button className="chat-seo-close">
                    <X size={14} />
                  </button>
                  <div className="chat-seo-header">
                    <Search size={14} color="#a1a1aa" />
                    <span className="chat-seo-title">Review your SEO</span>
                    <button
                      className="chat-seo-btn"
                      onClick={() => {
                        setEditorMode("seo");
                        setShowAnalytics(false);
                      }}
                    >
                      Review SEO
                    </button>
                  </div>
                  <p className="chat-seo-desc">
                    See ways to improve how your site gets found in search.
                  </p>
                </div>
              </div>

              <form
                className="composer"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatInput) {
                    setMessages([
                      ...messages,
                      { role: "user", content: chatInput },
                    ]);
                    setChatInput("");
                  }
                }}
              >
                <div className="credits-line">
                  <strong>0 free credits remaining today</strong>
                  <span></span>
                  <button className="upgrade-now">
                    <Hexagon size={16} fill="currentColor" />
                    <span>Upgrade Now</span>
                  </button>
                  <button className="close-credits" type="button">
                    <X size={16} />
                  </button>
                </div>
                <label className="chat-input-wrap has-value">
                  {chatInput.length === 0 && (
                    <span className="input-placeholder">Ask Lovable...</span>
                  )}
                  <textarea
                    id="chatInput"
                    rows={1}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  ></textarea>
                </label>
                <div className="composer-actions">
                  <div className="composer-left">
                    <button className="round-control" type="button">
                      <Plus size={20} />
                    </button>
                    <button className="visual-edits" type="button">
                      <Bot size={18} />
                      <span>Visual edits</span>
                    </button>
                  </div>
                  <div className="composer-right">
                    <button className="build-select" type="button">
                      Build
                    </button>
                    <button className="send-control" type="submit">
                      <ArrowUp size={18} />
                    </button>
                  </div>
                </div>
              </form>
            </aside>

            <section className="preview-stage" style={{ position: "relative" }}>
              {showAnalytics && (
                <Analytics onClose={() => setShowAnalytics(false)} />
              )}

              {editorMode === "preview" && (
                <div className="preview-canvas">
                  {/* Embedded Todo App */}
                  <div className="todo-preview">
                    <p className="todo-date">Monday, May 11</p>
                    <h1>Today.</h1>

                    <form className="todo-entry" onSubmit={addTodo}>
                      <input
                        type="text"
                        id="todoInput"
                        placeholder="What needs to happen?"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                      />
                      <button type="submit">
                        <Plus size={25} />
                      </button>
                    </form>

                    <div className="todo-list">
                      {filteredTodos.map((todo) => (
                        <article
                          key={todo.id}
                          className={`todo-row ${todo.done ? "complete" : ""} active-row`}
                        >
                          <button
                            className="check-button"
                            type="button"
                            onClick={() => toggleTodo(todo.id)}
                          >
                            <Check size={18} />
                          </button>
                          <span>{todo.text}</span>
                          <div className="todo-actions">
                            <button type="button">
                              <Pencil size={19} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <Trash size={19} />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>

                    <footer className="todo-footer">
                      <span>{activeCount} left</span>
                      <div className="todo-filters">
                        <button
                          className={filter === "all" ? "active" : ""}
                          onClick={() => setFilter("all")}
                        >
                          All
                        </button>
                        <button
                          className={filter === "active" ? "active" : ""}
                          onClick={() => setFilter("active")}
                        >
                          Active
                        </button>
                        <button
                          className={filter === "done" ? "active" : ""}
                          onClick={() => setFilter("done")}
                        >
                          Done
                        </button>
                      </div>
                      <button className="clear-done" onClick={clearDone}>
                        Clear done
                      </button>
                    </footer>
                  </div>
                </div>
              )}

              {editorMode === "files" && (
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
                        <div className="pm-file-item-left">
                          <FileText size={14} />{" "}
                          <span className="pm-file-item-name">
                            AutoDev_Systems_Pitch_Script_v2.md
                          </span>
                        </div>
                        <span style={{ fontSize: "10px" }}>2 hours ago</span>
                      </div>
                      <div className="pm-file-item active">
                        <div className="pm-file-item-left">
                          <FileText size={14} />{" "}
                          <span className="pm-file-item-name">
                            AutoDev_Systems_Pitch_v2.pptx
                          </span>
                        </div>
                        <span style={{ fontSize: "10px" }}>2 hours ago</span>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left">
                          <FileText size={14} />{" "}
                          <span className="pm-file-item-name">
                            AutoDev_Systems_Pitch_Script.md
                          </span>
                        </div>
                        <span style={{ fontSize: "10px" }}>3 hours ago</span>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left">
                          <FileText size={14} />{" "}
                          <span className="pm-file-item-name">
                            AutoDev_Systems_Pitch.pptx
                          </span>
                        </div>
                        <span style={{ fontSize: "10px" }}>3 hours ago</span>
                      </div>
                      <div className="pm-file-item mt-4">
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">Documents</span>
                        </div>
                        <span style={{ fontSize: "10px" }}>4</span>
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
                        <p className="pptx-subtitle">
                          Build a full web app — just by describing it.
                        </p>
                      </div>
                      <div className="pptx-slide">
                        <h2 className="pptx-title">The Problem</h2>
                        <p className="pptx-text">
                          Building software is too slow, too expensive, too
                          technical.
                        </p>
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

              {editorMode === "code" && (
                <div className="mode-code-container">
                  <div className="pm-sidebar">
                    <div className="pm-search">
                      <input type="text" placeholder="Search code" />
                    </div>
                    <div className="pm-file-list" style={{ padding: "0 8px" }}>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">.lovable</span>
                        </div>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">public</span>
                        </div>
                      </div>
                      <div className="pm-file-item">
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ⌄
                          </span>{" "}
                          <span className="pm-file-item-name">src</span>
                        </div>
                      </div>

                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">assets</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">components</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">hooks</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">
                            integrations/supabase
                          </span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ›
                          </span>{" "}
                          <span className="pm-file-item-name">lib</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <span
                            style={{ width: "14px", display: "inline-block" }}
                          >
                            ⌄
                          </span>{" "}
                          <span className="pm-file-item-name">pages</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item active"
                        style={{ paddingLeft: "38px" }}
                      >
                        <div className="pm-file-item-left">
                          <Code size={14} color="#38bdf8" />{" "}
                          <span className="pm-file-item-name">Index.tsx</span>
                        </div>
                      </div>

                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <FileText size={14} color="#94a3b8" />{" "}
                          <span className="pm-file-item-name">App.css</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <Code size={14} color="#38bdf8" />{" "}
                          <span className="pm-file-item-name">App.tsx</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <FileText size={14} color="#94a3b8" />{" "}
                          <span className="pm-file-item-name">index.css</span>
                        </div>
                      </div>
                      <div
                        className="pm-file-item"
                        style={{ paddingLeft: "24px" }}
                      >
                        <div className="pm-file-item-left">
                          <Code size={14} color="#38bdf8" />{" "}
                          <span className="pm-file-item-name">main.tsx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pm-main">
                    <div className="pm-main-header">
                      <div className="pm-tabs">
                        <div className="pm-tab">
                          src/pages/Index.tsx
                          <span className="pm-tab-close">×</span>
                        </div>
                        <div className="pm-tab preview">
                          .lovable/install.md{" "}
                          <span className="pm-tab-close">×</span>
                        </div>
                        <div className="pm-tab preview">.lovable/plan.md</div>
                        <div className="pm-tab preview">.lovable/system.md</div>
                      </div>
                      <div className="pm-header-actions">
                        <span style={{ color: "#a1a1aa", fontSize: "12px" }}>
                          Read only
                        </span>
                        <button
                          className="upgrade-now"
                          style={{ padding: "4px 8px" }}
                        >
                          Upgrade
                        </button>
                        <button className="pm-header-btn">Close</button>
                      </div>
                    </div>
                    <div className="code-editor-area">
                      <div className="code-line">
                        <span className="code-line-num">1</span>
                        <span className="code-line-content">
                          <span style={{ color: "#c678dd" }}>import</span>{" "}
                          React, {"{"} useState, useEffect {"}"}{" "}
                          <span style={{ color: "#c678dd" }}>from</span>{" "}
                          <span style={{ color: "#98c379" }}>'react'</span>;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">2</span>
                        <span className="code-line-content">
                          <span style={{ color: "#c678dd" }}>import</span> {"{"}{" "}
                          ChevronsLeft, ChevronsRight {"}"}{" "}
                          <span style={{ color: "#c678dd" }}>from</span>{" "}
                          <span style={{ color: "#98c379" }}>
                            'lucide-react'
                          </span>
                          ;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">3</span>
                        <span className="code-line-content">
                          <span style={{ color: "#c678dd" }}>import</span> {"{"}{" "}
                          Sidebar {"}"}{" "}
                          <span style={{ color: "#c678dd" }}>from</span>{" "}
                          <span style={{ color: "#98c379" }}>
                            '@/components/layout/Sidebar'
                          </span>
                          ;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">4</span>
                        <span className="code-line-content">
                          <span style={{ color: "#c678dd" }}>import</span> {"{"}{" "}
                          Toolbar {"}"}{" "}
                          <span style={{ color: "#c678dd" }}>from</span>{" "}
                          <span style={{ color: "#98c379" }}>
                            '@/components/layout/Toolbar'
                          </span>
                          ;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">5</span>
                        <span className="code-line-content"></span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">6</span>
                        <span className="code-line-content">
                          <span style={{ color: "#e5c07b" }}>
                            export default
                          </span>{" "}
                          <span style={{ color: "#c678dd" }}>function</span>{" "}
                          <span style={{ color: "#61afef" }}>Index</span>(){" "}
                          {"{"}
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">7</span>
                        <span className="code-line-content">
                          {" "}
                          <span style={{ color: "#c678dd" }}>const</span>{" "}
                          [activeSlideIndex, setActiveSlideIndex] ={" "}
                          <span style={{ color: "#56b6c2" }}>useState</span>(0);
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">8</span>
                        <span className="code-line-content">
                          {" "}
                          <span style={{ color: "#c678dd" }}>const</span>{" "}
                          [showGrid, setShowGrid] ={" "}
                          <span style={{ color: "#56b6c2" }}>useState</span>(
                          <span style={{ color: "#d19a66" }}>false</span>);
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">9</span>
                        <span className="code-line-content"></span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">10</span>
                        <span className="code-line-content">
                          {" "}
                          <span
                            style={{ color: "#7f848e", fontStyle: "italic" }}
                          >
                            // Toggle dark mode
                          </span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">11</span>
                        <span className="code-line-content">
                          {" "}
                          <span style={{ color: "#56b6c2" }}>useEffect</span>(()
                          =&gt; {"{"}
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">12</span>
                        <span className="code-line-content">
                          {" "}
                          document.documentElement.classList.toggle(
                          <span style={{ color: "#98c379" }}>'dark'</span>,
                          isDarkMode);
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">13</span>
                        <span className="code-line-content">
                          {" "}
                          {"}"}, [isDarkMode]);
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">14</span>
                        <span className="code-line-content"></span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">15</span>
                        <span className="code-line-content">
                          {" "}
                          <span style={{ color: "#c678dd" }}>return</span> (
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">16</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;<span style={{ color: "#e06c75" }}>div</span>{" "}
                          <span style={{ color: "#d19a66" }}>className</span>=
                          <span style={{ color: "#98c379" }}>
                            "flex h-screen w-full"
                          </span>
                          &gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">17</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;<span style={{ color: "#e06c75" }}>
                            Sidebar
                          </span>{" "}
                          /&gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">18</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;<span style={{ color: "#e06c75" }}>div</span>{" "}
                          <span style={{ color: "#d19a66" }}>className</span>=
                          <span style={{ color: "#98c379" }}>
                            "flex-1 flex flex-col"
                          </span>
                          &gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">19</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;<span style={{ color: "#e06c75" }}>
                            Toolbar
                          </span>{" "}
                          /&gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">20</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;/<span style={{ color: "#e06c75" }}>div</span>&gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">21</span>
                        <span className="code-line-content">
                          {" "}
                          &lt;/<span style={{ color: "#e06c75" }}>div</span>&gt;
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">22</span>
                        <span className="code-line-content"> );</span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-num">23</span>
                        <span className="code-line-content">{"}"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editorMode === "seo" && (
                <SeoReviewView onClose={() => setEditorMode("preview")} />
              )}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" strokeWidth="1.7">
      <path d="m12 2 2.9 6.1 6.7.9-4.8 4.7 1.2 6.6-6-3.2-6 3.2 1.2-6.6L2.4 9l6.7-.9L12 2Z" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" strokeWidth="2">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
