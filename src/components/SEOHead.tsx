/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'travel-hub';
  // Article specific attributes
  articleInfo?: {
    publishedTime?: string;
    authorName?: string;
    imageUrl?: string;
    category?: string;
  };
  // Travel Deal specific attributes (GEO focus)
  dealInfo?: {
    origin: string;
    destination: string;
    route: string;
    price: string;
    airline: string;
    expiryDate: string;
  };
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  type = 'website',
  articleInfo,
  dealInfo,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = `${title} | Wings & Wallet — Europe-Africa Flight Hub`;
    document.title = formattedTitle;

    // Helper to select/create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Set Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    
    const baseKeywords = [
      'Europe to Africa flight deals',
      'Cheap flights to Lagos',
      'Accra flights from London',
      'EASA Part 66 validation Africa',
      'Wings and Wallet travel',
      'African diaspora travel deals',
      'Aviation career transitions Europe Africa',
      'Young professional travel 25-54',
      'Air Peace',
      'Ethiopian Airlines deals',
      'Kenya Airways tickets',
      'Brussels Airlines Brussels to Kinshasa'
    ];
    const combinedKeywords = Array.from(new Set([...keywords, ...baseKeywords])).join(', ');
    setMetaTag('name', 'keywords', combinedKeywords);
    
    // Add GEO Specific Meta Tags
    setMetaTag('name', 'geo.region', 'GB;BE;FR;DE;NG;GH;KE;SN');
    setMetaTag('name', 'geo.position', '51.5074;-0.1278;6.5244;3.3792'); // Core corridor coordinate ranges
    setMetaTag('name', 'ICBM', '51.5074, -0.1278, 6.5244, 3.3792');
    setMetaTag('name', 'audience', 'African diaspora in Europe, age 25-55, young professionals, aviation specialists, students');

    // 3. Set Open Graph (Social) Tags
    const pageUrl = canonicalUrl || window.location.href;
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', pageUrl);
    setMetaTag('property', 'og:type', type === 'article' ? 'article' : 'website');
    setMetaTag('property', 'og:site_name', 'Wings & Wallet');
    
    const fallbackImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200';
    setMetaTag('property', 'og:image', articleInfo?.imageUrl || fallbackImage);
    
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', articleInfo?.imageUrl || fallbackImage);

    // 4. Inject Dynamic Structured JSON-LD Data
    // Remove previous script tags to prevent duplicates
    const existingScripts = document.querySelectorAll('script[data-seo-schema="wings-wallet"]');
    existingScripts.forEach((s) => s.remove());

    const schemas: any[] = [];

    // General NewsMediaOrganization Schema (Always Included as Publisher info)
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      'id': `${window.location.origin}/#organization`,
      'name': 'Wings & Wallet',
      'url': window.location.origin,
      'logo': fallbackImage,
      'foundingDate': '2026',
      'description': 'Diaspora flight intelligence and aviation journal bridging Europe and Africa.',
      'sameAs': [
        'https://twitter.com/wings_wallet',
        'https://facebook.com/wings_wallet'
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'London',
        'addressCountry': 'UK'
      }
    };
    schemas.push(organizationSchema);

    // Specific schemas based on page type
    if (type === 'article' && articleInfo) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': pageUrl
        },
        'headline': title,
        'image': articleInfo.imageUrl || fallbackImage,
        'datePublished': articleInfo.publishedTime || '2026-07-17',
        'author': {
          '@type': 'Person',
          'name': articleInfo.authorName || 'Wings & Wallet Editor'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Wings & Wallet',
          'logo': {
            '@type': 'ImageObject',
            'url': fallbackImage
          }
        },
        'description': description
      };
      schemas.push(articleSchema);

      // If it is also a travel deal, append Product/Offer structured schema for Google Flights/Rich Search results
      if (dealInfo) {
        const routePriceClean = dealInfo.price.replace(/[^0-9]/g, '');
        const currencyCode = dealInfo.price.includes('€') ? 'EUR' : 'GBP';

        const dealSchema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': `Flight Deal: ${dealInfo.route} with ${dealInfo.airline}`,
          'image': articleInfo.imageUrl || fallbackImage,
          'description': `Exclusive verified diaspora airfare to ${dealInfo.destination}. Originating from ${dealInfo.origin}. Valid until ${dealInfo.expiryDate}.`,
          'offers': {
            '@type': 'Offer',
            'price': routePriceClean || '450',
            'priceCurrency': currencyCode,
            'availability': 'https://schema.org/InStock',
            'validThrough': dealInfo.expiryDate || '2026-10-31',
            'url': pageUrl,
            'offeredBy': {
              '@type': 'Airline',
              'name': dealInfo.airline
            }
          }
        };
        schemas.push(dealSchema);
      }
    } else if (type === 'travel-hub') {
      const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'id': `${window.location.origin}/#travel-hub-page`,
        'name': 'Aviation Corridor Travel Hub — Wings & Wallet',
        'description': description,
        'url': pageUrl
      };
      schemas.push(webPageSchema);
    }

    // Inject scripts
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'wings-wallet');
      script.text = JSON.stringify(schema);
      document.body.appendChild(script);
    });

    return () => {
      // Clean up dynamic scripts on unmount to keep DOM pristine
      const scripts = document.querySelectorAll('script[data-seo-schema="wings-wallet"]');
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, type, articleInfo, dealInfo]);

  return null;
}
