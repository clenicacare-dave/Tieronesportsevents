import type { Metadata } from 'next';
import { CtaBand, DraftNotice, PageHero, Prose, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Travel information',
  description: 'Practical things to check before travelling to a sporting event abroad.',
  alternates: { canonical: '/travel-information' }
};

export default function TravelInformationPage() {
  return (
    <>
      <PageHero eyebrow="Travel information" title="Before you go" intro="Practical things every traveller should check. Your trip information will cover the details for your own trip." />
      <Section>
        <DraftNotice>
          <strong>General guidance only.</strong> Tier One to review before launch. Entry rules change: always check the official sources
          below for your own nationality and destination.
        </DraftNotice>
        <Prose>
          <h2>Passports, ID and entry</h2>
          <p>
            Check that every traveller has valid travel documents for the destination, and how long they must remain valid. Entry
            requirements depend on nationality, not just where you are travelling from. Some visitors to the UK need an Electronic Travel
            Authorisation (ETA) before travelling.
          </p>
          <ul>
            <li>
              <a href="https://www.ireland.ie/en/dfa/overseas-travel/advice/" rel="noopener" target="_blank">
                Department of Foreign Affairs travel advice
              </a>{' '}
              (Ireland)
            </li>
            <li>
              <a href="https://www.gov.uk/foreign-travel-advice" rel="noopener" target="_blank">
                Foreign travel advice on GOV.UK
              </a>
            </li>
            <li>
              <a href="https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" rel="noopener" target="_blank">
                UK Electronic Travel Authorisation (ETA)
              </a>
            </li>
          </ul>
          <h2>Travel insurance</h2>
          <p>We strongly recommend travel insurance for every traveller, arranged when you confirm your trip. Check it covers the activities and the full dates of travel.</p>
          <h2>Tickets and fixtures</h2>
          <p>
            Fixture dates and kick-off times are set by leagues, organisers and broadcasters and can change. Your quote will explain what is
            included and how changes are handled.
          </p>
          <h2>Travelling with children or in a group</h2>
          <p>Group organisers should collect each traveller’s details and any requirements early. For travelling minors, check consent letters and the rules of the carrier and destination.</p>
          <h2>Accessibility</h2>
          <p>Tell us about any access needs when you enquire, so we can check venues, transport and accommodation before you commit.</p>
        </Prose>
      </Section>
      <CtaBand />
    </>
  );
}
