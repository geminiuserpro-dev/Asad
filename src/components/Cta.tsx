export function Cta({ setView }: any) {
  return (
    <section className="cta-section">
      <div className="cta-gradient-bg">
        <div className="gradient-orb orb-cta-1"></div>
        <div className="gradient-orb orb-cta-2"></div>
      </div>
      <div className="cta-content">
        <p className="cta-eyebrow">AI App Builder</p>
        <h2 className="cta-title">Ready to build?</h2>
        <div className="cta-input-container">
          <div className="chat-input-box">
            <textarea className="chat-textarea" placeholder="Ask Lovable to create a web app that..." rows={2}></textarea>
            <div className="chat-input-toolbar">
              <button className="toolbar-btn" aria-label="Attach file">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className="toolbar-right">
                <button className="toolbar-btn" aria-label="Voice input">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1.5C8.20435 1.5 7.44129 1.81607 6.87868 2.37868C6.31607 2.94129 6 3.70435 6 4.5V9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9V4.5C12 3.70435 11.6839 2.94129 11.1213 2.37868C10.5587 1.81607 9.79565 1.5 9 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.25 7.5V9C14.25 10.3924 13.6969 11.7277 12.7123 12.7123C11.7277 13.6969 10.3924 14.25 9 14.25C7.60761 14.25 6.27226 13.6969 5.28769 12.7123C4.30312 11.7277 3.75 10.3924 3.75 9V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 14.25V16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="submit-btn" aria-label="Submit" onClick={() => setView?.('signup')}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 14V4M9 4L5 8M9 4L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
