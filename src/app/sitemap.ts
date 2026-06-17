import { MetadataRoute } from 'next';
import { seoConfig } from '@/data/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.url;
  const lastModified = new Date();

  const routes = [
    '',
    '/dev',
    '/ti',
    '/dev/cv',
    '/ti/cv',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
