// src/components/AddCandidateForm.jsx
import { useState } from 'react';
import { candidateSchema } from '../../validation/candidateSchema';
import styles from './AddCandidateForm.module.css';
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const API_URL = 'https://6ab1e4975b9b60f39d34323a.mockapi.io/candidates';

export default function AddCandidateForm({ onCandidateAdded }) {
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    resume_link: '',
    notes: '',
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
          setErrors((current) => ({ ...current, [name]: '' }));
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
        setErrors((current) => ({ ...current, [name]: '' }));
      })
      .catch((error) => {
        setErrors((current) => ({ ...current, [name]: error.message }));
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validated = await candidateSchema.validate(formData, { abortEarly: false });
      setIsSubmitting(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validated, createdAt: new Date().toISOString() }),
      });

      const data = await response.json();
      setSubmitStatus({ type: 'success', message: 'Candidate added successfully!' });
      setFormData(initialValues);
      setErrors({});
      setTouched({});
      if (onCandidateAdded) onCandidateAdded(data);
    } catch (error) {
      if (error.inner) {
        const fieldErrors = {};
        error.inner.forEach((item) => {
          fieldErrors[item.path] = item.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={18} />
          <h2>Add Candidate Form</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formBody}>
        <div>
          <label htmlFor="first_name" className={styles.fieldLabel}>
            First Name <span className={styles.asterisk}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <User size={14} style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#64748b' }} />
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.formInput} ${errors.first_name ? styles.inputError : ''}`}
              placeholder="Jane"
            />
          </div>
          {errors.first_name && <div className={styles.errorMessage}>{errors.first_name}</div>}
        </div>

        <div>
          <label htmlFor="last_name" className={styles.fieldLabel}>
            Last Name <span className={styles.asterisk}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <User size={14} style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#64748b' }} />
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.formInput} ${errors.last_name ? styles.inputError : ''}`}
              placeholder="Doe"
            />
          </div>
          {errors.last_name && <div className={styles.errorMessage}>{errors.last_name}</div>}
        </div>

        <div>
          <label htmlFor="email" className={styles.fieldLabel}>
            Email <span className={styles.asterisk}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={14} style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#64748b' }} />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
              placeholder="jane.doe@email.com"
            />
          </div>
          {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="mobile" className={styles.fieldLabel}>
            Mobile
          </label>
          <div style={{ position: 'relative' }}>
            <Phone size={14} style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#64748b' }} />
            <input
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.formInput} ${errors.mobile ? styles.inputError : ''}`}
              placeholder="+1 555 123 4567"
            />
          </div>
          {errors.mobile && <div className={styles.errorMessage}>{errors.mobile}</div>}
        </div>

        <div>
          <label htmlFor="resume_link" className={styles.fieldLabel}>
            Resume Link
          </label>
          <div style={{ position: 'relative' }}>
            <LinkIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#64748b' }} />
            <input
              id="resume_link"
              name="resume_link"
              type="url"
              value={formData.resume_link}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.formInput} ${errors.resume_link ? styles.inputError : ''}`}
              placeholder="https://example.com/resume"
            />
          </div>
          {errors.resume_link && <div className={styles.errorMessage}>{errors.resume_link}</div>}
        </div>

        <div>
          <label htmlFor="notes" className={styles.fieldLabel}>
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.formInput} ${errors.notes ? styles.inputError : ''}`}
            placeholder="Strong communication skills and React background"
            rows={4}
          />
          {errors.notes && <div className={styles.errorMessage}>{errors.notes}</div>}
        </div>

        {submitStatus && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              background: submitStatus.type === 'success' ? '#ecfdf5' : '#fef2f2',
              color: submitStatus.type === 'success' ? '#166534' : '#991b1b',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {submitStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{submitStatus.message}</span>
          </div>
        )}

        <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="spin" style={{ marginRight: '0.5rem' }} />
              Saving...
            </>
          ) : (
            'Add Candidate'
          )}
        </button>
      </form>
    </div>
  );
}