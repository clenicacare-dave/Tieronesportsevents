import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { ContactFormData } from '@/types/contact';

const resendApiKey = process.env.RESEND_API_KEY;
const forwardTo = process.env.CONTACT_FORM_TO;
const fromIdentity = process.env.CONTACT_FORM_FROM;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const emailRegex =
  // Basic pattern suitable for simple validation
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (request.headers.get('content-type')?.includes('application/json') !== true) {
    return NextResponse.json({ error: 'Invalid content type.' }, { status: 415 });
  }

  if (!resend || !forwardTo || !fromIdentity) {
    console.error('Contact form email variables missing.');
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  let body: ContactFormData;

  try {
    body = (await request.json()) as ContactFormData;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim() || 'Not provided';
  const subject = body.subject?.trim();
  const message = body.message?.trim();
  const consentGiven = body.consent === true;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  if (message.length < 6) {
    return NextResponse.json({ error: 'Message should be at least 6 characters long.' }, { status: 400 });
  }

  if (!consentGiven) {
    return NextResponse.json({ error: 'Consent is required.' }, { status: 400 });
  }

  const plainText = [
    'New enquiry submitted on the Tier One Sports Events website.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #12344d;">
      <p>New enquiry submitted on the Tier One Sports Events website.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
        <li><strong>Subject:</strong> ${escapeHtml(subject)}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${escapeHtml(message)}</p>
    </div>
  `;

  const acknowledgementMessage = `
    Dear ${name},

    Thank you for contacting Tier One Sports Events. We have received your message and a member of the team will respond within one working day.

    Warm regards,
    Tier One Sports Events
  `;

  const acknowledgementHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #12344d;">
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for contacting Tier One Sports Events. We have received your message and a member of the team will respond within one working day.</p>
      <p>Warm regards,<br/>Tier One Sports Events</p>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromIdentity,
        to: forwardTo,
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: plainText,
        html
      }),
      resend.emails.send({
        from: fromIdentity,
        to: email,
        subject: 'Thank you for contacting Tier One Sports Events',
        reply_to: fromIdentity,
        text: acknowledgementMessage.trim(),
        html: acknowledgementHtml
      })
    ]);
  } catch (error) {
    console.error('Failed to send contact emails', error);
    return NextResponse.json({ error: 'Unable to send email just now.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}
