// src/pages/CandidateListPage.jsx
import { useState } from 'react';
import styles from './CandidateListPage.module.css';
import { Search, UserPlus, RefreshCw, ExternalLink } from 'lucide-react';

export default function CandidateListPage({ candidates, isLoading, fetchError, onRefresh, onNavigateAdd }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = candidates.filter((candidate) => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return true;

    const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.toLowerCase();
    const email = (candidate.email || '').toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search candidates"
              aria-label="Search candidates"
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onRefresh} className={styles.secondaryButton}>
              <RefreshCw className={styles.buttonIcon} />
              <span>Refresh</span>
            </button>
            <button type="button" onClick={onNavigateAdd} className={styles.primaryButton}>
              <UserPlus className={styles.buttonIcon} />
              <span>Add Candidate</span>
            </button>
          </div>
        </div>

        {fetchError ? (
          <div className={styles.alertBox}>
            <p>{fetchError}</p>
            <button type="button" onClick={onRefresh} className={styles.inlineButton}>
              Retry
            </button>
          </div>
        ) : null}

        {isLoading ? (
          <div className={styles.loadingState}>Loading candidates...</div>
        ) : filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((candidate) => (
                <tr key={candidate.id ?? `${candidate.email}-${candidate.first_name}`}>
                  <td>{candidate.first_name} {candidate.last_name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.mobile || '—'}</td>
                  <td>
                    {candidate.resume_link ? (
                      <a href={candidate.resume_link} target="_blank" rel="noreferrer" className={styles.resumeLink}>
                        <ExternalLink className={styles.buttonIcon} />
                        View
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>No candidates match your search.</div>
        )}
      </div>
    </div>
  );
}