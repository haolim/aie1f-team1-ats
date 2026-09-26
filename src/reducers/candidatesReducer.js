// actionObject hands us an object telling us what happened
export default function candidatesReducer(currentState, actionObject) {
  // receive type to match the case to execute
  switch (actionObject.type) {
    // after the GET call succeeds, SET replaces the array with the
    // data retrieved
    case "SET":
      return actionObject.candidates;
    case "UPDATE_STATUS":
      return currentState.map((c) =>
        // does the candidate id match the id in the actionObject? If found
        // then return a new object with the update. If not then return the
        // existing candidate object
        c.id === actionObject.id ? { ...c, status: actionObject.status } : c,
      );
    // if type is unknown then return the array unchanged.
    default:
      return currentState;
  }
}
