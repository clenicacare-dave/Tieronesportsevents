import { DraftNotice, PageHero, Prose, Section } from './ui';

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated ${updated}.`} />
      <Section>
        <DraftNotice>
          <strong>Draft: independent legal review required before launch.</strong> Items in [square brackets] are for Tier One to complete.
          This draft describes how the website works today; it is not legal advice.
        </DraftNotice>
        <Prose>{children}</Prose>
      </Section>
    </>
  );
}
