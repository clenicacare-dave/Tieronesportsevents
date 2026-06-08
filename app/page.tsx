import Link from 'next/link';
import packageJson from '../package.json';

export default function HomePage() {
  const commitHash =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA;
  const siteVersion = commitHash
    ? `${packageJson.version} · ${commitHash.slice(0, 7)}`
    : packageJson.version;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-lg">
        <Link href="/" className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-tierRed bg-tierNavy text-5xl font-black tracking-normal text-white shadow-xl transition hover:scale-[1.01] sm:h-48 sm:w-48">
          T1
        </Link>
        <p className="mt-8 text-2xl font-semibold tracking-wide text-tierRed uppercase">
          Coming Soon
        </p>
        <p className="mt-4 text-base text-slate-600">
          We are preparing a premium sports events experience. Leave your details on our contact
          page and we will reach out as soon as we are ready.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-tierRed px-8 py-3 text-white shadow-lg transition hover:bg-tierNavy"
        >
          Contact Tier One
        </Link>
        <div className="mt-10 text-xs text-slate-400">v{siteVersion}</div>
      </div>
    </main>
  );
}
