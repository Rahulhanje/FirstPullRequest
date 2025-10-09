import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const generateSitemap = async () => {
  // Ensure correct hostname
  const hostname = 'https://www.firstpullrequest.space';
  const sitemap = new SitemapStream({ 
    hostname: hostname,
    cacheTime: 600000
  });

  console.log('🗺️  Generating sitemap for FirstPullRequest...');
  console.log(`🌐 Using hostname: ${hostname}`);

  // Static pages with SEO-optimized priorities and frequencies
  const pages = [
    // Homepage - highest priority
    { 
      url: '/', 
      changefreq: 'daily', 
      priority: 1.0,
      lastmod: new Date().toISOString()
    },
    
    // Issues page - second highest priority (main functionality)
    { 
      url: '/issues', 
      changefreq: 'hourly', 
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    
    // Educational content - high priority for SEO
    { 
      url: '/git-cheatsheet', 
      changefreq: 'weekly', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    
    { 
      url: '/OpenSourceDocumentation', 
      changefreq: 'weekly', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },

    // Additional potential pages
    { 
      url: '/about', 
      changefreq: 'monthly', 
      priority: 0.6,
      lastmod: new Date().toISOString()
    },

    { 
      url: '/contact', 
      changefreq: 'monthly', 
      priority: 0.5,
      lastmod: new Date().toISOString()
    },

    // Blog/Content pages for SEO
    { 
      url: '/blog', 
      changefreq: 'weekly', 
      priority: 0.7,
      lastmod: new Date().toISOString()
    },

    // Language-specific pages for better SEO targeting
    { 
      url: '/issues/javascript', 
      changefreq: 'daily', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },

    { 
      url: '/issues/python', 
      changefreq: 'daily', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },

    { 
      url: '/issues/typescript', 
      changefreq: 'daily', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },

    { 
      url: '/issues/java', 
      changefreq: 'daily', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    },

    { 
      url: '/issues/react', 
      changefreq: 'daily', 
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  ];

  // Add pages to sitemap
  pages.forEach(page => {
    sitemap.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: page.lastmod,
    });
  });

  sitemap.end();

  try {
    const sitemapXML = await streamToPromise(sitemap);
    const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
    const writeStream = createWriteStream(sitemapPath);
    
    writeStream.write(sitemapXML);
    writeStream.end();

    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`🔗 URL: ${hostname}/sitemap.xml`);
    console.log(`📊 Total URLs: ${pages.length}`);
    
    console.log('🎯 Sitemap includes:');
    pages.forEach(page => {
      console.log(`   - ${hostname}${page.url} (Priority: ${page.priority})`);
    });

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Generate robots.txt hint
const generateRobotsHint = () => {
  console.log('\n🤖 Robots.txt already updated with sitemap URL');
  console.log('📍 Submit to Google Search Console: https://search.google.com/search-console');
};

generateSitemap()
  .then(generateRobotsHint)
  .catch(console.error);