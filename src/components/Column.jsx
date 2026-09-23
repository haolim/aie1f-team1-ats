import { useNavigate } from "react-router";
import CandidateCard from "./CandidateCard";

const ACTIONS_BY_STATUS = {
  review: ["schedule", "reject"],
  scheduled: ["shortlist", "reject"],
  shortlisted: ["offer", "reject"],
  offered: ["reject"],
};

export default function Column({ title, candidates, status, onStatusChange }) {
  const navigate = useNavigate();
  const columnCandidates = candidates.filter((c) => c.status === status);
  return (
    <section className={`column column-${status}`}>
      <h3 className="column-title">{title}</h3>
      {columnCandidates.length === 0 ? (
        <p className="message message-empty">No candidates yet!</p>
      ) : (
        columnCandidates.map((c) => (
          <CandidateCard
            // prevent cards from being mixed up when
            // it moves to another column
            // key={} is for React to match each card to the same
            // card on the next render
            key={c.id}
            candidate={c}
            actions={ACTIONS_BY_STATUS[status]}
            onStatusChange={onStatusChange}
            onClick={() => navigate(`/candidates/${c.id}`)}
          />
        ))
      )}
    </section>
  );
}
