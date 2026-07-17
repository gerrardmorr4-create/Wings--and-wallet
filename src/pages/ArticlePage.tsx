/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Share2, Twitter, Facebook, Link, ArrowLeft, Send, Check, PlaneTakeoff, Info, ShieldAlert, Loader2 } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import AdSenseZone from '../components/AdSenseZone';
import NewsletterBlock from '../components/NewsletterBlock';
import { CurrencyMode, convertString } from '../lib/currency';
import SEOHead from '../components/SEOHead';

interface ArticlePageProps {
  id: string;
  onNavigate: (hash: string) => void;
}

export default function ArticlePage({ id, onNavigate }: ArticlePageProps) {
  const [copied, setCopied] = useState(false);
  const { articles, loading, error } = useArticles();

  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>(() => {
    try {
      const saved = localStorage.getItem('wings_wallet_currency');
      return (saved as CurrencyMode) || 'original';
    } catch {
      return 'original';
    }
  });

  const handleCurrencyModeChange = (mode: CurrencyMode) => {
    setCurrencyMode(mode);
    try {
      localStorage.setItem('wings_wallet_currency', mode);
    } catch (e) {
      console.warn('Could not save currency preference', e);
    }
  };

  // Find current article
  const article = articles.find((a) => a.id === id);

  // Scroll to top on mount or article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 animate-fade-in text-red-600">
        <h2 className="font-serif text-2xl font-bold">Error Loading Article</h2>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 animate-fade-in">
        <h2 className="font-serif text-2xl font-bold text-[#1B4F72]">Publication Not Found</h2>
        <p className="text-sm text-gray-500">The article you are searching for might have been archived or removed.</p>
        <button
          onClick={() => onNavigate('#home')}
          className="px-6 py-2.5 bg-[#1B4F72] text-white text-xs font-bold uppercase rounded-lg"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Related articles (same category, excluding current)
  const relatedArticles = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareText = `Read "${article.title}" on Wings & Wallet`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  return (
    <div className="pb-16 animate-fade-in" id={`article-page-${id}`}>
      <SEOHead 
        title={article.title}
        description={article.excerpt}
        keywords={article.tags}
        type="article"
        articleInfo={{
          publishedTime: article.publishedDate,
          authorName: article.author,
          imageUrl: article.imageUrl,
          category: article.category
        }}
        dealInfo={article.dealInfo ? {
          origin: article.dealInfo.route.split('⇄')[0]?.trim() || 'Europe',
          destination: article.dealInfo.destination || 'Africa',
          route: article.dealInfo.route,
          price: article.dealInfo.price,
          airline: article.dealInfo.airline,
          expiryDate: article.dealInfo.expiryDate
        } : undefined}
      />
      
      {/* 1. Leaderboard Ad in header */}
      <div className="bg-gray-100/50 py-4 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AdSenseZone type="leaderboard" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Back Button */}
        <button
          onClick={() => {
            if (article.category === 'travel-deals') {
              onNavigate('#travel-hub');
            } else {
              onNavigate(`#pillar/${article.category}`);
            }
          }}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase text-gray-500 hover:text-[#1B4F72] transition-colors py-2 mb-6 group focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>{article.category === 'travel-deals' ? 'Back to Travel Hub' : `Back to ${article.category.replace('-', ' ')}`}</span>
        </button>

        {/* 2. Article Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left / Middle: Article content */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/50 p-6 md:p-8 space-y-6 shadow-3xs">
            
            {/* Category badge */}
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold uppercase tracking-wider">
              {article.category.replace('-', ' ')}
            </span>

            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4.5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base md:text-lg text-gray-500 leading-relaxed font-serif italic border-l-4 border-[#1B4F72] pl-4">
                {article.subtitle}
              </p>
            )}

            {/* Author / Date / Share Panel */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-y border-gray-100 text-xs text-gray-500 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center font-serif font-bold text-[#1B4F72] border border-gray-200">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-gray-800">{article.author}</span>
                  <span className="block text-[10px] text-gray-400">Published {article.publishedDate} • {article.readTime}</span>
                </div>
              </div>

              {/* Social sharing */}
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider mr-2 text-gray-400">Share:</span>
                
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-50 hover:bg-amber-100 hover:text-black rounded-full transition-colors text-gray-600"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-50 hover:bg-[#1B4F72] hover:text-white rounded-full transition-colors text-gray-600"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyLink}
                  className={`p-2 rounded-full transition-colors flex items-center space-x-1 text-gray-600 ${
                    copied ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  aria-label="Copy article link"
                >
                  {copied ? <Check className="w-4 h-4 animate-scale-up" /> : <Link className="w-4 h-4" />}
                  {copied && <span className="text-[10px] font-bold px-1">Copied!</span>}
                </button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-100 max-h-[440px]">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Flight Deal Structured Panel (If deal post) */}
            {article.dealInfo && (
              <section 
                id="deal-metadata-panel"
                className="bg-amber-50/50 border-2 border-amber-300/60 rounded-xl p-6 space-y-4 animate-fade-in"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-200/40">
                  <div className="flex items-center space-x-2">
                    <PlaneTakeoff className="w-5 h-5 text-[#1B4F72]" />
                    <h3 className="font-serif font-extrabold text-lg text-[#1B4F72]">Flight Deal Summary</h3>
                  </div>
                  
                  {/* Currency Toggle Inside Deal Panel */}
                  <div className="flex items-center space-x-2">
                    <div className="inline-flex bg-white/80 backdrop-blur-xs border border-amber-200 rounded-lg p-0.5 shadow-3xs text-[10px]">
                      {(['original', 'EUR', 'USD', 'local'] as const).map((curr) => {
                        let label = '';
                        if (curr === 'original') label = 'As Posted';
                        else if (curr === 'EUR') label = 'EUR';
                        else if (curr === 'USD') label = 'USD';
                        else if (curr === 'local') label = 'Local';
                        return (
                          <button
                            key={curr}
                            onClick={() => handleCurrencyModeChange(curr)}
                            className={`px-2 py-0.5 rounded font-bold uppercase transition-all cursor-pointer ${
                              currencyMode === curr
                                ? 'bg-[#1B4F72] text-white shadow-xs'
                                : 'text-neutral-500 hover:text-neutral-900'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <span className="bg-[#1B4F72] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-3xs shrink-0">
                      ACTIVE DEAL
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-white p-3 rounded border border-amber-200/40 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase">Route Corridor:</span>
                    <strong className="block text-sm text-neutral-800">{article.dealInfo.route}</strong>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-200/40 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase">Carrier Airline:</span>
                    <strong className="block text-sm text-neutral-800">{article.dealInfo.airline}</strong>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-200/40 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase">Fare Value:</span>
                    <strong className="block text-base text-amber-600 font-extrabold">
                      {convertString(article.dealInfo.price, currencyMode, article.dealInfo.destination || '')} Round-Trip
                    </strong>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-200/40 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase">Validity &amp; Expiry:</span>
                    <strong className="block text-sm text-neutral-800">{article.dealInfo.expiryDate}</strong>
                  </div>
                </div>

                {(() => {
                  const type = article.dealInfo.dealType || 'standard';
                  if (type === 'student') {
                    return (
                      <div className="p-3 bg-indigo-50 text-indigo-900 text-[11.5px] rounded border border-indigo-100 flex items-start space-x-2.5">
                        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>🎓 Student Deal Privilege:</strong> This academic fare includes an **extra 3rd checked bag** (up to 23kg) free of charge, plus 1 free date change. A valid university email or student ID card is required to confirm booking eligibility.
                        </p>
                      </div>
                    );
                  } else if (type === 'business') {
                    return (
                      <div className="p-3 bg-neutral-950 text-amber-400 text-[11.5px] rounded border border-amber-500/30 flex items-start space-x-2.5">
                        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>💼 Business Class Luxury:</strong> Includes **3 checked bags up to 32kg each**, premium airport VIP lounge access, fast-track priority boarding lanes, and fully lie-flat gourmet long-haul dining comfort.
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div className="p-3 bg-blue-50/50 text-blue-800 text-[11.5px] rounded border border-blue-100 flex items-start space-x-2.5">
                      <Info className="w-4 h-4 text-[#1B4F72] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong>Baggage allowance check:</strong> Standard economy booking class on this route includes two checked bags (up to 23kg each) plus carry-on, unless booking basic economy classes. Check fare details carefully.
                      </p>
                    </div>
                  );
                })()}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <a
                    href="https://www.google.com/flights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-[#1B4F72] hover:bg-opacity-95 text-white text-xs font-extrabold uppercase tracking-widest rounded-lg shadow-sm transition-all focus:outline-none"
                  >
                    Check Availability on Google Flights
                  </a>
                  
                  <button
                    onClick={() => onNavigate('#contact')}
                    className="px-5 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-bold uppercase rounded-lg transition-colors focus:outline-none"
                  >
                    Inquire / Group Booking
                  </button>
                </div>
              </section>
            )}

            {/* Article Prose Content with In-Article Ad Placement */}
            <div className="prose prose-amber max-w-none text-neutral-800 text-sm md:text-base leading-relaxed space-y-5">
              {article.content.map((paragraph, index) => (
                <React.Fragment key={index}>
                  <p>{paragraph}</p>
                  
                  {/* Insert AdSense Zone halfway through the article */}
                  {index === 1 && (
                    <AdSenseZone type="in-content" className="my-8" />
                  )}

                  {/* Insert a mock pull quote for editorial structure in long articles */}
                  {index === 3 && article.content.length > 4 && (
                    <blockquote className="bg-gray-50 border-l-4 border-amber-500 py-4 px-6 font-serif italic text-base md:text-lg text-gray-600 rounded-r-lg my-6">
                      "Diaspora travelers represent a highly resilient corridor that is completely reshaping airline balance sheets in the post-pandemic market."
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Tags strip */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded border border-gray-200/50"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </article>

          {/* Right Column: Article Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sidebar Ad Placement */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-400 uppercase mb-3">
                Sponsor Content
              </h4>
              <AdSenseZone type="sidebar" />
            </div>

            {/* Author Profile */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-800 uppercase border-b border-gray-200 pb-2">
                About the Writer
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 bg-[#1B4F72] text-[#D4A017] rounded-full flex items-center justify-center font-serif font-extrabold border border-gray-200">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#1B4F72]">{article.author}</h5>
                    <p className="text-[10px] text-gray-400">{article.authorRole || 'Contributor Analyst'}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Specializes in logistics and commercial airlines across diaspora segments. Standardized audits and ticket testing.
                </p>
              </div>
            </div>

            {/* Secondary Ad */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs">
              <AdSenseZone type="in-content" />
            </div>

          </div>

        </div>

        {/* 3. Related Articles Section */}
        <section id="related-articles" className="mt-16 pt-10 border-t border-gray-200 space-y-6">
          <h3 className="font-serif text-xl font-bold text-neutral-900 tracking-tight">
            Related Coverage (Same Pillar)
          </h3>

          {relatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`#article/${rel.id}`)}
                  className="bg-white rounded-xl shadow-3xs hover:shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between transition-all group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-mono text-gray-400">{rel.publishedDate}</div>
                      <h4 className="font-serif font-bold text-sm text-gray-900 mt-1 line-clamp-2 group-hover:text-[#1B4F72] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4F72] flex items-center space-x-0.5 pt-2">
                      <span>Read Article</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No other articles in this category are available at this time.</p>
          )}
        </section>

        {/* 4. Newsletter Signup at bottom */}
        <NewsletterBlock />

      </div>
    </div>
  );
}
