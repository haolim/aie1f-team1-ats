export default function CandidateCard({
  candidate,
  actions = [], // a card can show more than one button so parent passes an array
  onStatusChange,
  onDelete,
  onClick,
}) {
  const cardClass = onClick ? "card" : "card card-static";

  function handleClick(e, fn) {
    e.stopPropagation(); //stop event from bubbling up and opening CandidateDetail
    // defensive check to verify fn is a function before executing to prevent
    // unhandled runtime errors
    if (typeof fn === "function") {
      fn(); //run whatever function is passed in
    }
  }
  return (
    // Parent passes an onClick function which gets attached to the card in the outer div.
    // On the Board, clicking the card opens the Candidate Detail page.
    // In the Rejected page, since no onClick function is passed down, clicking does nothing.
    // Since nothing is passed down for that property, JS gives it the value 'undefined' and React treats
    // it as not having any click handler.
    <div className={cardClass} onClick={onClick}>
      <p className="card-name">
        {candidate.first_name} {candidate.last_name}
      </p>
      <p className="card-email">{candidate.email}</p>
      <div className="card-actions">
        {/* Each card can show more than one button.
        The Parent passes an array which decides which button to show.
        e.g. ["shortlist", "reject"] or ["delete"]
        Check the actions passed in using array method '.includes' that returns true/false
        Pass the event 'e' and the function to execute to handleClick function.
        handleClick function will execute whatever function is passed.
        e.g. if it is 'onStatusChange(...)', handleClick will call the parent
        function */}
        {actions.includes("schedule") && (
          // Schedule button calls onClick because it opens the Candidate Detail page where the
          // schedule form lives.
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => handleClick(e, onClick)}
          >
            Schedule
          </button>
        )}
        {actions.includes("shortlist") && (
          <button
            type="button"
            className="btn btn-plain"
            onClick={(e) =>
              handleClick(e, () =>
                // check if onStatusChange not equals undefined or null
                // does nothing if it is so it is skipped instead of crashing
                onStatusChange?.(candidate.id, "shortlisted"),
              )
            }
          >
            Shortlist
          </button>
        )}
        {actions.includes("offer") && (
          <button
            type="button"
            className="btn btn-plain"
            onClick={(e) =>
              handleClick(e, () => onStatusChange?.(candidate.id, "offered"))
            }
          >
            Offer
          </button>
        )}
        {actions.includes("reject") && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) =>
              handleClick(e, () => onStatusChange?.(candidate.id, "rejected"))
            }
          >
            Reject
          </button>
        )}
        {actions.includes("delete") && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleClick(e, () => onDelete?.(candidate.id))}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
