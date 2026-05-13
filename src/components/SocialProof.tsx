export function SocialProof() {
  return (
    <section className="social-proof">
      <p className="social-proof-text">Teams from top companies build with Lovable</p>
      <div className="logo-carousel">
        <div className="logo-track">
          <div className="company-logo" aria-label="Uber">
            <svg viewBox="0 0 120 40" width="100" height="34"><text x="10" y="30" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="28" fill="#1a1a1a">Uber</text></svg>
          </div>
          <div className="company-logo" aria-label="Microsoft">
            <svg viewBox="0 0 160 40" width="140" height="34">
              <rect x="8" y="8" width="11" height="11" fill="#F25022" />
              <rect x="21" y="8" width="11" height="11" fill="#7FBA00" />
              <rect x="8" y="21" width="11" height="11" fill="#00A4EF" />
              <rect x="21" y="21" width="11" height="11" fill="#FFB900" />
              <text x="40" y="28" fontFamily="DM Sans, sans-serif" fontWeight="600" fontSize="20" fill="#1a1a1a">Microsoft</text>
            </svg>
          </div>
          <div className="company-logo" aria-label="ElevenLabs">
            <svg viewBox="0 0 160 40" width="140" height="34"><text x="5" y="29" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="22" fill="#1a1a1a">IIElevenLabs</text></svg>
          </div>
          <div className="company-logo" aria-label="HubSpot">
            <svg viewBox="0 0 130 40" width="110" height="34"><text x="5" y="29" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="22" fill="#1a1a1a">HubSpot</text></svg>
          </div>
          <div className="company-logo" aria-label="HCA Healthcare">
            <svg viewBox="0 0 130 40" width="110" height="34">
              <text x="5" y="22" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="18" fill="#8a8a8a">HCA</text>
              <text x="50" y="22" fontFamily="DM Sans, sans-serif" fontWeight="300" fontSize="9" fill="#8a8a8a">✦</text>
              <text x="5" y="35" fontFamily="DM Sans, sans-serif" fontWeight="400" fontSize="11" fill="#8a8a8a">Healthcare</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
