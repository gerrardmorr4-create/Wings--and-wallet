/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plane, Award, ShieldCheck, Compass, Briefcase } from 'lucide-react';
import AdSenseZone from '../components/AdSenseZone';
import SEOHead from '../components/SEOHead';

export default function About() {
  return (
    <div className="pb-16 animate-fade-in" id="about-page-content">
      <SEOHead 
        title="About Our Editorial Standards"
        description="Learn about Wings & Wallet's mission to publish transparent, vetted, and direct Europe-Africa aviation analysis, qualifications guides, and airfare checks for the diaspora."
        keywords={['about wings & wallet', 'aviation journal standards', 'diaspora route audit', 'flight deal verification team']}
        type="website"
      />
      
      {/* Editorial Header Cover */}
      <div className="bg-gradient-to-r from-neutral-950 via-[#1B4F72] to-neutral-900 text-white py-16 border-b-4 border-[#D4A017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-bold">
              The Wings &amp; Wallet Story
            </span>
            <h1 className="font-serif text-3.5xl md:text-4.5xl font-extrabold tracking-tight">
              Our Mission &amp; Editorial Standards
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-serif italic">
              "To empower aviation professionals and diaspora travelers with credible, practical coverage that facilitates safe, affordable, and direct connections between Europe and the African continent."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 space-y-12">
        
        {/* AdSense Top Header */}
        <AdSenseZone type="leaderboard" />

        {/* 1. Core Brand Story Column */}
        <section className="prose prose-amber max-w-none text-neutral-800 text-sm md:text-base space-y-6">
          
          <h2 className="font-serif text-2xl font-extrabold text-[#1B4F72] tracking-tight">
            Who We Are
          </h2>

          <p>
            <strong>Wings &amp; Wallet exists to give aviation professionals and diaspora travelers practical, credible coverage — industry news that matters, real career pathways, and travel deals that actually save money on Africa–Europe routes.</strong> We saw a glaring gap in the market: traditional aviation journals were overly academic, and main-stream travel aggregators were filled with clickbait, hidden fees, and irrelevant transatlantic deals. 
          </p>

          <p>
            For the millions of Africans living, working, and studying in cities like London, Paris, Brussels, Frankfurt, and Milan, flying home is not an optional leisure holiday—it is a vital, frequent, and deeply personal connection to family, culture, and business. Yet, these routes remain some of the most expensive in global civil aviation. Wings &amp; Wallet was born out of a desire to equalize this corridor through information.
          </p>

          <p>
            By combining technical aviation intelligence (fleet analysis, regulatory updates, fuel surcharges) with hard-hitting travel consumership, we ensure our readers understand the "why" behind ticket prices and know how to exploit loopholes like baggage piece concept rules, mid-week scheduling, and secondary city direct air links.
          </p>

        </section>

        {/* 2. Pillars Graphic Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-3xs space-y-3">
            <div className="p-2 bg-blue-50 text-[#1B4F72] rounded w-max">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-extrabold text-gray-900">Career Transitions</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We publish step-by-step validation guides for aircraft engineers (EASA Part 66) and flight crews looking to translate their qualifications to serve in growing African civil aviation hubs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-3xs space-y-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded w-max">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-extrabold text-gray-900">Verified Deal Checks</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every single ticket discount listed on our Travel Hub is checked in real-time by an editorial contributor. We do not use fake rates, hidden cookies, or high-pressure selling tactics.
            </p>
          </div>

        </section>

        {/* 3. Editorial Integrity Section */}
        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200/80 space-y-4">
          <div className="flex items-center space-x-2 text-[#1B4F72] font-bold text-xs uppercase font-mono tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AdSense &amp; Publisher Transparency Policy</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1B4F72]">How We Monetize</h3>
          <p className="text-xs text-neutral-800 leading-relaxed">
            Wings &amp; Wallet is a completely free, open-access content publisher. To pay our editorial contributors and maintain server operations, we serve contextually relevant advertisements through Google AdSense and accept transparent sponsor placements from verified airline partners. 
          </p>
          <p className="text-xs text-neutral-800 leading-relaxed">
            We are not travel agents, and we never upsell or mark up any airline flight tickets. Our deal links direct readers straight to official carrier sites or reliable neutral aggregators like Google Flights, protecting our audience from deceptive pricing models.
          </p>
        </section>

      </div>
    </div>
  );
}
