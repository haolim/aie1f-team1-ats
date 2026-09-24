// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import CandidateListPage from './pages/CandidateListPage';
import AddCandidatePage from './pages/AddCandidatePage';
import CandidateDetailPage from './components/CandidateDetailPage';

const API_URL = 'https://6ab1e4975b9b60f39d34323a.mockapi.io/candidates';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const activePage = location.pathname === '/add' ? 'add' : 'list';

  const setActivePage = (page) => {
    navigate(page === 'add' ? '/add' : '/');
  };

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
      <Routes>
        <Route
          path="/"
          element={
            <CandidateListPage
              candidates={candidates}
              isLoading={isLoading}
              fetchError={fetchError}
              onRefresh={fetchCandidates}
              onNavigateAdd={() => navigate('/add')}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddCandidatePage
              onNavigateBack={() => navigate('/')}
              onCandidateAdded={(newC) => setCandidates((current) => [newC, ...current])}
              candidates={candidates}
            />
          }
        />
        <Route path="/candidates/:id" element={<CandidateDetailPage />} />
      </Routes>
    </RootLayout>
  );
}