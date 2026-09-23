import CandidateCard from "./CandidateCard";

const ACTIONS_BY_STATUS = {
  review: ["schedule", "reject"],
  scheduled: ["shortlist", "reject"],
  shortlisted: ["offer", "reject"],
  offered: ["reject"],
  rejected: ["delete"],
};

export default function Column({ title, candidates, status, onStatusChange }) {
  console.log(`Candidates list: ${candidates.status}`);
  const columnCandidate = candidates.filter((c) => c.status === status);
  return (
    <section className={`column column-${status}`}>
      <h3 className="column-title">{title}</h3>
      {columnCandidate.length === 0 ? (
        <p className="message message-empty">No candidates yet!</p>
      ) : (
        columnCandidate.map((c) => (
          <CandidateCard
            candidate={c}
            status={c.status}
            actions={ACTIONS_BY_STATUS[status]}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </section>
  );
}
