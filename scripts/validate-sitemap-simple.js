import { readFileSync } from 'fs';
import { resolve } from 'path';

const validateSitemap = () => {
  const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
  const hostname = 'https://www.firstpullrequest.space';
  
  console.log('🔍 Validating FirstPullRequest sitemap...');
  console.log(`📂 Path: ${sitemapPath}`);
  
  try {
    const sitemapContent = readFileSync(sitemapPath, 'utf8');

    // Basic validation checks
    const checks = {
      hasXMLDeclaration: sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>'),
      hasUrlset: sitemapContent.includes('<urlset'),
      hasCorrectNamespace: sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
      hasCorrectHostname: sitemapContent.includes(hostname),
      hasHomepage: sitemapContent.includes(`<loc>${hostname}/</loc>`),
      hasIssuesPage: sitemapContent.includes(`<loc>${hostname}/issues</loc>`),
      hasPriorities: sitemapContent.includes('<priority>'),
      hasChangefreq: sitemapContent.includes('<changefreq>'),
      hasLastmod: sitemapContent.includes('<lastmod>')
    };

    // Count URLs
    const urlMatches = sitemapContent.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;

    // Display results
    console.log('\n✅ Validation Results:');
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}: ${passed ? 'PASS' : 'FAIL'}`);
    });

    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`   📄 Total URLs: ${urlCount}`);
    console.log(`   📏 File size: ${(sitemapContent.length / 1024).toFixed(2)} KB`);

    console.log('\n🚀 Next Steps:');
    console.log('   1. Submit to Google Search Console: https://search.google.com/search-console');
    console.log('   2. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters');
    console.log(`   3. Verify live sitemap: ${hostname}/sitemap.xml`);

    const allPassed = Object.values(checks).every(check => check === true);
    
    if (allPassed) {
      console.log('\n🎉 Sitemap validation PASSED! Ready for submission to search engines.');
    } else {
      console.log('\n⚠️  Some validations failed. Please review the sitemap.');
    }

  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
  }
};

validateSitemap();