import { ServicePage, serviceMetadata } from '@/components/ServicePage';

// Kids football edition only (404 in the full edition).
export const metadata = serviceMetadata('clubs-and-academies');

export default function Page() {
  return <ServicePage slug="clubs-and-academies" />;
}
