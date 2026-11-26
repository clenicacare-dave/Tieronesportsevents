import { ServicePage, serviceMetadata } from '@/components/ServicePage';

// Full edition only (404 in the kids football edition).
export const metadata = serviceMetadata('corporate-hospitality');

export default function Page() {
  return <ServicePage slug="corporate-hospitality" />;
}
