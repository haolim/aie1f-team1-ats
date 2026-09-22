// src/pages/AddCandidatePage.jsx
import AddCandidateForm from '../components/AddCandidateForm';
import styles from './AddCandidatePage.module.css';
import { ArrowLeft, Users, Sparkles } from 'lucide-react';

export default function AddCandidatePage({ onNavigateBack, onCandidateAdded, candidates }) {
  return (
    <div className={styles.pageWrapper}>
      <button onClick={onNavigateBack} className={styles.backButton}>
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Candidate Directory</span>
      </button>

      <div className={styles.headerSection}>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Add New Candidate</h1>
          <p className="text-slate-500 text-sm mt-0.5">Register a candidate into the recruitment database</p>
        </div>
        <Sparkles className="w-5 h-5 text-blue-500" />
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.leftColumn}>
          <AddCandidateForm onCandidateAdded={onCandidateAdded} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.summaryCard}>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Recently Added Candidates</span>
            </h3>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {candidates.slice(0, 5).map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-slate-900">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="text-[11px] text-slate-500">{c.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}