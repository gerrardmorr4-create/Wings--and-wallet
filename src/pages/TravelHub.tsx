/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Compass, Calendar, Clock, DollarSign, Filter, SlidersHorizontal, ArrowUpDown, ChevronRight, Check, Loader2, Plane, Tag, RotateCcw, Share2 } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import AdSenseZone from '../components/AdSenseZone';
import { CurrencyMode, convertString } from '../lib/currency';
import SEOHead from '../components/SEOHead';

interface TravelHubProps {
  onNavigate: (hash: string) => void;
}

export default function TravelHub({ onNavigate }: TravelHubProps) {
  const { articles, loading, error } = useArticles();

  // Extract all travel deal articles with valid dealInfo
  const deals = useMemo(() => articles.filter((a) => a.category === 'travel-deals' && a.dealInfo), [articles]);

  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<string>('all');
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<string>('all');
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedDealType, setSelectedDealType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc'>('newest');

  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>(() => {
    try {
      const saved = localStorage.getItem('wings_wallet_currency');
      return (saved as CurrencyMode) || 'original';
    } catch {
      return 'original';
    }
  });

  const handleCurrencyModeChange = (mode: CurrencyMode) => {
    setCurrencyMode(mode);
    try {
      localStorage.setItem('wings_wallet_currency', mode);
    } catch (e) {
      console.warn('Could not save currency preference', e);
    }
  };

  const [sharedDealId, setSharedDealId] = useState<string | null>(null);

  const handleShareDeal = async (deal: any) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#article/${deal.id}`;
    const shareData = {
      title: deal.title,
      text: `Check out this flight deal to ${deal.dealInfo?.destination}: ${deal.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setSharedDealId(deal.id);
        setTimeout(() => setSharedDealId(null), 2000);
        return;
      } catch (err) {
        console.warn('Web Share failed, falling back to clipboard copy', err);
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setSharedDealId(deal.id);
      setTimeout(() => setSharedDealId(null), 2000);
    } catch (err) {
      console.error('Failed to copy link to clipboard', err);
    }
  };

  // Helper to parse route airports: e.g. "London Heathrow (LHR) ⇄ Lagos (LOS)"
  const parseRouteAirports = (routeStr: string) => {
    const parts = routeStr.split('⇄');
    return {
      departure: parts[0] ? parts[0].trim() : '',
      arrival: parts[1] ? parts[1].trim() : ''
    };
  };

  // Dynamically count deals per passenger / seat tier
  const dealTypeCounts = useMemo(() => {
    const counts = { all: 0, standard: 0, student: 0, business: 0 };
    deals.forEach((d) => {
      counts.all++;
      const type = d.dealInfo?.dealType || 'standard';
      if (type === 'student') counts.student++;
      else if (type === 'business') counts.business++;
      else counts.standard++;
    });
    return counts;
  }, [deals]);

  // Dynamically extract unique origins and destinations
  const uniqueOrigins = useMemo(() => {
    const list = deals.map((d) => d.dealInfo!.origin);
    return ['all', ...Array.from(new Set(list))];
  }, [deals]);

  const uniqueDestinations = useMemo(() => {
    const list = deals.map((d) => d.dealInfo!.destination);
    return ['all', ...Array.from(new Set(list))];
  }, [deals]);

  // Dynamically extract unique airlines (handles slash-separated values like "Air Peace / Virgin Atlantic")
  const uniqueAirlines = useMemo(() => {
    const list = deals.flatMap((d) => {
      if (!d.dealInfo?.airline) return [];
      return d.dealInfo.airline.split(/[\/,]/).map((a) => a.trim());
    });
    return ['all', ...Array.from(new Set(list))];
  }, [deals]);

  // Filter selectable departures based on currently selected Country (Origin)
  const availableDepartures = useMemo(() => {
    let list = deals;
    if (selectedOrigin !== 'all') {
      list = list.filter((d) => d.dealInfo!.origin === selectedOrigin);
    }
    const airports = list.map((d) => parseRouteAirports(d.dealInfo!.route).departure).filter(Boolean);
    return ['all', ...Array.from(new Set(airports))];
  }, [deals, selectedOrigin]);

  // Filter selectable arrivals based on currently selected Country (Destination)
  const availableArrivals = useMemo(() => {
    let list = deals;
    if (selectedDestination !== 'all') {
      list = list.filter((d) => d.dealInfo!.destination === selectedDestination);
    }
    const airports = list.map((d) => parseRouteAirports(d.dealInfo!.route).arrival).filter(Boolean);
    return ['all', ...Array.from(new Set(airports))];
  }, [deals, selectedDestination]);

  // Handle dependent selections
  const handleOriginChange = (origin: string) => {
    setSelectedOrigin(origin);
    setSelectedDepartureAirport('all');
  };

  const handleDestinationChange = (dest: string) => {
    setSelectedDestination(dest);
    setSelectedArrivalAirport('all');
  };

  const handleDepartureChange = (airport: string) => {
    setSelectedDepartureAirport(airport);
    if (airport !== 'all') {
      const matchingDeal = deals.find(d => parseRouteAirports(d.dealInfo!.route).departure === airport);
      if (matchingDeal && matchingDeal.dealInfo) {
        setSelectedOrigin(matchingDeal.dealInfo.origin);
      }
    }
  };

  const handleArrivalChange = (airport: string) => {
    setSelectedArrivalAirport(airport);
    if (airport !== 'all') {
      const matchingDeal = deals.find(d => parseRouteAirports(d.dealInfo!.route).arrival === airport);
      if (matchingDeal && matchingDeal.dealInfo) {
        setSelectedDestination(matchingDeal.dealInfo.destination);
      }
    }
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedOrigin !== 'all') count++;
    if (selectedDestination !== 'all') count++;
    if (selectedDepartureAirport !== 'all') count++;
    if (selectedArrivalAirport !== 'all') count++;
    if (selectedAirline !== 'all') count++;
    if (selectedPriceRange !== 'all') count++;
    if (selectedDealType !== 'all') count++;
    return count;
  }, [selectedOrigin, selectedDestination, selectedDepartureAirport, selectedArrivalAirport, selectedAirline, selectedPriceRange, selectedDealType]);

  const clearAllFilters = () => {
    setSelectedOrigin('all');
    setSelectedDestination('all');
    setSelectedDepartureAirport('all');
    setSelectedArrivalAirport('all');
    setSelectedAirline('all');
    setSelectedPriceRange('all');
    setSelectedDealType('all');
    setSortBy('newest');
  };

  // Parse price string to number for sorting (e.g. "£495 RT" -> 495, "€540 RT" -> 540)
  const parsePrice = (priceStr: string): number => {
    const numericPart = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numericPart, 10) || 0;
  };

  // Filter and sort deals list
  const filteredDeals = useMemo(() => {
    let list = [...deals];

    if (selectedOrigin !== 'all') {
      list = list.filter((d) => d.dealInfo!.origin === selectedOrigin);
    }

    if (selectedDestination !== 'all') {
      list = list.filter((d) => d.dealInfo!.destination === selectedDestination);
    }

    if (selectedDepartureAirport !== 'all') {
      list = list.filter((d) => parseRouteAirports(d.dealInfo!.route).departure === selectedDepartureAirport);
    }

    if (selectedArrivalAirport !== 'all') {
      list = list.filter((d) => parseRouteAirports(d.dealInfo!.route).arrival === selectedArrivalAirport);
    }

    if (selectedAirline !== 'all') {
      list = list.filter((d) => {
        const dAirlines = d.dealInfo!.airline.split(/[\/,]/).map((a) => a.trim());
        return dAirlines.includes(selectedAirline);
      });
    }

    if (selectedPriceRange !== 'all') {
      list = list.filter((d) => {
        const priceNum = parsePrice(d.dealInfo!.price);
        if (selectedPriceRange === 'under-500') {
          return priceNum < 500;
        } else if (selectedPriceRange === '500-600') {
          return priceNum >= 500 && priceNum <= 600;
        } else if (selectedPriceRange === '600-1000') {
          return priceNum >= 600 && priceNum <= 1000;
        } else if (selectedPriceRange === 'over-1000') {
          return priceNum > 1000;
        }
        return true;
      });
    }

    if (selectedDealType !== 'all') {
      list = list.filter((d) => {
        const type = d.dealInfo!.dealType || 'standard';
        return type === selectedDealType;
      });
    }

    if (sortBy === 'newest') {
      // Keep natural newest published order
      list.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (sortBy === 'price-asc') {
      // Sort price ascending
      list.sort((a, b) => parsePrice(a.dealInfo!.price) - parsePrice(b.dealInfo!.price));
    }

    return list;
  }, [
    deals,
    selectedOrigin,
    selectedDestination,
    selectedDepartureAirport,
    selectedArrivalAirport,
    selectedAirline,
    selectedPriceRange,
    selectedDealType,
    sortBy
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  return (
    <div className="pb-16 animate-fade-in" id="travel-hub-content">
      <SEOHead 
        title="Verified Flight Deals Hub"
        description="Search active Europe-Africa diaspora flight deals, vetted in real-time. Discover verified baggage specifications, airline routes, and pricing for young professionals, expats, and students."
        keywords={['flights to Lagos LOS', 'flights to Accra ACC', 'flights to Nairobi NBO', 'airfare discounts London Lagos', 'Brussels to Kinshasa flight cost']}
        type="travel-hub"
      />
      
      {/* 1. Travel Hub Banner Description */}
      <div className="bg-gradient-to-r from-neutral-900 via-[#1B4F72] to-neutral-900 text-white py-16 border-b-4 border-[#D4A017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-neutral-950">
              ✈ Diaspora Fare Tracker
            </span>
            <h1 className="font-serif text-3.5xl md:text-4.5xl font-extrabold tracking-tight">
              The Africa–Europe Flight Deals Aggregator
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              We monitor airline fare buckets, consolidator networks, and empty-leg availability 
              specifically for Africa-Europe diaspora travel corridors. No fake fares, no e-commerce carts — 
              just verified direct links and baggage loophole checklists.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* AdSense Top Header */}
        <div className="mb-10">
          <AdSenseZone type="leaderboard" />
        </div>

        {/* 2. Filter Bar Controls */}
        <section className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold font-mono text-gray-500 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-[#1B4F72]" />
              <span>Diaspora Search Matrix</span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center bg-[#1B4F72]/10 text-[#1B4F72] text-[10px] font-bold px-2 py-0.5 rounded-full animate-fade-in">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center text-xs text-neutral-500 hover:text-[#1B4F72] font-bold tracking-tight transition-colors space-x-1 cursor-pointer"
                id="clear-all-btn"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-400 hover:text-[#1B4F72] transition-colors" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* First Filter Row: Corridor & Airports */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1">
              <Plane className="w-3 h-3 text-[#1B4F72]" />
              <span>1. Flight Corridors &amp; Airport Hubs</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Origin Region */}
              <div className="space-y-1.5">
                <label htmlFor="filter-origin" className="block text-xs font-bold text-gray-700">Origin Country</label>
                <select
                  id="filter-origin"
                  name="origin"
                  value={selectedOrigin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All European Origins</option>
                  {uniqueOrigins.filter((o) => o !== 'all').map((origin) => (
                    <option key={origin} value={origin}>{origin}</option>
                  ))}
                </select>
              </div>

              {/* Departure Airport */}
              <div className="space-y-1.5">
                <label htmlFor="filter-departure-airport" className="block text-xs font-bold text-gray-700">Departure Airport</label>
                <select
                  id="filter-departure-airport"
                  name="departureAirport"
                  value={selectedDepartureAirport}
                  onChange={(e) => handleDepartureChange(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All Departure Airports</option>
                  {availableDepartures.filter((d) => d !== 'all').map((airport) => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))}
                </select>
              </div>

              {/* Destination Hub */}
              <div className="space-y-1.5">
                <label htmlFor="filter-destination" className="block text-xs font-bold text-gray-700">Destination Country</label>
                <select
                  id="filter-destination"
                  name="destination"
                  value={selectedDestination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All African Destinations</option>
                  {uniqueDestinations.filter((d) => d !== 'all').map((destination) => (
                    <option key={destination} value={destination}>{destination}</option>
                  ))}
                </select>
              </div>

              {/* Arrival Airport */}
              <div className="space-y-1.5">
                <label htmlFor="filter-arrival-airport" className="block text-xs font-bold text-gray-700">Arrival Airport</label>
                <select
                  id="filter-arrival-airport"
                  name="arrivalAirport"
                  value={selectedArrivalAirport}
                  onChange={(e) => handleArrivalChange(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All Arrival Airports</option>
                  {availableArrivals.filter((a) => a !== 'all').map((airport) => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Second Filter Row: Preferences, Price, and Sorting */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#1B4F72]" />
              <span>2. Airlines &amp; Budget Parameters</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Airline Filter */}
              <div className="space-y-1.5">
                <label htmlFor="filter-airline" className="block text-xs font-bold text-gray-700">Operating Airline</label>
                <select
                  id="filter-airline"
                  name="airline"
                  value={selectedAirline}
                  onChange={(e) => setSelectedAirline(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All Operating Airlines</option>
                  {uniqueAirlines.filter((a) => a !== 'all').map((airline) => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-1.5">
                <label htmlFor="filter-price-range" className="block text-xs font-bold text-gray-700">Price Budget</label>
                <select
                  id="filter-price-range"
                  name="priceRange"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="all">All Price Ranges</option>
                  <option value="under-500">Under £/€ 500</option>
                  <option value="500-600">£/€ 500 – £/€ 600</option>
                  <option value="600-1000">£/€ 600 – £/€ 1000</option>
                  <option value="over-1000">Over £/€ 1000</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="space-y-1.5">
                <label htmlFor="filter-sort-by" className="block text-xs font-bold text-gray-700">Sort Airfares</label>
                <select
                  id="filter-sort-by"
                  name="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72] cursor-pointer"
                >
                  <option value="newest">Newest Deals Published</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Filter Tag Buttons for Price Ranges & Deal Types */}
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 items-center text-xs">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-400">Seat / Cabin Tier:</span>
              {[
                { id: 'all', label: `All Fares (${dealTypeCounts.all})` },
                { id: 'standard', label: `Standard Economy (${dealTypeCounts.standard})` },
                { id: 'student', label: `Student Discounts 🎓 (${dealTypeCounts.student})` },
                { id: 'business', label: `Business Class 💼 (${dealTypeCounts.business})` }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedDealType(item.id)}
                  className={`px-3 py-1 rounded-full border text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDealType === item.id
                      ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-xs font-bold'
                      : 'bg-neutral-50 border-gray-200 text-neutral-600 hover:bg-gray-100 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center text-xs">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-400">Quick Price Filter:</span>
              {[
                { id: 'all', label: 'All Budgets' },
                { id: 'under-500', label: 'Under 500' },
                { id: '500-600', label: '500 – 600' },
                { id: '600-1000', label: '600 – 1000' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPriceRange(item.id)}
                  className={`px-3 py-1 rounded-full border text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedPriceRange === item.id
                      ? 'bg-[#1B4F72] border-[#1B4F72] text-white shadow-xs'
                      : 'bg-neutral-50 border-gray-200 text-neutral-600 hover:bg-gray-100 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Grid representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List */}
          <div className="lg:col-span-8 space-y-6">
            
            {error ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-red-100 p-8 text-red-600">
                <p>Error loading articles. Please try again later.</p>
              </div>
            ) : filteredDeals.length > 0 ? (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-100/50 p-4 rounded-xl border border-gray-200/40 text-xs text-gray-500 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1B4F72]">Showing {filteredDeals.length} active deals</span>
                    <span>•</span>
                    <span>July 2026 update</span>
                  </div>
                  
                  {/* Currency Converter Toggle */}
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Currency:</span>
                    <div className="inline-flex bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs">
                      {(['original', 'EUR', 'USD', 'local'] as const).map((curr) => {
                        let label = '';
                        if (curr === 'original') label = 'As Posted';
                        else if (curr === 'EUR') label = 'EUR (€)';
                        else if (curr === 'USD') label = 'USD ($)';
                        else if (curr === 'local') label = 'Local (🌍)';
                        
                        return (
                          <button
                            key={curr}
                            onClick={() => handleCurrencyModeChange(curr)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                              currencyMode === curr
                                ? 'bg-[#1B4F72] text-white shadow-xs'
                                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white rounded-xl shadow-xs hover:shadow-md border border-gray-200/60 overflow-hidden flex flex-col justify-between transition-all hover:border-amber-400 group"
                    >
                      <div className="relative h-44 bg-gray-100 overflow-hidden">
                        <img
                          src={deal.imageUrl}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                          <span className="bg-amber-500 text-black text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                            {convertString(deal.dealInfo?.price, currencyMode, deal.dealInfo?.destination || '')}
                          </span>
                          {(() => {
                            const type = deal.dealInfo?.dealType || 'standard';
                            if (type === 'student') {
                              return (
                                <span className="bg-indigo-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                                  🎓 Student Deal
                                </span>
                              );
                            } else if (type === 'business') {
                              return (
                                <span className="bg-neutral-900 text-amber-400 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm border border-amber-500/30 flex items-center gap-1">
                                  💼 Business Class
                                </span>
                              );
                            }
                            return (
                              <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                                🎫 Economy Fare
                              </span>
                            );
                          })()}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center justify-between">
                          <span className="font-semibold line-clamp-1">{deal.dealInfo?.airline}</span>
                          <span className="text-amber-400 font-bold shrink-0 ml-1">Direct/Short Layover</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-bold bg-gray-100 text-[#1B4F72] px-2 py-0.5 rounded">
                            {deal.dealInfo?.origin} ⇄ {deal.dealInfo?.destination}
                          </span>
                          
                          <h4 className="font-serif font-extrabold text-base text-gray-900 leading-snug group-hover:text-[#1B4F72] transition-colors">
                            {deal.title}
                          </h4>
                          
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {deal.excerpt}
                          </p>
                        </div>

                        {/* Expiry Details */}
                        <div className="pt-3 border-t border-gray-100 space-y-3">
                          <div className="text-[10px] font-mono text-gray-400 space-y-1">
                            <div className="flex justify-between">
                              <span>Validity / Book window:</span>
                              <span className="text-neutral-700 font-medium">{deal.dealInfo?.expiryDate.split('Book')[0]}</span>
                            </div>
                            <div className="flex justify-between text-amber-600 font-bold">
                              <span>Est. Savings:</span>
                              <span>{convertString(deal.dealInfo?.savings, currencyMode, deal.dealInfo?.destination || '')}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onNavigate(`#article/${deal.id}`)}
                              className="flex-grow text-center py-2.5 bg-[#1B4F72] hover:bg-[#D4A017] hover:text-neutral-950 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 focus:outline-none cursor-pointer"
                            >
                              <span>Read Full Deal &amp; Bags Check</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleShareDeal(deal)}
                              className="p-2.5 bg-neutral-100 hover:bg-[#D4A017]/10 hover:text-[#1B4F72] text-neutral-500 rounded-lg transition-colors flex items-center justify-center focus:outline-none relative group/share cursor-pointer shrink-0"
                              title="Share Deal Link"
                            >
                              {sharedDealId === deal.id ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600 animate-scale-up" />
                                  <span className="absolute -top-8 right-0 bg-neutral-800 text-white text-[9px] font-sans px-2 py-1 rounded shadow-md whitespace-nowrap animate-fade-in">
                                    Link Copied!
                                  </span>
                                </>
                              ) : (
                                <Share2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 space-y-3">
                <Compass className="w-12 h-12 text-gray-300 mx-auto animate-pulse" />
                <h4 className="font-serif text-lg font-bold text-gray-800">No matching routes found</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  We currently do not have any published autumn deals matching your filter criteria. 
                  Try clearing the origin or destination filters to browse standard corridors.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#1B4F72] text-white hover:bg-[#D4A017] hover:text-neutral-950 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sidebar AdSense Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-400 uppercase mb-3">
                AdSense Placement
              </h4>
              <AdSenseZone type="sidebar" />
            </div>

            {/* Checklist Box */}
            <div className="bg-[#FAFAF8] p-5 rounded-2xl border border-gray-200/60 shadow-xs space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-800 uppercase border-b border-gray-200 pb-2">
                Diaspora Baggage Cheat-Sheet
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="text-emerald-500 font-bold mt-0.5"><Check className="w-3.5 h-3.5" /></div>
                  <span><strong>The 2-Piece Rule:</strong> British Airways &amp; Air Peace standard economy tickets include 2x 23kg check-in.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="text-emerald-500 font-bold mt-0.5"><Check className="w-3.5 h-3.5" /></div>
                  <span><strong>Check Transit Weight:</strong> RAM connecting legs from MXP to DSS may enforce tight 23kg ceilings per piece.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="text-emerald-500 font-bold mt-0.5"><Check className="w-3.5 h-3.5" /></div>
                  <span><strong>Overweight charges:</strong> Pre-booking extra bags online is always 50% cheaper than at the check-in counter.</span>
                </li>
              </ul>
            </div>

            {/* In-content style sidebar ad block */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs">
              <AdSenseZone type="in-content" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
