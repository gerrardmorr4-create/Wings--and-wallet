/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plane, Mail, ShieldAlert, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (hash: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 4) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t-4 border-[#1B4F72]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Statement */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#1B4F72] text-[#D4A017] p-1.5 rounded">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="font-serif text-lg font-extrabold tracking-tight text-white uppercase">
                Wings <span className="text-[#D4A017]">&amp;</span> Wallet
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Wings & Wallet is a premier, multi-pillar aviation and diaspora travel publication. 
              We focus on the critical Africa–Europe travel corridors, delivering verified flight deals, 
              aviation careers guidance, and airline industry intelligence.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com/wingsandwallet" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-full hover:bg-[#1B4F72] hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/wingsandwallet" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-full hover:bg-[#D4A017] hover:text-black transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/wingsandwallet" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-full hover:bg-[#1B4F72] hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Editorial Links */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-l-2 border-amber-500 pl-2 mb-4">
              Pillars & Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('#home')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Homepage Editorial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#pillar/industry-news')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Aviation Industry News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#pillar/careers')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Aviation Technical Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#pillar/travel-deals')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Smart Travel Deals Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#pillar/aircraft-tech')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Aircraft Technology News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#travel-hub')} className="text-amber-400 font-semibold hover:text-amber-300 transition-colors text-left focus:outline-none flex items-center space-x-1">
                  <span>✈</span> <span>Explore Travel Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Legal Links */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-l-2 border-amber-500 pl-2 mb-4">
              Wings & Wallet Media
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('#about')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Our Mission & About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#advertise')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Advertise & Media Kit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#contact')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Sponsorship / Pitches Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#legal')} className="hover:text-white transition-colors text-left focus:outline-none">
                  Privacy Policy & GDPR Terms
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#admin')} className="text-amber-500 hover:text-amber-400 font-semibold transition-colors text-left focus:outline-none">
                  ⚙ Admin Portal
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[10px] text-neutral-500 uppercase block font-bold tracking-wider">
                  Publisher Contact
                </span>
                <span className="text-[11px] text-neutral-400 block">
                  sponsor@wingsandwallet.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-l-2 border-amber-500 pl-2 mb-4">
              Diaspora Deal Tracker
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Get the best Africa–Europe flight deals, baggage loopholes, and industry intelligence direct in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@diaspora.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#1B4F72] hover:bg-opacity-95 text-white font-bold text-xs rounded transition-colors"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-amber-400 font-bold animate-pulse">
                  ✓ Successfully subscribed to diaspora alerts!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-neutral-800 my-10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-neutral-500">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-[10px] text-neutral-400">
              <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Google AdSense & Partner Content Policy Compliance Statement</span>
            </div>
            <p className="text-[10px] leading-relaxed">
              Disclaimer: Wings & Wallet is an independent news journal. We deliver informational ad-supported flight aggregator services. External flight links direct users to official global ticketing systems. Ad personalization is served dynamically by Google AdSense and is subject to your consent status. We are not a direct travel merchant or airline vendor.
            </p>
            <p className="text-[10px]">
              &copy; {new Date().getFullYear()} Wings & Wallet. All rights reserved. Registered trademark of Diaspora Aviation Publishers.
            </p>
          </div>

          <button
            onClick={handleScrollToTop}
            className="mt-6 md:mt-0 p-3 bg-neutral-800 hover:bg-[#1B4F72] hover:text-white text-neutral-400 rounded-lg transition-all flex items-center justify-center space-x-1.5 font-bold uppercase tracking-wider text-[10px] focus:outline-none"
            id="footer-back-to-top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>

        </div>

      </div>
    </footer>
  );
}
