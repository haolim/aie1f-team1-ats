// src/components/Navbar.jsx
import styles from './Navbar.module.css';
import { Briefcase, Users, UserPlus } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, candidateCount }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('list')}>
          <div className={styles.logoBox}><Briefcase className="w-5 h-5" /></div>
          <span className="font-bold text-white text-lg">TalentPulse ATS</span>
        </div>
        <nav className="flex items-center space-x-2">
          <button onClick={() => setActivePage('list')} className={`${styles.navLink} ${activePage === 'list' ? styles.navLinkActive : ''}`}>
            <Users className="w-4 h-4" />
            <span>Candidates ({candidateCount})</span>
          </button>
          <button onClick={() => setActivePage('add')} className={`${styles.navLink} ${activePage === 'add' ? styles.navLinkActive : ''}`}>
            <UserPlus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </nav>
      </div>
    </header>
  );
}