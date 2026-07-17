/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, Plane, FileCheck } from 'lucide-react';
import { newsletterBackend } from '../lib/newsletterBackend';

export default function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [originHub, setOriginHub] = useState('London Heathrow / Gatwick (UK)');
  const [destinationCountry, setDestinationCountry] = useState('Nigeria');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['flash-sales', 'baggage-hacks']);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage(null);

    try {
      const result = await newsletterBackend.subscribe(email, name, {
        originHub,
        destinationCountry,
        interests: selectedInterests
      });

      if (result.success) {
        setStatus('success');
        setSuccessMessage(result.message);
      } else {
        setStatus('idle');
        setErrorMessage(result.message);
      }
    } catch (err) {
      setStatus('idle');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setOriginHub('London Heathrow / Gatwick (UK)');
    setDestinationCountry('Nigeria');
    setSelectedInterests(['flash-sales', 'baggage-hacks']);
    setStatus('idle');
    setErrorMessage(null);
  };

  return (
    <section 
      id="newsletter-signup-block"
      className="relative overflow-hidden bg-gradient-to-br from-[#123A54] to-[#1B4F72] text-white rounded-2xl shadow-xl p-8 md:p-12 my-12"
    >
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A017] opacity-10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500 opacity-5 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
 
      {/* Grid Content */}
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-2.5 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-[#D4A017] border border-amber-500/20">
            ✉ Diaspora Intelligence
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Get the Best Africa–Europe Flight Deals &amp; Logistics Hacks
          </h3>
          <p className="text-sm text-gray-200 leading-relaxed max-w-xl">
            We track fuel price cuts, baggage policy loopholes (like the 2-piece rule), 
            visa requirements, and unpublished airline promotions across direct and connecting corridors. 
            Join over 14,000+ diaspora professionals.
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Zero Spam. AdSense-compliant privacy. Unsubscribe at any time.</span>
          </div>
        </div>
 
        {/* Right Side Form */}
        <div className="lg:col-span-2.5 bg-[#FAFAF8] text-neutral-900 p-6 rounded-xl shadow-lg border border-gray-100">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B4F72]">You are on the list!</h4>
              <p className="text-xs text-gray-600 leading-relaxed px-2">
                {successMessage}
              </p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-left space-y-2 mt-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Your Travel Alerts Profile:</div>
                <div className="text-xs font-semibold text-gray-800 flex items-center space-x-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#1B4F72]" />
                  <span>{originHub} ➔ {destinationCountry}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedInterests.map(interest => (
                    <span 
                      key={interest} 
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase"
                    >
                      {interest === 'flash-sales' ? '⚡ Deal Alerts' : interest === 'baggage-hacks' ? '🧳 Luggage Hacks' : '🎓 Student Promos'}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#1B4F72] hover:underline font-bold"
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="newsletter-form">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-100 font-semibold">
                  ⚠️ {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="newsletter-first-name" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="newsletter-first-name"
                    name="firstName"
                    placeholder="Amara"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72]"
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-email" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
                    Primary Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="email"
                      id="newsletter-email"
                      name="email"
                      placeholder="amara@diaspora.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs border border-gray-300 rounded pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72]"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <div>
                  <label htmlFor="newsletter-origin" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
                    Departure Hub
                  </label>
                  <select
                    id="newsletter-origin"
                    name="originHub"
                    value={originHub}
                    onChange={(e) => setOriginHub(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    disabled={status === 'loading'}
                  >
                    <option value="London Heathrow / Gatwick (UK)">London (LHR/LGW)</option>
                    <option value="Paris Charles de Gaulle (FR)">Paris (CDG)</option>
                    <option value="Frankfurt Airport (DE)">Frankfurt (FRA)</option>
                    <option value="Amsterdam Schiphol (NL)">Amsterdam (AMS)</option>
                    <option value="Brussels Airport (BE)">Brussels (BRU)</option>
                    <option value="Other European Airport">Other Europe</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="newsletter-destination" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
                    Destination Hub
                  </label>
                  <select
                    id="newsletter-destination"
                    name="destination"
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    disabled={status === 'loading'}
                  >
                    <option value="Nigeria">Nigeria (LOS/ABV)</option>
                    <option value="Ghana">Ghana (ACC)</option>
                    <option value="Kenya">Kenya (NBO)</option>
                    <option value="Ethiopia">Ethiopia (ADD)</option>
                    <option value="Senegal">Senegal (DSS)</option>
                    <option value="Other African Destination">Other Africa</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">
                  Notification Priorities
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleInterest('flash-sales')}
                    disabled={status === 'loading'}
                    className={`flex items-center justify-between text-left px-3 py-1.5 rounded border text-xs font-medium transition-all ${
                      selectedInterests.includes('flash-sales')
                        ? 'bg-amber-50/50 border-amber-300 text-amber-900'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>⚡ Flight Price Drops &amp; Flash Sales</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedInterests.includes('flash-sales') ? 'bg-amber-500' : 'bg-transparent'}`}></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleInterest('baggage-hacks')}
                    disabled={status === 'loading'}
                    className={`flex items-center justify-between text-left px-3 py-1.5 rounded border text-xs font-medium transition-all ${
                      selectedInterests.includes('baggage-hacks')
                        ? 'bg-indigo-50/50 border-indigo-200 text-indigo-950'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>🧳 Luggage Policy &amp; Weight Loopholes</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedInterests.includes('baggage-hacks') ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleInterest('student-promos')}
                    disabled={status === 'loading'}
                    className={`flex items-center justify-between text-left px-3 py-1.5 rounded border text-xs font-medium transition-all ${
                      selectedInterests.includes('student-promos')
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>🎓 Student / Family Group Offers</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedInterests.includes('student-promos') ? 'bg-emerald-600' : 'bg-transparent'}`}></span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4F72] hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors shadow-xs flex items-center justify-center space-x-2 focus:outline-none mt-2"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Saving Preferences...</span>
                ) : (
                  <>
                    <span>Subscribe to Deal Tracker</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

