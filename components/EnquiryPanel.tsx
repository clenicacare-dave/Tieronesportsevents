import { EnquiryForm, type InterestOption } from './EnquiryForm';
import { site } from '@/lib/site';
import type { EnquiryKind } from '@/types/contact';

// Shows the form when enquiries are switched on (lib/site.ts), otherwise the email address.
export function EnquiryPanel({ kind, interests }: { kind: EnquiryKind; interests?: InterestOption[] }) {
  if (!site.enquiriesEnabled) {
    return (
      <div className="border-t-[3px] border-gold bg-white p-8 shadow-[0_0_0_1px_rgb(var(--color-line))]">
        <h2 className="font-heading text-3xl font-semibold uppercase text-navy">Email us</h2>
        <p className="mt-3 leading-7">
          Online enquiries are not open yet. Please email{' '}
          <a href={`mailto:${site.email}`} className="font-semibold text-navy underline decoration-gold underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }
  return <EnquiryForm kind={kind} interests={interests} />;
}
