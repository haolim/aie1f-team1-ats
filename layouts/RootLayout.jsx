// src/layouts/RootLayout.jsx
import Navbar from '../src/components/Navbar';
import styles from './RootLayout.module.css';
import { Layers } from 'lucide-react';

export default function RootLayout({ children, activePage, setActivePage, candidateCount }) {
  return (
    <div className={styles.rootContainer}>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        candidateCount={candidateCount}
      />
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} TalentPulse HR. All rights reserved.</p>
          <div className={styles.badge}>
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>RootLayout Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}