import type { Metadata } from 'next';
import { CtaBand, DraftNotice, PageHero, Prose, Section } from '@/components/ui';
import { brand } from '@/brand/brand';
import { isKids } from '@/lib/edition';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: isKids
    ? `${brand.name} plans football trips for young players: clubs, academies, schools and families from ${site.regions}.`
    : `${brand.name} plans sports travel for supporters, families, clubs and corporate groups from ${site.regions}.`,
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={isKids ? 'Built around young players' : 'Built around the occasion'}
        intro={
          isKids
            ? `${brand.name} plans football trips for young players in ${site.regions}: the tour, the tournament or the big match they will never forget.`
            : `${brand.name} plans sports travel for people in ${site.regions} who would rather be there than watch from home.`
        }
      />
      <Section>
        <DraftNotice>
          <strong>Draft for sign-off.</strong> Items in [square brackets] are for Tier One to complete. Add only what is true and can be
          verified.
        </DraftNotice>
        <Prose>
          <h2>Who we are</h2>
          <p>
            {brand.name} is an Irish company that plans {isKids ? 'football trips for young players' : 'travel to sporting occasions for people'} in {site.regions}. We are{' '}
            {company('legalName')}, registered in Ireland with CRO number {company('croNumber')}, at {company('registeredOffice')}.
          </p>
          <p>[The story: who founded Tier One, when, and why. Two or three sentences in your own words.]</p>
          <h2>The people</h2>
          <p>[Name, role and a line on each person a customer will deal with, with a photo if you have one.]</p>
          <h2>What we do</h2>
          {isKids ? (
            <p>
              We plan football trips for young players: international youth tournaments, training camps and tours for clubs, academies and
              schools, and match weekends and stadium tours for families. We look after the travel, the stay and the details around the
              football, so coaches, teachers and parents can enjoy it too.
            </p>
          ) : (
            <p>
              We plan trips to sporting occasions: football and rugby weekends, Grand Prix races, golf and festival racing, and tours for
              clubs and teams. We look after the travel, the stay and the details around the event, so the people travelling can enjoy it.
            </p>
          )}
          <h2>Who we travel with</h2>
          <p>
            {isKids
              ? 'Grassroots clubs, academies, primary and secondary schools, and families, from one young fan to a full squad with its coaches.'
              : 'Supporters, families, friends, clubs, schools, societies and corporate groups, from a couple of people to a full squad.'}
          </p>
          <h2>How we work</h2>
          <ul>
            <li>Every trip starts with a conversation about who is going and what matters to them.</li>
            <li>Every quote sets out what is included and what is not, in writing, before you commit.</li>
            <li>We are clear about what we cannot promise, such as fixture dates set by leagues and broadcasters.</li>
            <li>Event tickets come only from official sources, never touts.</li>
          </ul>
          <h2>Licensed and protected</h2>
          <p>
            [Licence and bonding: {company('travelLicence')}. Add any memberships, such as the Irish Travel Agents Association, only if
            held.]
          </p>
        </Prose>
      </Section>
      <CtaBand />
    </>
  );
}
