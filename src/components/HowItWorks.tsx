import { useState } from 'react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="how-it-works">
      <div className="how-container">
        <div className="how-visual">
          <h2 className="how-section-title">Meet Lovable</h2>
          <div className="how-visual-card">
            <div className="visual-gradient-circle"></div>
            <div className="visual-mockup">
              <div className="mockup-header">
                <div className="mockup-dots"><span></span><span></span><span></span></div>
                <div className="mockup-tab-bar">
                  <div className="mockup-tab active">Preview</div>
                  <div className="mockup-tab">Code</div>
                </div>
              </div>
              <div className="mockup-content">
                <div className="mockup-line w-80"></div>
                <div className="mockup-line w-60"></div>
                <div className="mockup-line w-70"></div>
                <div className="mockup-blocks">
                  <div className="mockup-block"></div>
                  <div className="mockup-block"></div>
                </div>
                <div className="mockup-line w-90"></div>
                <div className="mockup-line w-50"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="how-steps">
          <div className={`step ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
            <h3 className="step-title">Start with an idea</h3>
            <p className="step-desc">Describe the app or website you want to create or drop in screenshots and docs</p>
          </div>
          <div className={`step ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
            <h3 className="step-title">Watch it come to life</h3>
            <p className="step-desc">See your vision transform into a working prototype in real-time as AI builds it for you</p>
          </div>
          <div className={`step ${activeStep === 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>
            <h3 className="step-title">Refine and ship</h3>
            <p className="step-desc">Iterate on your creation with simple feedback and deploy it to the world with one click</p>
          </div>
        </div>
      </div>
    </section>
  );
}
