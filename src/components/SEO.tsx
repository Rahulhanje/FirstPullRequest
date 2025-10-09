import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: object;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "FirstPullRequest - Find Your First Open Source Contribution | GitHub Issues for Beginners",
  description = "Discover beginner-friendly GitHub issues labeled 'good first issue' and 'documentation'. The ultimate platform for new developers to start their open source journey with confidence.",
  keywords = "open source, github issues, good first issue, beginner programming, first pull request, documentation, javascript, python, typescript, programming tutorial, developer tools, coding for beginners, software development, contributing to open source, github contribution, developer community",
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://www.firstpullrequest.space/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
  noIndex = false
}) => {
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FirstPullRequest",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": description,
    "url": "https://www.firstpullrequest.space",
    "author": {
      "@type": "Person",
      "name": "Rahul Hanje",
      "email": "rahulhanje0.7@gmail.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "keywords": keywords,
    "applicationSubCategory": "Educational",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "screenshot": "https://www.firstpullrequest.space/screenshot.png",
    "featureList": [
      "Find beginner-friendly GitHub issues",
      "Filter by programming language",
      "Sort by creation date and updates",
      "Dark/Light mode support",
      "Mobile responsive design",
      "Real-time issue status",
      "Direct GitHub integration"
    ]
  };

  const pageUrl = canonical || `https://www.firstpullrequest.space${window.location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={pageUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:site_name" content="FirstPullRequest" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || ogImage} />
      <meta name="twitter:creator" content="@rahulhanje" />
      <meta name="twitter:site" content="@firstpullrequest" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Rahul Hanje" />
      <meta name="creator" content="Rahul Hanje" />
      <meta name="publisher" content="FirstPullRequest" />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Technical Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#4f46e5" />
      <meta name="msapplication-TileColor" content="#4f46e5" />
      <meta name="application-name" content="FirstPullRequest" />
      <meta name="apple-mobile-web-app-title" content="FirstPullRequest" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://api.github.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
      
      {/* Additional structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FirstPullRequest",
          "url": "https://www.firstpullrequest.space",
          "logo": "https://www.firstpullrequest.space/logo.png",
          "sameAs": [
            "https://github.com/Rahulhanje/FirstPullRequest"
          ],
          "founder": {
            "@type": "Person",
            "name": "Rahul Hanje",
            "email": "rahulhanje0.7@gmail.com"
          },
          "foundingDate": "2024"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;