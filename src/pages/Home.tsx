/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, ChevronRight, Tag, PlaneTakeoff, ShieldAlert, BadgePercent, ArrowUpRight, Loader2 } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import AdSenseZone from '../components/AdSenseZone';
import NewsletterBlock from '../components/NewsletterBlock';
import SEOHead from '../components/SEOHead';

interface HomeProps {
  onNavigate: (hash: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="text-center py-20 text-red-600">
        <p>Error loading articles. Please try again later.</p>
      </div>
    );
  }

  // Extract featured/lead article
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  
  // Extract 3-4 specific flight deals for the highlight strip
  const dealHighlights = articles.filter(a => a.category === 'travel-deals' && a.dealInfo).slice(0, 4);

  // Latest articles (excluding the lead featured article)
  const latestArticles = articles.filter(a => a.id !== featuredArticle.id).slice(0, 6);

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="homepage-content">
      <SEOHead 
        title="Home: Europe-Africa Aviation & Flight Hub"
        description="Wings & Wallet provides expert aviation carrier insights and verified flight deals for the African diaspora (25-55 young professionals, families, students) in Europe."
        keywords={['cheap flights to Africa', 'European diaspora travel', 'aviation news West Africa', 'Lagos Accra Nairobi flight corridors']}
        type="website"
      />
      
      {/* 1. Header Leaderboard Ad Zone */}
      <div className="bg-gray-100/50 py-4 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AdSenseZone type="leaderboard" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Hero Section: Lead Story */}
        <section id="hero-spotlight" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Card (Large Cover) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200/60 overflow-hidden group">
            <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:h-[420px]">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#1B4F72] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                  ★ Lead Editorial
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
                  <span className="font-bold text-[#1B4F72] uppercase tracking-wider">
                    {featuredArticle.category.replace('-', ' ')}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {featuredArticle.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h1 className="font-serif text-2xl md:text-3.5xl font-extrabold text-neutral-900 tracking-tight leading-tight group-hover:text-[#1B4F72] transition-colors">
                  {featuredArticle.title}
                </h1>
                
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="block font-bold text-gray-800">{featuredArticle.author}</span>
                  <span className="block text-gray-400 text-[10px]">{featuredArticle.authorRole}</span>
                </div>
                
                <button
                  onClick={() => onNavigate(`#article/${featuredArticle.id}`)}
                  className="px-5 py-2.5 bg-[#1B4F72] hover:bg-opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#1B4F72]"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Side Column (Sponsored Content / Welcome Desk) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Editorial Focus Board */}
            <div className="bg-[#1B4F72] text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm border border-[#133c57]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-extrabold bg-amber-500/10 px-2 py-1 rounded">
                  Diaspora Desk
                </span>
                <h3 className="font-serif text-xl font-bold mt-3 leading-tight">
                  Europe–Africa Travel Corridors
                </h3>
                <p className="text-xs text-gray-200 mt-2 leading-relaxed">
                  Welcome to Wings &amp; Wallet. We track flight patterns, airline fleets, regulatory policies, and exclusive deal inventory to keep the Europe-Africa diaspora fully updated.
                </p>
              </div>
              
              <div className="space-y-2 border-t border-[#1F5F8A] pt-4">
                <div className="flex items-center justify-between text-xs text-gray-200">
                  <span>Daily Checked Corridors</span>
                  <span className="font-mono text-[#D4A017] font-bold">14 routes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-200">
                  <span>Direct Airlines Tracked</span>
                  <span className="font-mono text-[#D4A017] font-bold">9 carriers</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-200">
                  <span>Current Deal Range</span>
                  <span className="font-mono text-[#D4A017] font-bold">£420 - €675 RT</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('#about')}
                className="w-full text-center py-2.5 bg-[#D4A017] hover:bg-amber-500 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors focus:outline-none"
              >
                Learn About Our Standards
              </button>
            </div>

            {/* Sidebar AdSpot */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs flex-1 flex flex-col justify-center">
              <AdSenseZone type="sidebar" />
            </div>

          </div>
        </section>

        {/* 3. Africa–Europe Travel Deals Highlight Strip */}
        <section id="deals-strip" className="space-y-6 bg-gradient-to-br from-[#FAFAF8] to-amber-50/20 p-6 md:p-8 rounded-2xl border border-amber-200/40 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <BadgePercent className="w-4 h-4 text-[#D4A017]" />
                <span>Featured Flight Deals</span>
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-[#1B4F72] tracking-tight">
                Top Africa–Europe Corridors
              </h2>
            </div>
            
            <button
              onClick={() => onNavigate('#travel-hub')}
              className="text-xs font-bold uppercase tracking-wider text-[#1B4F72] hover:text-[#D4A017] transition-colors flex items-center space-x-1"
            >
              <span>View All {articles.filter(a => a.category === 'travel-deals' && a.dealInfo).length} Deal Posts</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal deal cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealHighlights.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-xs hover:shadow-md border border-gray-200/60 p-5 space-y-4 flex flex-col justify-between transition-all hover:border-amber-300 group"
              >
                <div>
                  {/* Badge & Savings */}
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-gray-500 uppercase tracking-wider">
                      {deal.dealInfo?.airline.split(' ')[0]}
                    </span>
                    {(() => {
                      const type = deal.dealInfo?.dealType || 'standard';
                      if (type === 'student') {
                        return (
                          <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                            🎓 Student
                          </span>
                        );
                      }
                      if (type === 'business') {
                        return (
                          <span className="bg-neutral-900 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                            💼 Business
                          </span>
                        );
                      }
                      return (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Economy
                        </span>
                      );
                    })()}
                  </div>

                  {/* Route & Price */}
                  <h4 className="font-serif font-extrabold text-base text-gray-900 mt-2 tracking-tight group-hover:text-[#1B4F72] transition-colors line-clamp-2">
                    {deal.dealInfo?.route}
                  </h4>
                  
                  <div className="mt-2 text-2xl font-extrabold text-amber-600 font-mono">
                    {deal.dealInfo?.price}
                  </div>

                  <p className="text-[11.5px] text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                    {deal.excerpt}
                  </p>
                </div>

                {/* Expiry & Action */}
                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <span className="block text-[10px] font-mono text-gray-400">
                    ⏰ {deal.dealInfo?.expiryDate.split('.')[0]}
                  </span>
                  
                  <button
                    onClick={() => onNavigate(`#article/${deal.id}`)}
                    className="w-full text-center py-2 bg-gray-50 hover:bg-[#1B4F72] hover:text-white text-gray-700 font-bold text-xs uppercase tracking-wider rounded-lg border border-gray-200 transition-all focus:outline-none"
                  >
                    See Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Main Grid: Latest Articles & Sidebar */}
        <section id="latest-editorial-feed" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List/Grid of Latest News */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="font-serif text-xl font-bold text-[#1B4F72] border-b-2 border-[#1B4F72] pb-2 uppercase tracking-wide">
              Latest Publications &amp; Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-xs hover:shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between transition-all group"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#1B4F72]/90 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {article.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h4 className="font-serif font-bold text-base text-gray-900 leading-snug group-hover:text-[#1B4F72] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate(`#article/${article.id}`)}
                      className="text-xs font-bold text-[#1B4F72] hover:text-[#D4A017] transition-colors flex items-center space-x-1 pt-2 self-start focus:outline-none"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar Ads & Newsletter Block info */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sidebar AdSense Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-400 uppercase">
                Sponsor Content
              </h4>
              <AdSenseZone type="sidebar" />
            </div>

            {/* Quick Links / Featured Tag taxonomy */}
            <div className="bg-[#FAFAF8] p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-800 uppercase border-b border-gray-200 pb-2">
                Hot Topics &amp; Hubs
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {Array.from(new Set(articles.flatMap(a => a.tags))).slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onNavigate('#travel-hub')}
                    className="text-[10.5px] font-mono bg-white hover:bg-[#1B4F72] hover:text-white transition-all text-gray-600 px-2.5 py-1.5 rounded border border-gray-200 shadow-3xs focus:outline-none"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* In-content style sidebar ad block */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs">
              <AdSenseZone type="in-content" />
            </div>

          </div>
        </section>

        {/* 5. Full-width Newsletter signup Block */}
        <NewsletterBlock />
      </div>
    </div>
  );
}
