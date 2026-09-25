import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function ScheduleForm({
  candidate,
  isSaving,
  onSubmit,
  onCancel,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      setFormError("Pick both a date and a time.");
      return;
    }
    setFormError("");
    onSubmit(`${date}T${time}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>
        Schedule interview for {candidate.first_name} {candidate.last_name}
      </h2>
      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isSaving}
        />
      </div>
      <div className="form-field">
        <label htmlFor="time">Time</label>

        <input
          id="time"
          name="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={isSaving}
        />
      </div>
      {formError && (
        <p className="form-error">
          <ErrorMessage message={formError} />
        </p>
      )}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Scheduling..." : "Schedule"}
        </button>
        <button
          type="button"
          className="btn btn-plain"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
