/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldAlert, Award, FileSpreadsheet, LayoutGrid, BarChart2 } from 'lucide-react';
import AdSenseZone from '../components/AdSenseZone';
import SEOHead from '../components/SEOHead';

export default function Advertise() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setCompany('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pb-16 animate-fade-in" id="advertise-page-content">
      <SEOHead 
        title="Sponsorship & Media Kit"
        description="Advertise with Wings & Wallet. Premium contextual ad slots, leaderboard banners, and custom flight corridor sponsorships optimized for Google AdSense standards."
        keywords={['advertise on wings & wallet', 'aviation media kit', 'diaspora route sponsorships', 'AdSense optimized slots']}
        type="website"
      />
      
      {/* Page Header */}
      <div className="bg-neutral-900 text-white py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-bold bg-[#D4A017]/10 px-2.5 py-1 rounded">
              Sponsorships &amp; Media Kit
            </span>
            <h1 className="font-serif text-3.5xl md:text-4.5xl font-extrabold tracking-tight">
              Connect With the Diaspora Travelers
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Wings &amp; Wallet is a premium ad-supported publication. We offer highly targeted placements 
              to international airlines, global money transfer operators, visa logistics counselors, 
              and hospitality venues operating on Africa-Europe travel corridors.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* AdSense Top Header */}
        <AdSenseZone type="leaderboard" />

        {/* 1. Audience Metrics (With compliant placeholder states) */}
        <section id="audience-metrics" className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-extrabold text-[#1B4F72] tracking-tight">
              Audience &amp; Reach Overview
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              We uphold transparency. In accordance with publishing guidelines, all statistics below are audited placeholder ranges subject to formal regional verifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-3">
              <div className="p-2 bg-blue-50 text-[#1B4F72] rounded-lg w-max">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-gray-900">Diaspora Demographics</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Primary segments consist of West &amp; East African professionals residing in the United Kingdom, Germany, France, Belgium, and Italy travelling home 2-3 times annually.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">
                Audited segment
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg w-max">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-gray-900">Highly Targeted Corridors</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specialized focus on high-yield aviation routes such as LHR-LOS, CDG-ABJ, FRA-ACC, and BRU-FIH. Ideal for target flight promotions.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded uppercase">
                Route verified
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg w-max">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-gray-900">Diaspora Newsletter Base</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct permission-based newsletter delivery. Active members receive instant route fare alerts and logistics updates.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded uppercase">
                [Auditing in progress]
              </span>
            </div>

          </div>
        </section>

        {/* 2. Placement specs */}
        <section id="sponsorship-specs" className="space-y-6">
          <h2 className="font-serif text-2xl font-extrabold text-[#1B4F72] tracking-tight">
            Ad Placement Formats &amp; Specs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <div className="flex items-center space-x-2.5 text-[#1B4F72] font-bold text-xs uppercase font-mono tracking-wider">
                <LayoutGrid className="w-4 h-4" />
                <span>Standard Ad Placements</span>
              </div>
              
              <ul className="space-y-3.5 text-xs text-gray-600">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span><strong>Leaderboard Banner (Header):</strong></span>
                  <span className="font-mono text-gray-500">728 × 90 px</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span><strong>Medium Rectangle (Sidebar):</strong></span>
                  <span className="font-mono text-gray-500">300 × 250 px</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span><span><strong>In-Article Banner (Mid-Text):</strong></span></span>
                  <span className="font-mono text-gray-500">Responsive width</span>
                </li>
                <li className="flex justify-between">
                  <span><strong>Sponsored Review / Post:</strong></span>
                  <span className="font-mono text-gray-500">Full editorial (1,200 words)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/5 p-6 rounded-2xl border border-[#D4A017]/30 space-y-4">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase font-mono tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>AdSense Compliant Delivery</span>
              </div>
              <p className="text-xs text-neutral-800 leading-relaxed">
                All advertising slots are pre-configured to handle standard Google AdSense injection. 
                Our ad-block layout ensures fully valid tags, dynamic resizing, and GDPR compliance, 
                guaranteeing pristine rendering across all tablet, mobile, and desktop screen boundaries.
              </p>
              <p className="text-xs text-neutral-800 leading-relaxed">
                For custom direct placement campaigns, you can contact our brand sponsorship department using the inquiry board.
              </p>
            </div>

          </div>
        </section>

        {/* 3. Inquiry Form */}
        <section id="media-kit-inquiry" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-4 bg-[#1B4F72] text-white p-8 rounded-2xl flex flex-col justify-between shadow-sm space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-bold">
                Direct Desk
              </span>
              <h3 className="font-serif text-2xl font-bold mt-2">
                Brand Sponsorships
              </h3>
              <p className="text-xs text-gray-200 mt-2 leading-relaxed">
                Our advertising operations desk works with select brands to craft bespoke campaigns that genuinely provide value to diaspora aviation specialists and travelers.
              </p>
            </div>

            <div className="space-y-2 border-t border-blue-800/60 pt-4 text-xs text-gray-200">
              <p>📍 London / Brussels Offices</p>
              <p>✉ sponsor@wingsandwallet.com</p>
              <p>⏰ Response window: 24 business hours</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-200/60 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3 animate-fade-in">
                <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B4F72]">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in Wings &amp; Wallet. Our sponsorship team has received your details and will follow up with our rates sheet and editorial calendar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="advertise-form">
                <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-gray-100 pb-2">
                  Direct Sponsorship Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="advertise-email" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Contact Email *</label>
                    <input
                      type="email"
                      id="advertise-email"
                      name="email"
                      required
                      placeholder="airline@partner.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="advertise-company" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Company / Brand Name *</label>
                    <input
                      type="text"
                      id="advertise-company"
                      name="company"
                      required
                      placeholder="Global Airways Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="advertise-message" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Placement Goals &amp; Comments *</label>
                  <textarea
                    id="advertise-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="We want to run a 3-month leaderboard campaign targeting UK-Nigeria routes starting September 2026..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D4A017] hover:text-black text-white text-xs font-bold uppercase tracking-wider rounded transition-all focus:outline-none"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}
