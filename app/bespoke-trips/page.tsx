import { ServicePage, serviceMetadata } from '@/components/ServicePage';

export const metadata = serviceMetadata('bespoke-trips');

export default function Page() {
  return <ServicePage slug="bespoke-trips" />;
}
