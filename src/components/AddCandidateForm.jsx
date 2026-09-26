// src/components/AddCandidateForm.jsx
import { useState } from "react";
import { candidateSchema } from "../../validation/candidateSchema";
import { useNavigate } from "react-router";
import { API_BASE } from "../config";

export default function AddCandidateForm({ onCandidateAdded }) {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    resume_link: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      candidateSchema
        .validateAt(name, { ...formData, [name]: value })
        .then(() => {
          setErrors((current) => ({ ...current, [name]: "" }));
        })
        .catch((error) => {
          setErrors((current) => ({ ...current, [name]: error.message }));
        });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));

    candidateSchema
      .validateAt(name, formData)
      .then(() => {
        setErrors((current) => ({ ...current, [name]: "" }));
      })
      .catch((error) => {
        setErrors((current) => ({ ...current, [name]: error.message }));
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validated = await candidateSchema.validate(formData, {
        abortEarly: false,
      });
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE}/candidates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validated, status: "review" }),
      });

      if (!response.ok) {
        throw new Error("Failed to save candidate. Please try again.");
      }

      const data = await response.json();
      setSubmitStatus({
        type: "success",
        message: "Candidate added successfully!",
      });
      setFormData(initialValues);
      setErrors({});
      setTouched({});
      if (onCandidateAdded) onCandidateAdded(data);
      navigate("/");
    } catch (error) {
      if (error.inner) {
        const fieldErrors = {};
        error.inner.forEach((item) => {
          fieldErrors[item.path] = item.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus({
          type: "error",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label htmlFor="first_name">First Name *</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Jane"
        />
        {errors.first_name && <p className="form-error">{errors.first_name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="last_name">Last Name *</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Doe"
        />
        {errors.last_name && <p className="form-error">{errors.last_name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="jane.doe@email.com"
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          name="mobile"
          type="text"
          value={formData.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+1 555 123 4567"
        />
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="resume_link">Resume Link</label>
        <input
          id="resume_link"
          name="resume_link"
          type="url"
          value={formData.resume_link}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/resume"
        />
        {errors.resume_link && (
          <p className="form-error">{errors.resume_link}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Strong communication skills and React background"
          rows={4}
        />
        {errors.notes && <p className="form-error">{errors.notes}</p>}
      </div>

      {submitStatus && (
        <p className={submitStatus.type === "error" ? "form-error" : "message"}>
          {submitStatus.message}
        </p>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-plain"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Candidate"}
        </button>
      </div>
    </form>
  );
}
