import { createReadStream } from 'fs';
import { resolve } from 'path';
import { createServer } from 'http';

/**
 * Sitemap validation and testing script
 * Validates the generated sitemap and provides SEO insights
 */

const validateSitemap = async () => {
  const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
  const hostname = 'https://firstpullrequest.vercel.app';
  
  console.log('🔍 Validating FirstPullRequest sitemap...');
  console.log(`📂 Path: ${sitemapPath}`);
  
  try {
    // Read sitemap content
    const sitemapContent = await new Promise((resolve, reject) => {
      let content = '';
      const stream = createReadStream(sitemapPath, 'utf8');
      
      stream.on('data', chunk => content += chunk);
      stream.on('end', () => resolve(content));
      stream.on('error', reject);
    });

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
    console.log(`   🕒 Generated: ${new Date().toISOString()}`);

    // SEO recommendations
    console.log('\n🎯 SEO Recommendations:');
    
    if (urlCount < 50) {
      console.log('   💡 Consider adding more content pages for better SEO coverage');
    }
    
    if (!sitemapContent.includes('priority="1.0"')) {
      console.log('   ⚠️  Ensure homepage has priority 1.0');
    }

    console.log('\n🚀 Next Steps:');
    console.log('   1. Submit to Google Search Console: https://search.google.com/search-console');
    console.log('   2. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters');
    console.log('   3. Test sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
    console.log(`   4. Verify live sitemap: ${hostname}/sitemap.xml`);

    // Check if all validations passed
    const allPassed = Object.values(checks).every(check => check === true);
    
    if (allPassed) {
      console.log('\n🎉 Sitemap validation PASSED! Ready for submission to search engines.');
    } else {
      console.log('\n⚠️  Some validations failed. Please review the sitemap.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
    process.exit(1);
  }
};

// Test sitemap accessibility
const testSitemapAccess = () => {
  console.log('\n🌐 Testing sitemap HTTP access...');
  
  const server = createServer((req, res) => {
    if (req.url === '/sitemap.xml') {
      const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
      const stream = createReadStream(sitemapPath);
      
      res.writeHead(200, {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      });
      
      stream.pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.listen(3001, () => {
    console.log('✅ Test server running on http://localhost:3001');
    console.log('🔗 Test sitemap: http://localhost:3001/sitemap.xml');
    console.log('⏹️  Press Ctrl+C to stop server');
  });
};

// Export functions
export { validateSitemap, testSitemapAccess };

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--test-server')) {
    testSitemapAccess();
  } else {
    validateSitemap();
  }
}