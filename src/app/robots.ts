import { MetadataRoute } from 'next';
import { seoConfig } from '@/data/seo-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${seoConfig.url}/sitemap.xml`,
  };
}
