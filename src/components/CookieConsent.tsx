/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (hash: string) => void;
}

export default function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('wings-wallet-cookie-consent');
    if (!consent) {
      // Small delay for natural entrance animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('wings-wallet-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('wings-wallet-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto bg-neutral-900 text-white rounded-lg shadow-2xl border border-neutral-800 p-4 md:p-6 transition-all duration-300 md:flex md:items-center md:justify-between animate-fade-in"
    >
      <div className="flex items-start space-x-4 md:max-w-2xl">
        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg mt-0.5">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-sm tracking-wide text-neutral-100">
            AdSense & Cookie Preferences
          </h4>
          <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
            Wings & Wallet uses cookies to deliver personalized advertising (via Google AdSense),
            analyze traffic patterns, and customize your experience. By clicking "Accept All",
            you consent to our collection of cookies as outlined in our{' '}
            <button
              onClick={() => {
                onNavigate('#legal/privacy');
              }}
              className="text-amber-400 underline hover:text-amber-300 transition-colors focus:outline-none"
            >
              Privacy Policy
            </button>{' '}
            and third-party partner data practices.
          </p>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex flex-shrink-0 items-center space-x-3 justify-end">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2 text-xs font-semibold text-black bg-amber-500 hover:bg-amber-400 rounded transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          Accept All
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-white p-1 rounded transition-colors hidden md:block"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
