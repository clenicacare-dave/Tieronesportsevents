import { ServicePage, serviceMetadata } from '@/components/ServicePage';

// Full edition only (404 in the kids football edition).
export const metadata = serviceMetadata('group-travel');

export default function Page() {
  return <ServicePage slug="group-travel" />;
}
