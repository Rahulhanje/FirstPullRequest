import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://firstpullrequest.vercel.app' });

  // Static pages
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/issues', changefreq: 'hourly', priority: 0.9 },
    { url: '/git-cheatsheet', changefreq: 'weekly', priority: 0.8 },
    { url: '/OpenSourceDocumentation', changefreq: 'weekly', priority: 0.8 },
  ];

  pages.forEach(page => {
    sitemap.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString(),
    });
  });

  sitemap.end();

  const sitemapXML = await streamToPromise(sitemap);
  const writeStream = createWriteStream(resolve(process.cwd(), 'public/sitemap.xml'));
  writeStream.write(sitemapXML);
  writeStream.end();

  console.log('Sitemap generated successfully!');
};

generateSitemap().catch(console.error);