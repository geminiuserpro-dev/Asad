import React from 'react';
import { X, ChevronDown, Circle } from 'lucide-react';

export default function Analytics({ onClose }: { onClose: () => void }) {
  const metrics = [
    { label: 'Visitors', value: '0' },
    { label: 'Pageviews', value: '0' },
    { label: 'Views Per Visit', value: '0' },
    { label: 'Visit Duration', value: '0s' },
    { label: 'Bounce Rate', value: '0%' },
  ];

  const emptyTables = ['Source', 'Page', 'Country', 'Device'];

  return (
    <div className="analytics-pane">
      <header className="analytics-header">
        <div className="ah-left"></div>
        <div className="ah-center">Analytics</div>
        <div className="ah-right">
          <button className="auth-close-btn" onClick={onClose}>Close</button>
        </div>
      </header>

      <div className="analytics-scroll">
        <div className="analytics-top-controls">
          <div className="live-visitors">
            <span className="live-dot"></span>
            0 current visitors
          </div>
          <button className="time-select">
            Last 7 days
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={i} className={`metric-card ${i === 0 ? 'active' : ''}`}>
              <div className="metric-label">{m.label}</div>
              <div className="metric-value">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <div className="chart-y-axis">
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>
          <div className="chart-area">
            <div className="chart-grid-lines">
              <div className="c-line"></div>
              <div className="c-line"></div>
              <div className="c-line"></div>
              <div className="c-line"></div>
              <div className="c-line"></div>
            </div>
            <div className="chart-plot">
              <div className="chart-path"></div>
              {/* Tooltip near 10 May */}
              <div className="chart-tooltip">
                <div className="tooltip-date">10 May</div>
                <div className="tooltip-val">
                  <span className="tdot"></span> 0 Visitors
                </div>
              </div>
            </div>
            <div className="chart-x-axis">
              <span>6 May</span>
              <span>8 May</span>
              <span>10 May</span>
              <span>12 May</span>
            </div>
          </div>
        </div>

        <div className="tables-grid">
          {emptyTables.map((t, i) => (
            <div key={i} className="a-table-card">
              <div className="a-table-head">
                <span className="th-left">{t}</span>
                <span className="th-right">Visitors</span>
              </div>
              <div className="a-table-body">
                No data found for this time period.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
