import { SitemapAndIndexStream, SitemapStream } from 'sitemap';
import { createWriteStream, createReadStream } from 'fs';
import { resolve } from 'path';

/**
 * Advanced sitemap generator for FirstPullRequest
 * Generates multiple sitemaps for better SEO organization
 */

const generateAdvancedSitemap = async () => {
  const hostname = 'https://www.firstpullrequest.space';
  const publicDir = resolve(process.cwd(), 'public');
  
  console.log('🚀 Generating advanced sitemap structure...');

  // Create sitemap index stream
  const sitemapIndex = new SitemapAndIndexStream({
    limit: 45000, // Split into multiple sitemaps if needed
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({ hostname });
      const path = `./sitemap-${i}.xml`;
      
      sitemapStream
        .pipe(createWriteStream(resolve(publicDir, `sitemap-${i}.xml`)))
        .on('error', (err) => { throw err });
      
      return [new URL(path, hostname).toString(), sitemapStream];
    },
  });

  // Main pages sitemap
  const mainPages = [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
      img: [{
        url: `${hostname}/og-image.png`,
        caption: 'FirstPullRequest Homepage',
        title: 'Find Your First Open Source Contribution'
      }]
    },
    {
      url: '/issues',
      changefreq: 'hourly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
      img: [{
        url: `${hostname}/issues-preview.png`,
        caption: 'GitHub Issues Browser',
        title: 'Browse Beginner-Friendly Issues'
      }]
    },
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
    }
  ];

  // Programming language specific pages
  const languagePages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'go', 
    'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala'
  ].map(lang => ({
    url: `/issues/${lang}`,
    changefreq: 'daily',
    priority: 0.8,
    lastmod: new Date().toISOString(),
    alternateRefs: [{
      href: `${hostname}/issues/${lang}`,
      hreflang: 'en'
    }]
  }));

  // Issue type pages
  const issueTypePages = [
    'good-first-issue',
    'documentation', 
    'bug',
    'enhancement',
    'help-wanted'
  ].map(type => ({
    url: `/issues/type/${type}`,
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date().toISOString()
  }));

  // Blog/content pages (for future SEO content)
  const contentPages = [
    {
      url: '/blog',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    {
      url: '/blog/how-to-make-first-pull-request',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    },
    {
      url: '/blog/best-beginner-github-repositories',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    },
    {
      url: '/blog/open-source-contribution-guide',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    }
  ];

  // Utility pages
  const utilityPages = [
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString()
    },
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: new Date().toISOString()
    },
    {
      url: '/privacy',
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: new Date().toISOString()
    },
    {
      url: '/terms',
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: new Date().toISOString()
    }
  ];

  // Combine all pages
  const allPages = [
    ...mainPages,
    ...languagePages,
    ...issueTypePages,
    ...contentPages,
    ...utilityPages
  ];

  // Write all URLs to sitemap
  allPages.forEach(page => {
    sitemapIndex.write(page);
  });

  sitemapIndex.end();

  // Create the sitemap index file
  const indexStream = createWriteStream(resolve(publicDir, 'sitemap.xml'));
  sitemapIndex.pipe(indexStream);

  return new Promise((resolve, reject) => {
    indexStream.on('finish', () => {
      console.log('✅ Advanced sitemap generated successfully!');
      console.log(`📍 Main sitemap: ${hostname}/sitemap.xml`);
      console.log(`📊 Total URLs: ${allPages.length}`);
      console.log('🎯 Generated sitemaps:');
      console.log('   - sitemap.xml (index)');
      console.log('   - sitemap-0.xml (main pages)');
      
      // Show URL breakdown
      console.log('\n📋 URL Categories:');
      console.log(`   🏠 Main pages: ${mainPages.length}`);
      console.log(`   💻 Language pages: ${languagePages.length}`);
      console.log(`   🏷️  Issue type pages: ${issueTypePages.length}`);
      console.log(`   📝 Content pages: ${contentPages.length}`);
      console.log(`   🔧 Utility pages: ${utilityPages.length}`);

      resolve();
    });

    indexStream.on('error', reject);
  });
};

// Export for use in other scripts
export { generateAdvancedSitemap };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAdvancedSitemap().catch(console.error);
}