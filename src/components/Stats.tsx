import { useEffect, useRef, useState } from 'react';

export function Stats() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState({ projects: 0, daily: 0, visits: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          animateValue('projects', 36, 2000);
          animateValue('daily', 200, 2000);
          animateValue('visits', 300, 2000);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  function animateValue(key: keyof typeof stats, target: number, duration: number) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        setStats((prev) => ({ ...prev, [key]: Math.ceil(current) }));
        requestAnimationFrame(updateCounter);
      } else {
        setStats((prev) => ({ ...prev, [key]: target }));
      }
    };
    updateCounter();
  }

  return (
    <section ref={sectionRef} className="stats">
      <div className="stats-container">
        <h2 className="stats-title">Lovable in numbers</h2>
        <p className="stats-subtitle">Millions of builders are already turning ideas into reality</p>
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <span className="stat-number">{stats.projects}</span><span className="stat-suffix">M+</span>
            </div>
            <p className="stat-label">projects built on Lovable</p>
          </div>
          <div className="stat-card">
            <div>
              <span className="stat-number">{stats.daily}</span><span className="stat-suffix">K+</span>
            </div>
            <p className="stat-label">projects built per day on Lovable</p>
          </div>
          <div className="stat-card">
            <div>
              <span className="stat-number">{stats.visits}</span><span className="stat-suffix">M</span>
            </div>
            <p className="stat-label">visits per day to Lovable-built applications</p>
          </div>
        </div>
      </div>
    </section>
  );
}
