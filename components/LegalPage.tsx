import { brand } from '@/brand/brand';
import { DraftNotice, PageHero, Prose, Section } from './ui';

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated ${updated}.`} />
      <Section>
        <DraftNotice>
          <strong>Draft for sign-off.</strong> Written for {brand.name}, a company registered in Ireland. Items in [square brackets] are for
          Tier One to complete, and the whole page needs independent legal review before it is relied on. It is not legal advice.
        </DraftNotice>
        <Prose>{children}</Prose>
      </Section>
    </>
  );
}
