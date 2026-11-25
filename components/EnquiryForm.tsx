'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { groupTypes, type ContactFormData, type EnquiryKind } from '@/types/contact';

type FormStatus = { type: 'idle' } | { type: 'success'; message: string } | { type: 'error'; message: string };

const empty = (kind: EnquiryKind): ContactFormData => ({
  kind,
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  interest: '',
  groupType: '',
  partySize: '',
  dates: '',
  departFrom: '',
  website: ''
});

export interface InterestOption {
  value: string;
  label: string;
  group: string;
}

export function EnquiryForm({ kind, interests = [] }: { kind: EnquiryKind; interests?: InterestOption[] }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [data, setData] = useState<ContactFormData>(empty(kind));
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  // Pre-select the event or trip type from links such as /quote?event=slug
  useEffect(() => {
    if (kind !== 'quote') return;
    const params = new URLSearchParams(window.location.search);
    const pick = params.get('event') || params.get('type');
    const match = interests.find((i) => i.value === pick);
    if (match) setData((d) => ({ ...d, interest: match.label }));
  }, [kind, interests]);

  const set =
    (field: keyof ContactFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = field === 'consent' ? (e as ChangeEvent<HTMLInputElement>).target.checked : e.target.value;
      setData((prev) => ({ ...prev, [field]: value }));
    };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle' });
    try {
      const payload: ContactFormData = { ...data };
      if (siteKey) {
        const field = event.currentTarget.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]');
        payload.turnstileToken = field?.value ?? '';
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'We could not send your message just now. Please try again.');
      }
      setStatus({ type: 'success', message: 'Thank you. Your enquiry has been sent and we will reply, usually within one working day.' });
      setData(empty(kind));
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    } finally {
      // Tokens are single-use: get a fresh one for any further submission.
      (window as unknown as { turnstile?: { reset?: () => void } }).turnstile?.reset?.();
      setSubmitting(false);
    }
  }

  if (status.type === 'success') {
    return (
      <div role="status" className="border-t-[3px] border-gold bg-white p-8 shadow-[0_0_0_1px_rgb(var(--color-line))]">
        <h2 className="font-heading text-3xl font-semibold uppercase text-navy">Enquiry sent</h2>
        <p className="mt-3 leading-7">{status.message}</p>
        <Link href="/events" className="btn-navy mt-6">
          Back to events
        </Link>
      </div>
    );
  }

  const groups = Array.from(new Set(interests.map((i) => i.group)));

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-6 border-t-[3px] border-gold bg-white p-6 shadow-[0_0_0_1px_rgb(var(--color-line))] sm:p-8">
      {/* Honeypot: hidden from people and assistive technology */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" autoComplete="off" tabIndex={-1} value={data.website} onChange={set('website')} />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" name="name" autoComplete="name" maxLength={100} value={data.name} onChange={set('name')} className="input" required />
        </Field>
        <Field label="Email" required>
          <input type="email" name="email" autoComplete="email" maxLength={200} value={data.email} onChange={set('email')} className="input" required />
        </Field>
        <Field label="Phone" hint="Optional">
          <input type="tel" name="phone" autoComplete="tel" maxLength={40} value={data.phone} onChange={set('phone')} className="input" />
        </Field>

        {kind === 'contact' ? (
          <Field label="Subject" required>
            <input type="text" name="subject" maxLength={150} value={data.subject} onChange={set('subject')} className="input" required />
          </Field>
        ) : (
          <Field label="Interested in" required>
            <select name="interest" value={data.interest} onChange={set('interest')} className="input" required>
              <option value="">Choose one</option>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {interests
                    .filter((i) => i.group === g)
                    .map((i) => (
                      <option key={i.value} value={i.label}>
                        {i.label}
                      </option>
                    ))}
                </optgroup>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </Field>
        )}
      </div>

      {kind === 'quote' && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Who is travelling?" hint="Optional">
            <select name="groupType" value={data.groupType} onChange={set('groupType')} className="input">
              <option value="">Choose one</option>
              {groupTypes.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="How many people?" hint="Optional">
            <input type="number" name="partySize" inputMode="numeric" min={1} max={999} value={data.partySize} onChange={set('partySize')} className="input" />
          </Field>
          <Field label="Dates" hint="Optional, a rough window is fine">
            <input type="text" name="dates" maxLength={150} value={data.dates} onChange={set('dates')} className="input" placeholder="e.g. March 2027" />
          </Field>
          <Field label="Travelling from" hint="Optional">
            <input type="text" name="departFrom" maxLength={100} value={data.departFrom} onChange={set('departFrom')} className="input" placeholder="e.g. Dublin" />
          </Field>
        </div>
      )}

      <Field label={kind === 'quote' ? 'Anything else we should know?' : 'Message'} required>
        <textarea name="message" maxLength={4000} value={data.message} onChange={set('message')} className="input min-h-[150px]" required />
      </Field>

      <label className="flex items-start gap-3 text-[0.95rem] leading-6 text-ink">
        <input type="checkbox" name="consent" checked={data.consent} onChange={set('consent')} className="mt-1 h-5 w-5 shrink-0 accent-[rgb(var(--color-navy))]" required />
        <span>
          I agree to Tier One Sports Events using these details to reply to my enquiry, as set out in the{' '}
          <Link href="/privacy" className="font-semibold text-navy underline decoration-gold underline-offset-2">
            privacy notice
          </Link>
          .
        </span>
      </label>

      {siteKey && (
        <>
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" data-size="flexible" />
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        </>
      )}

      <button type="submit" disabled={submitting} className="btn-navy w-full justify-center disabled:cursor-wait disabled:opacity-70">
        {submitting ? 'Sending…' : kind === 'quote' ? 'Send quote request' : 'Send enquiry'}
      </button>

      <p aria-live="polite" className="text-sm text-red-700">
        {status.type === 'error' ? status.message : ''}
      </p>
      <p className="text-sm text-muted">No payment and no commitment. Nothing is booked until you confirm a written quote.</p>
    </form>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
      <span>
        {label}
        {required && <span className="text-gold-dark"> *</span>}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
