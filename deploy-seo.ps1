# FirstPullRequest SEO Deployment Script
# This script generates sitemap and deploys with full SEO optimization

Write-Host "🚀 Starting SEO-optimized deployment for FirstPullRequest..." -ForegroundColor Cyan

# 1. Generate fresh sitemap
Write-Host "📝 Generating sitemap..." -ForegroundColor Yellow
npm run generate:sitemap

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sitemap generation failed!" -ForegroundColor Red
    exit 1
}

# 2. Validate sitemap
Write-Host "🔍 Validating sitemap..." -ForegroundColor Yellow
node scripts/validate-sitemap-simple.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sitemap validation failed!" -ForegroundColor Red
    exit 1
}

# 3. Run build with optimizations
Write-Host "🔨 Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# 4. Verify critical SEO files exist
Write-Host "🔍 Verifying SEO assets..." -ForegroundColor Yellow

$seoFiles = @(
    "public/sitemap.xml",
    "public/robots.txt", 
    "public/site.webmanifest"
)

foreach ($file in $seoFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing - SEO impact!" -ForegroundColor Red
        exit 1
    }
}

# 5. Check build output
Write-Host "🔍 Validating build output..." -ForegroundColor Yellow
if (Test-Path "dist/index.html") {
    $htmlContent = Get-Content "dist/index.html" -Raw
    if ($htmlContent -match "<title>" -and $htmlContent -match "meta.*description") {
        Write-Host "✅ HTML meta tags present" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing critical meta tags" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Build failed - index.html not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All checks passed! Ready for deployment!" -ForegroundColor Green

Write-Host ""
Write-Host "📊 Post-deployment checklist:" -ForegroundColor Cyan
Write-Host "1. Verify site loads at https://www.firstpullrequest.space" -ForegroundColor White
Write-Host "2. Test sitemap: https://www.firstpullrequest.space/sitemap.xml" -ForegroundColor White  
Write-Host "3. Check robots.txt: https://www.firstpullrequest.space/robots.txt" -ForegroundColor White
Write-Host "4. Submit sitemap to Google Search Console" -ForegroundColor White
Write-Host "5. Test social media sharing (og:image)" -ForegroundColor White
Write-Host "6. Run Lighthouse audit for performance" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Your SEO-optimized site is ready for deployment!" -ForegroundColor Green