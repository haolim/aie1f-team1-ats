import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

function formatInterviewDate(value) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Not scheduled" : date.toLocaleString();
}

export default function CandidateDetail({ candidate, apiBase, onNotesSaved }) {
  // controlled textarea, seeded with the saved notes
  const [notes, setNotes] = useState(candidate.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function handleSaveNotes(event) {
    event.preventDefault();
    setSaving(true);
    setSaveError("");

    try {
      const res = await fetch(`${apiBase}/candidates/${candidate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }), // only notes
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const updated = await res.json();
      onNotesSaved?.(updated);
    } catch {
      // typed notes are kept because we never reset local state
      setSaveError("Could not save notes. Your text is still here, try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="detail">
      <div className="detail-row">
        <span className="detail-label">Email</span>
        <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
      </div>

      <div className="detail-row">
        <span className="detail-label">Mobile</span>
        <span>{candidate.mobile || "—"}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Resume</span>
        {candidate.resume_link ? (
          <a href={candidate.resume_link} target="_blank" rel="noreferrer">
            View resume
          </a>
        ) : (
          <span>—</span>
        )}
      </div>

      <div className="detail-row">
        <span className="detail-label">Status</span>
        <span className="status-badge">{candidate.status || "review"}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Interview date</span>
        <span>{formatInterviewDate(candidate.interview_date)}</span>
      </div>

      <section className="detail-notes">
        <h2>Hiring Manager Notes</h2>

        <form className="form" onSubmit={handleSaveNotes}>
          <div className="form-field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              rows={6}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              disabled={saving}
            />
          </div>

          {saveError && <ErrorMessage message={saveError} />}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
