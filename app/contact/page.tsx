import { ContactForm } from '@/components/ContactForm';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Tier One Sports Events'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--tierone-bg)] px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
        <section className="flex-1 text-center lg:text-left">
          <Link href="/" className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-tierRed bg-tierNavy text-4xl font-black tracking-normal text-white shadow-xl transition hover:scale-[1.01] lg:mx-0">
            T1
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-tierRed">Tier One Sports Events</p>
          <h1 className="mt-2 text-4xl font-bold text-tierNavy">Contact Tier One</h1>
          <p className="mt-4 text-base text-slate-600">
            Please share a few details about yourself and how we can help. We respond to every
            message within one working day and treat your personal information carefully.
          </p>
        </section>
        <section className="flex-1 w-full">
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
