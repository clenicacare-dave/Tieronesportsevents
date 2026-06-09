import { ContactForm } from '@/components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Contact Tier One Sports Events'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-tierMist px-4 py-16 text-tierInk">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
        <section className="flex-1 text-center lg:text-left">
          <Link
            href="/"
            className="mx-auto block w-fit rounded-full shadow-2xl shadow-tierNavy/20 transition hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-tierGold/40 lg:mx-0"
            aria-label="Tier One Sports Events home"
          >
            <Image
              src="/t1.png"
              alt="Tier One Sports Events"
              width={144}
              height={144}
              priority
              className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
            />
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-tierStone">Tier One Sports Events</p>
          <h1 className="mt-2 text-4xl font-bold text-tierNavy">Contact Tier One</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-tierStone">
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
