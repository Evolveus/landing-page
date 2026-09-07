import { useState } from 'react';
import { Icon } from './Icon';
import { CONTACT_FIELDS_INITIAL } from '../content';

// Shared demo-request form, wired to /api/contact (see server/contact.js).
// Every design imports this instead of re-implementing submission logic.
// Style it from the design's own CSS via descendant selectors on the
// stable "ef-*" class names below (e.g. `.p3 .ef-field input`).
export function ContactForm({ id = 'contact', submitLabel = 'Send request' }) {
  const [values, setValues] = useState(CONTACT_FIELDS_INITIAL);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'submitting', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your request right now.');
      }

      setValues(CONTACT_FIELDS_INITIAL);
      setStatus({
        state: 'success',
        message: result.message || 'Your request has been sent. Check your email for confirmation.',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your request right now.',
      });
    }
  };

  return (
    <form className="ef-form" onSubmit={submit} id={id}>
      <div className="ef-grid">
        <label className="ef-field">
          <span>Name</span>
          <input type="text" name="name" value={values.name} onChange={update} autoComplete="name" required />
        </label>
        <label className="ef-field">
          <span>Email</span>
          <input type="email" name="email" value={values.email} onChange={update} autoComplete="email" required />
        </label>
        <label className="ef-field">
          <span>Organisation name</span>
          <input type="text" name="organisationName" value={values.organisationName} onChange={update} autoComplete="organization" required />
        </label>
        <label className="ef-field">
          <span>Number of students</span>
          <input type="number" name="numberOfStudents" value={values.numberOfStudents} onChange={update} min="1" step="1" inputMode="numeric" required />
        </label>
        <label className="ef-field ef-field--wide">
          <span>Contact number</span>
          <input type="tel" name="contactNumber" value={values.contactNumber} onChange={update} autoComplete="tel" required />
        </label>
      </div>

      <button className="ef-submit" type="submit" disabled={status.state === 'submitting'}>
        {status.state === 'submitting' ? 'Sending…' : submitLabel}
        <Icon name="arrowRight" size={14} />
      </button>

      {status.message && (
        <div className={`ef-message ef-message--${status.state}`} role={status.state === 'error' ? 'alert' : 'status'}>
          {status.message}
        </div>
      )}
    </form>
  );
}
