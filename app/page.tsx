import Link from 'next/link';
import Image from 'next/image';
import packageJson from '../package.json';

export default function HomePage() {
  const commitHash =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA;
  const siteVersion = commitHash
    ? `${packageJson.version} · ${commitHash.slice(0, 7)}`
    : packageJson.version;

  return (
    <main className="min-h-screen bg-tierMist px-6 py-12 text-center text-tierInk sm:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col items-center justify-center">
        <Link
          href="/"
          className="block rounded-full shadow-2xl shadow-tierNavy/25 transition hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-tierGold/40"
          aria-label="Tier One Sports Events home"
        >
          <Image
            src="/t1.png"
            alt="Tier One Sports Events"
            width={224}
            height={224}
            priority
            className="h-44 w-44 rounded-full object-cover sm:h-56 sm:w-56"
          />
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.32em] text-tierStone">
          Tier One Sports Events
        </p>
        <h1 className="mt-4 text-4xl font-bold text-tierNavy sm:text-5xl">
          Coming Soon
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-tierStone sm:text-lg">
          We are preparing a premium sports events experience. Leave your details on our contact
          page and we will reach out as soon as we are ready.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-tierNavy px-8 py-3 font-semibold text-white shadow-lg shadow-tierNavy/20 transition hover:bg-tierInk focus:outline-none focus:ring-4 focus:ring-tierGold/40"
        >
          Contact Tier One
        </Link>
        <div className="mt-10 text-xs text-tierStone/70">v{siteVersion}</div>
      </div>
    </main>
  );
}
