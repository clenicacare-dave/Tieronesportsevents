import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: `How ${brand.name} collects, uses and protects your personal data.`,
  alternates: { canonical: '/privacy' }
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="26 November 2026">
      <p>
        This notice explains what personal data {brand.name} collects, why, who we share it with, how long we keep it and the rights you
        have. It applies to this website, to enquiries and quotes, and to trips we arrange.
      </p>

      <h2>Who we are</h2>
      <p>
        {company('legalName')}, trading as {brand.name}, is a company registered in Ireland (CRO number {company('croNumber')}) with its
        registered office at {company('registeredOffice')}. We are the data controller for the personal data described here. For anything
        about your data, email {mail}.
      </p>
      <p>[Confirm whether a data protection officer is needed; for a business of this size it is usually not required.]</p>

      <h2>What we collect</h2>
      <h3>When you send an enquiry or ask for a quote</h3>
      <ul>
        <li>Your name and email address</li>
        <li>Your phone number, if you choose to give it</li>
        <li>Details of your enquiry: the event or sport, group type and size, dates, where you travel from and your message</li>
      </ul>
      <h3>If you go ahead and book</h3>
      <ul>
        <li>The names of everyone travelling, as they appear on their passports or ID</li>
        <li>Dates of birth, nationality and passport or ID details where a carrier, hotel or event requires them</li>
        <li>Contact details for the lead traveller and an emergency contact</li>
        <li>Dietary, access or medical needs you tell us about so we can arrange the trip (we ask for these only when needed, and only with your explicit consent)</li>
        <li>Payment records (we do not store card details: [confirm the payment provider once chosen])</li>
      </ul>
      <h3>When you visit the website</h3>
      <p>
        We do not use analytics, advertising or tracking cookies. To protect the forms from spam, Cloudflare Turnstile checks your browser
        and your IP address is used briefly to limit repeated submissions. See our <Link href="/cookies">cookie notice</Link>.
      </p>

      <h2>Why we use it, and our lawful basis</h2>
      <ul>
        <li>
          <strong>To reply to your enquiry and prepare a quote:</strong> steps you ask us to take before entering a contract (Article 6(1)(b)
          GDPR), and our legitimate interest in answering enquiries (Article 6(1)(f)).
        </li>
        <li>
          <strong>To arrange and manage a booking:</strong> performance of our contract with you (Article 6(1)(b)).
        </li>
        <li>
          <strong>Health, dietary or access information:</strong> your explicit consent (Article 9(2)(a)), which you can withdraw at any
          time.
        </li>
        <li>
          <strong>To keep financial and booking records:</strong> our legal obligations under Irish tax, company and consumer law (Article
          6(1)(c)).
        </li>
        <li>
          <strong>To protect the website from abuse:</strong> our legitimate interest in keeping it secure (Article 6(1)(f)).
        </li>
      </ul>
      <p>
        We do not sell your data. We do not send marketing without your separate consent, and every marketing message will let you opt out.
        We do not make decisions about you by automated means alone.
      </p>

      <h2>Who we share it with</h2>
      <ul>
        <li>
          <strong>Cloudflare</strong> (website hosting, form security and sending enquiry emails)
        </li>
        <li>
          <strong>Zoho</strong> (the email inbox where enquiries are received) [confirm the Zoho data centre: EU or US]
        </li>
        <li>
          <strong>Travel and event suppliers</strong> such as airlines, ferry and rail operators, hotels, transfer companies and event or
          hospitality providers, only the details each needs to deliver your trip
        </li>
        <li>[Payment provider, accountant and insurer, once appointed]</li>
        <li>Public authorities, where the law requires it</li>
      </ul>
      <p>
        Our service providers act on our instructions under written data processing terms. Suppliers that deliver part of your trip use your
        details under their own privacy notices.
      </p>

      <h2>Transfers outside the European Economic Area</h2>
      <p>
        Some providers, such as Cloudflare, may process data outside the EEA, and trips abroad mean sharing details with suppliers in the
        destination country, including the UK. Where we transfer data outside the EEA we rely on an adequacy decision (the UK and, for
        certified US companies, the EU–US Data Privacy Framework) or on the European Commission’s standard contractual clauses. [Legal review
        to confirm for each provider.]
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Enquiries that do not lead to a booking: 12 months from our last contact, then deleted. [Confirm]</li>
        <li>
          Booking and payment records: 6 years after the trip, the period for contract claims and tax records under Irish law. [Confirm]
        </li>
        <li>Health, dietary or access information: deleted once the trip has finished, unless needed for a claim. [Confirm]</li>
      </ul>

      <h2>Children</h2>
      <p>
        This website is not aimed at children, and we ask that enquiries come from adults. For school, club and academy trips we collect
        details of young travellers from the group leader or a parent or guardian, and only what the trip needs. [Confirm the consent
        process for under-18s with legal review.]
      </p>

      <h2>Keeping it safe</h2>
      <p>
        The website is served only over HTTPS, the forms are protected against automated abuse, and enquiries go straight to a single
        business inbox with access limited to the people who need it. [Confirm who has access and that two-step sign-in is on for the mailbox.]
      </p>

      <h2>Your rights</h2>
      <p>Under the GDPR and the Data Protection Acts 1988 to 2018 you can ask us to:</p>
      <ul>
        <li>give you a copy of your data</li>
        <li>correct anything that is wrong</li>
        <li>delete it, where we have no reason to keep it</li>
        <li>restrict or object to how we use it</li>
        <li>give you your data in a portable format</li>
        <li>stop using it for anything that relies on your consent</li>
      </ul>
      <p>Email {mail}. We will reply within one month, free of charge.</p>
      <p>
        If you are unhappy with how we handle your data you can complain to the{' '}
        <a href="https://www.dataprotection.ie" rel="noopener" target="_blank">
          Data Protection Commission
        </a>{' '}
        in Ireland. If you live in the UK you can also contact the{' '}
        <a href="https://ico.org.uk" rel="noopener" target="_blank">
          Information Commissioner’s Office
        </a>
        . [Legal review: confirm whether a UK representative is needed under UK GDPR.]
      </p>

      <h2>Changes to this notice</h2>
      <p>If we change how we use personal data we will update this page and the date at the top.</p>
    </LegalPage>
  );
}
