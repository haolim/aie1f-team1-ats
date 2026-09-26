import { useReducer, useState, useEffect } from "react";
import { API_BASE } from "../config";
import candidatesReducer from "../reducers/candidatesReducer";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Board from "../components/Board";
import { Link } from "react-router";

export default function BoardPage() {
  const [candidates, sendActionObject] = useReducer(candidatesReducer, []);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCandidates = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetch(`${API_BASE}/candidates`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        sendActionObject({ type: "SET", candidates: data });
      } catch (err) {
        setLoadError(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    getCandidates();
  }, []);

  const handleStatusChange = async (id, status) => {
    setSaveError(null);
    try {
      const response = await fetch(`${API_BASE}/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTPError: ${response.status}`);
      }
      sendActionObject({ type: "UPDATE_STATUS", id: id, status: status });
    } catch (err) {
      setSaveError(`Error updating candidate status: ${err.message}`);
    }
  };

  if (isLoading) return <Spinner />;
  if (loadError) return <ErrorMessage message={loadError} />;

  return (
    <>
      <div className="page-header">
        <h1>Candidates</h1>
        <Link to="/candidates/new" className="btn btn-primary">
          + Add Candidate
        </Link>
      </div>
      {saveError && <ErrorMessage message={saveError} />}
      <Board candidates={candidates} onStatusChange={handleStatusChange} />
    </>
  );
}
