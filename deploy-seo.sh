#!/bin/bash

# FirstPullRequest SEO-Optimized Deployment Script

echo "🚀 Starting SEO-optimized deployment for FirstPullRequest..."

# 1. Generate fresh sitemap
echo "📝 Generating sitemap..."
npm run generate:sitemap

# 2. Run build with optimizations
echo "🔨 Building production bundle..."
npm run build

# 3. Verify critical SEO files exist
echo "🔍 Verifying SEO assets..."

SEO_FILES=(
    "public/sitemap.xml"
    "public/robots.txt"
    "public/site.webmanifest"
    "public/_headers"
)

for file in "${SEO_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing - SEO impact!"
        exit 1
    fi
done

# 4. Check if required images exist (warn if missing)
echo "🖼️  Checking for SEO images..."

SEO_IMAGES=(
    "public/og-image.png"
    "public/favicon-32x32.png"
    "public/apple-touch-icon.png"
)

for image in "${SEO_IMAGES[@]}"; do
    if [[ -f "$image" ]]; then
        echo "✅ $image exists"
    else
        echo "⚠️  $image missing - consider adding for better SEO"
    fi
done

# 5. Validate HTML structure
echo "🔍 Validating build output..."
if [[ -f "dist/index.html" ]]; then
    if grep -q "<title>" "dist/index.html" && grep -q "meta.*description" "dist/index.html"; then
        echo "✅ HTML meta tags present"
    else
        echo "❌ Missing critical meta tags"
        exit 1
    fi
else
    echo "❌ Build failed - index.html not found"
    exit 1
fi

# 6. Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📊 Post-deployment checklist:"
echo "1. Verify site loads at https://www.firstpullrequest.space"
echo "2. Test sitemap: https://www.firstpullrequest.space/sitemap.xml"
echo "3. Check robots.txt: https://www.firstpullrequest.space/robots.txt"
echo "4. Submit sitemap to Google Search Console"
echo "5. Test social media sharing (og:image)"
echo "6. Run Lighthouse audit for performance"
echo ""
echo "🎯 Your SEO-optimized site is live!"