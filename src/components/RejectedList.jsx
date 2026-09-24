import CandidateCard from "./CandidateCard.jsx";

export default function RejectedList({ candidates, onDelete }) {
  return (
    <div className="card-list">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          actions={["delete"]}
          onDelete={() => onDelete(candidate.id)}
        />
      ))}
    </div>
  );
}
