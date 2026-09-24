import { useEffect, useState } from "react";
import RejectedList from "../components/RejectedList.jsx";
import { API_BASE } from "../config.js";

export default function RejectedPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE}/candidates`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCandidates(data);
      } catch (err) {
        console.error(err);
        setError("Could not load candidates.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/candidates/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setCandidates((current) =>
        current.filter((candidate) => candidate.id !== id),
      );
    } catch (err) {
      console.error(err);
      setError("Could not delete candidate.");
    }
  };

  const rejectedCandidates = candidates.filter(
    (candidate) => candidate.status === "rejected",
  );

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  if (error) {
    return <p className="message message-error">{error}</p>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Rejected Candidates</h1>
      </div>

      {rejectedCandidates.length === 0 ? (
        <p className="message message-empty">No rejected candidates</p>
      ) : (
        <RejectedList
          candidates={rejectedCandidates}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
