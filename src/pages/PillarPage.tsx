/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, ChevronRight, BookOpen, Newspaper, Briefcase, Flame, Wrench, Loader2 } from 'lucide-react';
import { PillarCategory } from '../types';
import { useArticles } from '../hooks/useArticles';
import AdSenseZone from '../components/AdSenseZone';
import SEOHead from '../components/SEOHead';

interface PillarPageProps {
  category: PillarCategory;
  onNavigate: (hash: string) => void;
}

export default function PillarPage({ category, onNavigate }: PillarPageProps) {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  // Filter articles belonging to this specific category
  const categoryArticles = articles.filter((a) => a.category === category);

  // Pillar metadata
  const pillarInfo = {
    'industry-news': {
      title: 'Aviation Industry News',
      description: 'Expert analysis of bilateral air service agreements (BASAs), slot allocations at major European hubs, African airline fleet expansion, and statistics on diaspora flight corridors.',
      icon: Newspaper,
      accentColor: 'text-[#1B4F72]',
      bgColor: 'bg-[#1B4F72]/5'
    },
    'careers': {
      title: 'Aviation Careers & Licenses',
      description: 'Practical guides and resources for diaspora pilots, technical crew, and aircraft maintenance engineers (Part 66) returning to grow Africa\'s regional maintenance, repair, and overhaul (MRO) centers.',
      icon: Briefcase,
      accentColor: 'text-[#1B4F72]',
      bgColor: 'bg-[#1B4F72]/5'
    },
    'travel-deals': {
      title: 'Smart Travel Deals',
      description: 'Hand-verified flight promotions, seasonal seat sales, stopover hacks, and critical details about baggage allowances (the 2-piece rule) on Africa–Europe travel routes.',
      icon: Flame,
      accentColor: 'text-amber-600',
      bgColor: 'bg-amber-500/5'
    },
    'aircraft-tech': {
      title: 'Aircraft Technology & Fleets',
      description: 'Deep dives into aircraft economics, engine diagnostics, avionics, and how extended-range narrow-bodies like the Airbus A321LR are enabling point-to-point secondary corridors.',
      icon: Wrench,
      accentColor: 'text-[#1B4F72]',
      bgColor: 'bg-[#1B4F72]/5'
    }
  }[category];

  const IconComponent = pillarInfo?.icon || BookOpen;

  return (
    <div className="pb-16 animate-fade-in" id={`pillar-page-${category}`}>
      <SEOHead 
        title={pillarInfo?.title || 'Editorial Pillar'}
        description={pillarInfo?.description || 'Wings & Wallet aviation sector analysis and flight corridor reviews.'}
        keywords={[category, 'aviation insights', 'diaspora airfares', 'Europe Africa flight routes']}
        type="website"
      />
      
      {/* Pillar Header Banner */}
      <div className={`${pillarInfo?.bgColor || 'bg-gray-50'} py-12 border-b border-gray-200/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4 max-w-4xl">
            <div className={`p-3 bg-white rounded-xl shadow-xs ${pillarInfo?.accentColor || 'text-[#1B4F72]'}`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400">
                Editorial Pillar
              </span>
              <h1 className="font-serif text-3.5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {pillarInfo?.title}
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                {pillarInfo?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="font-serif text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 uppercase tracking-wide">
              Publications in this Pillar
            </h3>

            {error ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-red-100 p-8 text-red-600">
                <p>Error loading articles. Please try again later.</p>
              </div>
            ) : categoryArticles.length > 0 ? (
              <div className="space-y-8">
                {categoryArticles.map((article, idx) => (
                  <div key={article.id} className="space-y-6">
                    {/* Inline Ad Placement before 3rd article */}
                    {idx === 2 && (
                      <div className="py-4 border-y border-gray-200/50">
                        <AdSenseZone type="in-content" />
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow group">
                      {/* Image Thumbnail */}
                      <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Snippet Detail */}
                      <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                            <span>{article.publishedDate}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                            {article.dealInfo && (
                              <>
                                <span>•</span>
                                <span className="text-amber-600 font-bold">Deal Post</span>
                              </>
                            )}
                          </div>

                          <h3 
                            onClick={() => onNavigate(`#article/${article.id}`)}
                            className="font-serif font-extrabold text-lg text-gray-900 group-hover:text-[#1B4F72] cursor-pointer transition-colors leading-snug line-clamp-2"
                          >
                            {article.title}
                          </h3>

                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Read more triggers */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-400">By {article.author}</span>
                          <button
                            onClick={() => onNavigate(`#article/${article.id}`)}
                            className="text-xs font-bold text-[#1B4F72] hover:text-[#D4A017] transition-colors flex items-center space-x-1 focus:outline-none"
                          >
                            <span>Read Article</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
                <p className="text-sm text-gray-500">
                  No articles are currently populated in this pillar. Please check back shortly for fresh editorial columns.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Sidebar Ad Placement */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-400 uppercase mb-3">
                Sponsor Placement
              </h4>
              <AdSenseZone type="sidebar" />
            </div>

            {/* Pillar guidelines card */}
            <div className="bg-[#1B4F72] text-white p-6 rounded-2xl shadow-xs border border-[#133c57]">
              <h4 className="font-serif font-bold text-base">Editorial Policy</h4>
              <p className="text-xs text-gray-200 mt-2 leading-relaxed">
                Wings &amp; Wallet upholds independent journalism. Our technical writers hold engineering certificates and air traffic backgrounds. Our travel agents verify all booking classes on flight aggregators before publishing.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
