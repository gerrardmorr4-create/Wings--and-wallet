/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, BookOpen, Fingerprint, Eye, Scale } from 'lucide-react';
import AdSenseZone from '../components/AdSenseZone';
import SEOHead from '../components/SEOHead';

export default function Legal() {
  return (
    <div className="pb-16 animate-fade-in" id="legal-page-content">
      <SEOHead 
        title="Privacy Policy & Terms"
        description="Wings & Wallet publication legal terms. Information on GDPR compliance, cookie consent rules, and Google AdSense DART third-party ad delivery parameters."
        keywords={['privacy policy wings & wallet', 'GDPR consent flight hub', 'AdSense cookie policy DART', 'editorial terms of use']}
        type="website"
      />
      
      {/* Page Header */}
      <div className="bg-neutral-900 text-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-bold bg-[#D4A017]/10 px-2.5 py-1 rounded">
              Compliance Board
            </span>
            <h1 className="font-serif text-3.5xl md:text-4xl font-extrabold tracking-tight">
              Privacy Policy &amp; Terms of Use
            </h1>
            <p className="text-sm text-gray-400">
              Last updated: July 12, 2026. This document governs cookie consent, Google AdSense dynamic delivery, 
              and editorial licensing rules on Wings &amp; Wallet.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        
        {/* AdSense Top Header */}
        <AdSenseZone type="leaderboard" />

        {/* 1. Privacy Policy */}
        <section id="privacy-policy" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/60 shadow-3xs space-y-4">
          <div className="flex items-center space-x-2.5 text-[#1B4F72] border-b border-gray-100 pb-3">
            <Shield className="w-5 h-5" />
            <h2 className="font-serif text-xl font-bold">1. Privacy &amp; Data Collection Policy</h2>
          </div>

          <div className="prose prose-sm max-w-none text-neutral-700 text-xs md:text-sm leading-relaxed space-y-4">
            <p>
              At Wings &amp; Wallet, accessible from <code>wingsandwallet.com</code>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Wings &amp; Wallet and how we use it.
            </p>
            
            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">Consent</h3>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you interact with our cookie consent banner, your choices will be logged locally in your browser storage.
            </p>

            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">Google AdSense &amp; DoubleClick DART Cookies</h3>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">policies.google.com/technologies/ads</a>.
            </p>

            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">How We Use Your Information</h3>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide, operate, and maintain our website and travel deal aggregator.</li>
              <li>Improve, personalize, and expand our website content and route listings.</li>
              <li>Understand and analyze how you use our website (using non-personalized pageviews).</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you (only if you subscribe to our newsletter or send contact forms).</li>
            </ul>

            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">GDPR Data Protection Rights</h3>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>The right to access</strong> — You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> — You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> — You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data.</li>
            </ul>
          </div>
        </section>

        {/* 2. Terms of Use */}
        <section id="terms-of-use" className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/60 shadow-3xs space-y-4">
          <div className="flex items-center space-x-2.5 text-[#1B4F72] border-b border-gray-100 pb-3">
            <Scale className="w-5 h-5" />
            <h2 className="font-serif text-xl font-bold">2. Terms &amp; Conditions of Use</h2>
          </div>

          <div className="prose prose-sm max-w-none text-neutral-700 text-xs md:text-sm leading-relaxed space-y-4">
            <p>
              Welcome to Wings &amp; Wallet! These terms and conditions outline the rules and regulations for the use of Diaspora Aviation Publishers' Website.
            </p>

            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">No Travel Agent Liability</h3>
            <p>
              <strong>Wings &amp; Wallet is strictly a digital media publishing outlet. We are NOT travel agents, flight merchants, or tour operators.</strong> Any flight discount, price estimate, or promotional code published on our Travel Hub redirects users to third-party travel search engines or direct airline booking gates.
            </p>
            <p>
              We cannot issue, refund, cancel, or check tickets. We do not assume any liability for price updates, baggage losses, delays, or flight cancellations operated by partner airlines. You book entirely at your own risk.
            </p>

            <h3 className="font-bold text-gray-950 mt-4 text-sm uppercase font-mono tracking-wider">Intellectual Property Rights</h3>
            <p>
              Unless otherwise stated, Diaspora Aviation Publishers and/or its licensors own the intellectual property rights for all editorial columns, engineering guides, and custom route charts published on Wings &amp; Wallet. All intellectual property rights are reserved. 
            </p>
            <p>
              You may access this from Wings &amp; Wallet for your own personal use subjected to restrictions set in these terms and conditions. You must not:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Republish entire articles from Wings &amp; Wallet.</li>
              <li>Sell, rent or sub-license material from Wings &amp; Wallet.</li>
              <li>Reproduce, duplicate or copy technical MRO guides.</li>
              <li>Redistribute content from Wings &amp; Wallet without proper credit.</li>
            </ul>
          </div>
        </section>

        {/* AdSense In-Content spot */}
        <AdSenseZone type="in-content" />

      </div>
    </div>
  );
}
