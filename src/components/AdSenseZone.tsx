/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AdSenseZoneProps {
  type: 'leaderboard' | 'sidebar' | 'in-content';
  className?: string;
}

export default function AdSenseZone({ type, className = '' }: AdSenseZoneProps) {
  // Styles based on placement type
  let dimensions = '';
  let adText = '';
  let styleClasses = '';

  switch (type) {
    case 'leaderboard':
      dimensions = '728 × 90 (Desktop Leaderboard)';
      adText = 'Primary Header Sponsor Placement — Ideal for Premium Airline partners';
      styleClasses = 'min-h-[90px] w-full max-w-4xl mx-auto py-3 px-6';
      break;
    case 'sidebar':
      dimensions = '300 × 250 (Medium Rectangle)';
      adText = 'AdSense Optimized Sidebar — Contextual Visa & Logistics ads';
      styleClasses = 'min-h-[250px] w-full max-w-[300px] p-4 mx-auto';
      break;
    case 'in-content':
      dimensions = 'Responsive Banner (In-Article)';
      adText = 'AdSense Personalized Ad — Multi-stop route discounts and booking tools';
      styleClasses = 'min-h-[120px] w-full py-4 px-6 my-6';
      break;
  }

  return (
    <div
      id={`adsense-zone-${type}`}
      className={`relative flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 text-center transition-all hover:bg-gray-100 ${styleClasses} ${className}`}
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500"></div>

      {/* Ad Label */}
      <span className="absolute top-1 left-2 text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
        Advertisement / Sponsor Zone
      </span>

      <span className="text-[10px] font-mono font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
        {dimensions}
      </span>
      <p className="mt-2 text-xs text-gray-500 leading-relaxed max-w-[260px] md:max-w-md">
        {adText}
      </p>

      {/* Mock tag for developer context */}
      <div className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-400">
        &lt;ins class="adsbygoogle" style="display:block"&gt;
      </div>
    </div>
  );
}
