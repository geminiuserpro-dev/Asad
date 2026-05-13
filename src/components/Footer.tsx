export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <svg className="footer-logo-icon" viewBox="0 0 32 32" width="36" height="36" fill="none">
            <circle cx="12" cy="20" r="10" fill="#FF6B35" />
            <circle cx="20" cy="16" r="10" fill="#E63946" opacity="0.85" />
          </svg>
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <h5 className="footer-col-title">Company</h5>
            <ul className="footer-links">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press & media</a></li>
              <li><a href="#">Enterprise</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Trust center</a></li>
              <li><a href="#">Partnerships</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-col-title">Product</h5>
            <ul className="footer-links">
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Student discount</a></li>
              <li><a href="#">Founders</a></li>
              <li><a href="#">Product Managers</a></li>
              <li><a href="#">Designers</a></li>
              <li><a href="#">Marketers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-col-title">Resources</h5>
            <ul className="footer-links">
              <li><a href="#">Learn</a></li>
              <li><a href="#">Templates</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Connectors</a></li>
              <li><a href="#">Videos</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-col-title">Legal</h5>
            <ul className="footer-links">
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Cookie settings</a></li>
              <li><a href="#">Enterprise terms</a></li>
              <li><a href="#">General terms</a></li>
              <li><a href="#">Desktop app terms</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-col-title">Community</h5>
            <ul className="footer-links">
              <li><a href="#">Become a partner</a></li>
              <li><a href="#">Hire a Lovable expert</a></li>
              <li><a href="#">Affiliates</a></li>
              <li><a href="#">Code of conduct</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Reddit</a></li>
              <li><a href="#">X / Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
