import type { MetadataRoute } from 'next';
import { brand } from '@/brand/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.shortName,
    start_url: '/',
    display: 'browser',
    theme_color: brand.themeColor,
    background_color: brand.backgroundColor,
    icons: [
      { src: brand.icons.icon192, sizes: '192x192', type: 'image/png' },
      { src: brand.icons.icon512, sizes: '512x512', type: 'image/png' }
    ]
  };
}
