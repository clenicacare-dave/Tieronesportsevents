import { ServicePage, serviceMetadata } from '@/components/ServicePage';

export const metadata = serviceMetadata('corporate-hospitality');

export default function Page() {
  return <ServicePage slug="corporate-hospitality" />;
}
