import { ServicePage, serviceMetadata } from '@/components/ServicePage';

// Full edition only (404 in the kids football edition).
export const metadata = serviceMetadata('bespoke-trips');

export default function Page() {
  return <ServicePage slug="bespoke-trips" />;
}
