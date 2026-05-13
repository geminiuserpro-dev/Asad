import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Landing from './components/Landing';
import FullLogin from './components/FullLogin';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Modals from './components/Modals';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'editor'>('landing');
  const [modal, setModal] = useState<'none' | 'login' | 'signup'>('none');

  useEffect(() => {
    if (!loading) {
      if (user && (view === 'landing' || view === 'signup' || view === 'login')) {
        setView('dashboard');
      } else if (!user && (view === 'dashboard' || view === 'editor')) {
        setView('landing');
      }
    }
  }, [user, loading, view]);

  if (loading) return null;

  const pageVariants = {
    initial: { opacity: 0, y: 15, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  };

  const pageTransition = {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} style={{ minHeight: '100vh', width: '100%' }}>
            <Landing setView={setView} setModal={setModal} />
          </motion.div>
        )}
        {view === 'signup' && (
          <motion.div key="signup" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} style={{ minHeight: '100vh', width: '100%', position: 'absolute', inset: 0 }}>
            <FullLogin setView={setView} mode="signup" setModal={setModal} />
          </motion.div>
        )}
        {view === 'dashboard' && (
          <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} style={{ minHeight: '100vh', width: '100%', position: 'absolute', inset: 0 }}>
            <Dashboard setView={setView} />
          </motion.div>
        )}
        {view === 'editor' && (
          <motion.div key="editor" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} style={{ minHeight: '100vh', width: '100%', position: 'absolute', inset: 0 }}>
            <Editor setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>
      {(modal === 'login' || modal === 'signup') && (
        <Modals activeModal={modal} setModal={setModal} setView={setView} />
      )}
    </div>
  );
}
