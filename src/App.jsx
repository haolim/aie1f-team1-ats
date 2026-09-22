// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import RootLayout from '../layouts/RootLayout';
import CandidateListPage from './pages/CandidateListPage';
import AddCandidatePage from './pages/AddCandidatePage';

const API_URL = 'https://6ab1e4975b9b60f39d34323a.mockapi.io/candidates';

export default function App() {
  const [activePage, setActivePage] = useState('list');
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchCandidates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCandidates(Array.isArray(data) ? data : []);
      setFetchError(null);
    } catch (e) {
      setFetchError(e.message || 'Unable to load candidates.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <RootLayout activePage={activePage} setActivePage={setActivePage} candidateCount={candidates.length}>
      {activePage === 'list' ? (
        <CandidateListPage
          candidates={candidates}
          isLoading={isLoading}
          fetchError={fetchError}
          onRefresh={fetchCandidates}
          onNavigateAdd={() => setActivePage('add')}
        />
      ) : (
        <AddCandidatePage
          onNavigateBack={() => setActivePage('list')}
          onCandidateAdded={(newC) => setCandidates((current) => [newC, ...current])}
          candidates={candidates}
        />
      )}
    </RootLayout>
  );
}