import { ServicePage, serviceMetadata } from '@/components/ServicePage';

export const metadata = serviceMetadata('group-travel');

export default function Page() {
  return <ServicePage slug="group-travel" />;
}
