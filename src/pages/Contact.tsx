/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle2, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import AdSenseZone from '../components/AdSenseZone';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pb-16 animate-fade-in" id="contact-page-content">
      <SEOHead 
        title="Contact Our Editorial Team"
        description="Get in touch with Wings & Wallet. Submit aviation news tips, qualifications pathway feedback, travel deal updates, or brand sponsorship requests."
        keywords={['contact wings and wallet', 'submit aviation news tip', 'editorial desk contacts London Brussels', 'support desk details']}
        type="website"
      />
      
      {/* Page Header */}
      <div className="bg-neutral-900 text-white py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded">
              Get in Touch
            </span>
            <h1 className="font-serif text-3.5xl md:text-4.5xl font-extrabold tracking-tight">
              Contact Wings &amp; Wallet
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Have an aviation story pitch, feedback on our travel deal aggregator, or a direct brand 
              sponsorship inquiry? Use our secure board below to drop us a line.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* AdSense Top Header */}
        <AdSenseZone type="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location cards */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1B4F72] border-b border-gray-100 pb-2">
                Office Information
              </h3>
              
              <div className="space-y-4 text-xs text-gray-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#1B4F72] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-800 font-bold">London Desk</strong>
                    <span>32 Aviation Boulevard, Clerkenwell<br />London, EC1M 5RQ</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#1B4F72] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-800 font-bold">Brussels Desk</strong>
                    <span>Rue de la Loi 120, Schaerbeek<br />1000 Brussels, Belgium</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-800 font-bold">Email</strong>
                    <span>editor@wingsandwallet.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Desk Disclaimer */}
            <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-300/30 text-xs text-neutral-800 leading-relaxed space-y-2">
              <p className="font-bold">Important Notice:</p>
              <p>
                Please note that Wings &amp; Wallet is purely a media company. We are not an airline carrier, a travel agency, or a ticketing portal. 
              </p>
              <p>
                We do not sell tickets directly and cannot assist with flight bookings, cancellations, or luggage refunds. Please contact your booking airline for active ticketing inquiries.
              </p>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-200/60 shadow-xs">
            {submitted ? (
              <div className="text-center py-16 space-y-3 animate-fade-in">
                <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B4F72]">Message Sent Successfully</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Wings &amp; Wallet. Our editorial desk or sponsorship team has received your submission and will get back to you within 24–48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-gray-100 pb-2">
                  Send a Secure Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-full-name" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Your Full Name *</label>
                    <input
                      type="text"
                      id="contact-full-name"
                      name="fullName"
                      required
                      placeholder="Amara Mensah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      placeholder="amara@diaspora.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Subject of Inquiry *</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                  >
                    <option value="general">General Feedback / Reader Inquiry</option>
                    <option value="editorial">Editorial Pitch / News Tip</option>
                    <option value="career">Aviation Career Story submission</option>
                    <option value="sponsor">Advertising / Sponsor Partnerships</option>
                    <option value="legal">GDPR / Cookie opt-out concern</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Message Content *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your inquiry in detail. We love reading tips on Europe-Africa corridor flight rates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D4A017] hover:text-black text-white text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 focus:outline-none"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
