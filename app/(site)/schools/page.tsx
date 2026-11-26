import { ServicePage, serviceMetadata } from '@/components/ServicePage';

// Kids football edition only (404 in the full edition).
export const metadata = serviceMetadata('schools');

export default function Page() {
  return <ServicePage slug="schools" />;
}
