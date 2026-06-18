import { MetadataRoute } from 'next';
import { seoGlobal } from '@/data/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoGlobal.url;
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
