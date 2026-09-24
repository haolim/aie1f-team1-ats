// src/pages/AddCandidatePage.jsx
import AddCandidateForm from '../components/AddCandidateForm';

export default function AddCandidatePage({ onCandidateAdded }) {
  return (
    <div className="add-candidate-page">
      <div className="page-header">
        <h1>Add New Candidate</h1>
      </div>
      <div className="form-panel">
        <AddCandidateForm onCandidateAdded={onCandidateAdded} />
      </div>
    </div>
  );
}