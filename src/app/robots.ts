import { MetadataRoute } from 'next';
import { seoGlobal } from '@/data/seo-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${seoGlobal.url}/sitemap.xml`,
  };
}
