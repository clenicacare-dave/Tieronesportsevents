import Link from 'next/link';
import { PageHero } from '@/components/ui';

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Off the pitch" intro="That page does not exist, or has moved.">
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn-gold">
          Home
        </Link>
        <Link href="/events" className="btn-outline">
          Browse events
        </Link>
      </div>
    </PageHero>
  );
}
