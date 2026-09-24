import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import CandidateDetail from "./CandidateDetail";

const API_BASE = "https://6ab1e4975b9b60f39d34323a.mockapi.io/candidates";

export default function CandidateDetailPage() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadCandidate() {
      setLoading(true);
      setErrorStatus(null);

      try {
        const res = await fetch(`${API_BASE}/${id}`);

        if (!res.ok) {
          // keep the HTTP status so the UI can pick the right message
          if (!ignore) setErrorStatus(res.status);
          return;
        }

        const data = await res.json();
        if (!ignore) setCandidate(data);
      } catch {
        if (!ignore) setErrorStatus(0); // network / unknown failure
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadCandidate();
    return () => {
      ignore = true;
    };
  }, [id]);

  const header = (title) => (
    <div className="page-header">
      <h1>{title}</h1>
      <Link to="/" className="btn btn-plain">
        Back to Board
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="candidate-detail-page">
        {header("Candidate")}
        <Spinner />
      </div>
    );
  }

  if (errorStatus === 404) {
    return (
      <div className="candidate-detail-page">
        {header("Candidate")}
        <ErrorMessage message="Candidate not found" />
      </div>
    );
  }

  if (errorStatus !== null) {
    return (
      <div className="candidate-detail-page">
        {header("Candidate")}
        <ErrorMessage message="Something went wrong loading this candidate. Please try again." />
      </div>
    );
  }

  return (
    <div className="candidate-detail-page">
      {header(
        `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() ||
          "Candidate",
      )}
      <CandidateDetail
        candidate={candidate}
        apiBase={API_BASE}
        onNotesSaved={(updated) => setCandidate(updated)}
      />
    </div>
  );
}