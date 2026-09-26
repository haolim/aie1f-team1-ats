import Column from "./Column";

const COLUMNS = [
  { title: "Pending Review", status: "review" },
  { title: "Interview", status: "scheduled" },
  { title: "Shortlisted", status: "shortlisted" },
  { title: "Offer", status: "offered" },
];

export default function Board({ candidates, onStatusChange }) {
  return (
    <div className="board">
      {COLUMNS.map((col) => (
        <Column
          // key={} is for React to match each card to the same
          // card on the next render and is required when using map
          key={col.status}
          title={col.title}
          candidates={candidates}
          status={col.status}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
