import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import CandidateDetail from "../components/CandidateDetail";
import { API_BASE } from "../config";
import ScheduleForm from "../components/ScheduleForm";
import "./CandidateDetailPage.css";

export default function CandidateDetailPage() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  // States related to the Schedule Form
  // Whether to show the form or not
  // Disable the buttons if it is scheduling
  // And display the error in the ErrorMessage component if
  // there is an error
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState(null);
  // States for the Rejection of Candidate from the Candidate
  // Detail Page
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectError, setRejectError] = useState(null);

  const navigate = useNavigate();

  async function handleReject() {
    setIsRejecting(true);
    setRejectError(null);
    try {
      const response = await fetch(`${API_BASE}/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }), // just update one field
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/"); // navigate back to the main page
    } catch (err) {
      setRejectError("Could not reject the candidate.");
      console.error(err);
    } finally {
      setIsRejecting(false);
    }
  }

  async function handleSchedule(interviewDate) {
    setIsScheduling(true);
    setScheduleError(null);
    try {
      const response = await fetch(`${API_BASE}/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // update the interview_date and candidate status.
          // ScheduleForm returns a concatenated string such as "2026-10-01T10:00"
          interview_date: interviewDate,
          status: "scheduled",
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const updated = await response.json();
      setCandidate(updated);
      setShowScheduleForm(false);
    } catch (err) {
      setScheduleError("Could not schedule the interview.");
      // console.error shows the line in red
      console.error(err);
    } finally {
      setIsScheduling(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadCandidate() {
      setLoading(true);
      setErrorStatus(null);

      try {
        const res = await fetch(`${API_BASE}/candidates/${id}`);

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

      <div className="candidate-detail-page-actions">
        {/* Check if candidate status is 'review'. If it is
      then show the Schedule Interview button. */}
        {candidate.status === "review" && !showScheduleForm && (
          <button
            className="btn btn-primary"
            // If the button is clicked, then show the schedule interview form.
            onClick={() => setShowScheduleForm(true)}
          >
            Schedule Interview
          </button>
        )}
        {/* Hide 'Reject' button for rejected candidates. Rejected candidates will be in the Rejected page*/}
        {candidate.status !== "rejected" && (
          <button
            className="btn btn-danger"
            onClick={handleReject}
            // disable the button to prevent being able to trigger two PUTs together that may overwrite each other
            disabled={isRejecting || isScheduling}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
        )}
      </div>
      {rejectError && <ErrorMessage message={rejectError} />}
      {scheduleError && <ErrorMessage message={scheduleError} />}
      {showScheduleForm && (
        <ScheduleForm
          candidate={candidate}
          isSaving={isScheduling}
          onSubmit={handleSchedule}
          // Hide the form and clear any old schedule error
          onCancel={() => {
            setShowScheduleForm(false);
            setScheduleError(null);
          }}
        />
      )}
    </div>
  );
}
