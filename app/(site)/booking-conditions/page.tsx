import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';
import { company, site } from '@/lib/site';

// Draft booking conditions: kept out of search until Tier One and its solicitor sign them off.
export const metadata: Metadata = {
  title: 'Booking conditions',
  description: `The conditions that apply when you book a trip with ${brand.name}.`,
  alternates: { canonical: '/booking-conditions' },
  robots: { index: false, follow: true }
};

export default function BookingConditionsPage() {
  return (
    <LegalPage title="Booking conditions" updated="26 November 2026">
      <p>
        These conditions apply when you book a trip with {company('legalName')}, trading as {brand.name}, a company registered in Ireland
        (CRO number {company('croNumber')}). Please read them with your written quote, which sets out exactly what your trip includes.
      </p>

      <h2>1. Your contract</h2>
      <p>
        A booking is made when you accept our written quote and we confirm it in writing after receiving your deposit. The contract is between
        us and the lead traveller, who confirms that everyone in the group agrees to these conditions and is old enough to travel, or is
        travelling with a responsible adult.
      </p>

      <h2>2. Package holidays and your protection</h2>
      <p>
        Many of our trips combine two or more travel services, such as travel and accommodation, and are “packages” under the Package
        Holidays and Linked Travel Arrangements Act 2019. For packages we are fully responsible for delivering every service in your
        contract, and you will receive the standard information form required by law before you book.
      </p>
      <p>
        Money you pay for a package is protected against our insolvency: {company('travelLicence')}. [Confirm the licence from the
        Commission for Aviation Regulation and the bond or other insolvency protection before taking any bookings.]
      </p>
      <p>[Where a trip is not a package, for example event hospitality only, say so in the quote and explain what protection applies.]</p>

      <h2>3. Paying for your trip</h2>
      <ul>
        <li>Deposit: [amount or percentage per person] when you book</li>
        <li>Balance: due [number] weeks before departure</li>
        <li>If the balance is late we may cancel the booking and charge the cancellation fees below</li>
        <li>We do not store card details. [Payment methods and provider to confirm]</li>
      </ul>

      <h2>4. Event tickets</h2>
      <p>
        Your quote says whether event or match tickets, or official hospitality, are included. We source tickets only from event organisers,
        clubs, governing bodies or their authorised hospitality programmes, and never sell tickets above face value where the Sale of
        Tickets (Cultural, Entertainment, Recreational and Sporting Events) Act 2021 forbids it. [Confirm ticket sources and how ticketed
        packages are priced.]
      </p>

      <h2>5. Fixture and event changes</h2>
      <p>
        Leagues, organisers and broadcasters set and move fixture dates and kick-off times; we cannot control them. If an event moves,
        we will tell you as soon as we know and offer the options available: changing your travel to the new date where possible, an
        alternative event, or cancelling. [Policy to confirm: what is refunded when a fixture moves within the same weekend, to another
        date, or is cancelled or played behind closed doors.]
      </p>

      <h2>6. Price changes</h2>
      <p>
        Once your booking is confirmed, we will only increase the price because of changes in fuel or other transport costs, taxes or fees
        set by third parties, or exchange rates, and only if your quote says so. We will tell you at least 20 days before departure. If the
        increase is more than 8% of the package price you can accept it, take an alternative, or cancel with a full refund. [Confirm
        whether Tier One will reserve the right to make price changes at all.]
      </p>

      <h2>7. If you change or cancel</h2>
      <ul>
        <li>
          <strong>Changes:</strong> we will try to help, but suppliers may charge for changes and we will pass those costs on with a [fee].
        </li>
        <li>
          <strong>Passing your place to someone else:</strong> you can transfer a package to another person who meets its conditions if
          you tell us at least 7 days before departure. You and they are both responsible for any extra costs, such as airline name
          changes.
        </li>
        <li>
          <strong>Cancelling:</strong> you can cancel at any time by telling us in writing. Cancellation fees: [schedule by days before
          departure, for example: more than 12 weeks, deposit only; 12 to 6 weeks, 50%; less than 6 weeks, 100%]. Event tickets are
          usually non-refundable.
        </li>
        <li>
          You can cancel without a fee if unavoidable and extraordinary circumstances at your destination, such as war or a natural disaster,
          significantly affect your trip.
        </li>
      </ul>

      <h2>8. If we change or cancel</h2>
      <p>
        If we have to make a significant change to your package, you can accept it, take an alternative, or cancel with a full refund.
        If we cancel, we will refund everything you paid within 14 days, and pay compensation where the law requires it, unless the trip
        is cancelled because the minimum group size was not reached (and we told you in time) or because of unavoidable and extraordinary
        circumstances.
      </p>

      <h2>9. Travel documents, insurance and health</h2>
      <ul>
        <li>
          Everyone travelling needs a valid passport or ID and any visa or entry permission required. See our{' '}
          <Link href="/travel-information">travel information</Link> page.
        </li>
        <li>We strongly recommend travel insurance that covers cancellation, medical costs and the event itself. [Confirm whether it is required.]</li>
        <li>Please tell us about any access, health or dietary needs before you book so we can check they can be met.</li>
      </ul>

      <h2>10. Groups, clubs and schools</h2>
      <p>
        For group bookings the group leader acts for the group, collects payments and passes on information. For trips with under-18s,
        the school, club or organisation is responsible for supervision and safeguarding, and for parental consent. [Confirm group terms,
        including free places for leaders and minimum numbers.]
      </p>

      <h2>11. Our responsibility to you</h2>
      <p>
        We are responsible for delivering the travel services in your package, whether we provide them or our suppliers do. If something
        is not as agreed, tell us or our local contact straight away so we can put it right. Our liability may be limited as international
        conventions allow for air, sea and rail travel, and otherwise to [three times the package price] except for personal injury or
        loss caused intentionally or negligently. [Legal review to confirm.]
      </p>

      <h2>12. Complaints</h2>
      <p>
        If you have a complaint, raise it during the trip so we can try to fix it, and confirm it in writing to{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> within 28 days of your return. We will reply within [number] working days.
        [Confirm any alternative dispute resolution scheme.]
      </p>

      <h2>13. Your data</h2>
      <p>
        We use your details to arrange your trip and share them with the suppliers who deliver it. See our{' '}
        <Link href="/privacy">privacy notice</Link>.
      </p>

      <h2>14. Law</h2>
      <p>
        These conditions are governed by the laws of Ireland and the Irish courts have jurisdiction. If you are a consumer living in
        Northern Ireland or Great Britain, you keep the protection of the mandatory laws where you live.
      </p>
    </LegalPage>
  );
}
