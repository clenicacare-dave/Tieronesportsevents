"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import type { ContactFormData } from '@/types/contact';

type FormStatus =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

const createInitialPayload = (): ContactFormData => ({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
});

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(createInitialPayload());
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  const isSubmitDisabled = useMemo(() => {
    return submitting || !formData.consent;
  }, [formData.consent, submitting]);

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === 'consent'
          ? (event as ChangeEvent<HTMLInputElement>).target.checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'We could not send your message just now. Please try again.');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for contacting Tier One Sports Events. We will respond shortly.'
      });
      setFormData(createInitialPayload());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setStatus({
        type: 'error',
        message
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Name" required>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange('name')}
            className="input"
            placeholder="Jane Smith"
            required
          />
        </FormField>

        <FormField label="Email" required>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange('email')}
            className="input"
            placeholder="jane@domain.co.uk"
            required
          />
        </FormField>

        <FormField label="Phone">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange('phone')}
            className="input"
            placeholder="+44 20 7123 4567"
          />
        </FormField>

        <FormField label="Subject" required>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange('subject')}
            className="input"
            placeholder="New enquiry"
            required
          />
        </FormField>
      </div>

      <FormField label="Message" required>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange('message')}
          className="input min-h-[160px]"
          placeholder="Please let us know a little about your needs…"
          required
        />
      </FormField>

      <label className="flex items-start gap-3 text-base text-slate-600">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange('consent')}
          className="mt-1.5 h-5 w-5 rounded border-slate-300 text-tierRed focus:ring-tierRed"
          required
        />
        <span>
          I consent to Tier One Sports Events contacting me about this enquiry and to my data being processed in line with the privacy notice.
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full rounded-full px-6 py-3 font-semibold text-white transition ${formData.consent ? 'bg-tierRed hover:bg-tierNavy' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
      >
        {submitting ? 'Sending…' : 'Send enquiry'}
      </button>

      {status.type !== 'idle' && (
        <p className={`text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      <span>
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
    </label>
  );
}
