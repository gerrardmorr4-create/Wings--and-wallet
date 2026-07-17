/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Plane, Newspaper, Briefcase, Flame, Wrench, Compass, Globe, Loader2 } from 'lucide-react';
import { PillarCategory, Article } from '../types';
import { useArticles } from '../hooks/useArticles';

interface HeaderProps {
  currentPage: string;
  onNavigate: (hash: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const { articles, loading } = useArticles();

  // Filter articles in real-time
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.tags.some((tag) => tag.toLowerCase().includes(q))
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, articles]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pillars = [
    { name: 'Industry News', path: '#pillar/industry-news', category: 'industry-news', icon: Newspaper },
    { name: 'Careers', path: '#pillar/careers', category: 'careers', icon: Briefcase },
    { name: 'Travel Deals', path: '#pillar/travel-deals', category: 'travel-deals', icon: Flame },
    { name: 'Aircraft Technology', path: '#pillar/aircraft-tech', category: 'aircraft-tech', icon: Wrench },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF8] border-b border-gray-200/80 shadow-xs backdrop-blur-xs">
      {/* Top Bar for Diaspora Corridors Alert / Branding Accent */}
      <div className="bg-[#1B4F72] text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center space-x-2">
        <Globe className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
        <span>Wings & Wallet — Connecting the Africa-Europe Diaspora with Premium Travel Intel & Deals</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Section */}
          <button 
            onClick={() => handleLinkClick('#home')} 
            className="flex items-center space-x-3 text-left focus:outline-none group"
            id="logo-button"
          >
            <div className="bg-[#1B4F72] text-[#D4A017] p-2.5 rounded-lg shadow-inner group-hover:scale-105 transition-transform duration-200">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-[#1B4F72] uppercase">
                Wings <span className="text-[#D4A017]">&amp;</span> Wallet
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-gray-500 font-bold">
                Aviation &amp; Diaspora Travel Journal
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
            {pillars.map((pillar) => {
              const isActive = currentPage === `pillar/${pillar.category}`;
              return (
                <button
                  key={pillar.category}
                  onClick={() => handleLinkClick(pillar.path)}
                  className={`px-4 py-2 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                    isActive
                      ? 'border-[#D4A017] text-[#1B4F72]'
                      : 'border-transparent text-gray-700 hover:text-[#1B4F72] hover:border-gray-300'
                  }`}
                >
                  {pillar.name}
                </button>
              );
            })}
            
            <button
              onClick={() => handleLinkClick('#travel-hub')}
              className={`ml-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all shadow-xs flex items-center space-x-1.5 ${
                currentPage === 'travel-hub'
                  ? 'bg-[#D4A017] text-neutral-900 font-extrabold'
                  : 'bg-[#1B4F72] text-white hover:bg-opacity-90'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Travel Hub</span>
            </button>
          </nav>

          {/* Right Action Icons: Search & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            
            {/* Search Box Trigger */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-[#1B4F72] hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                aria-label="Search articles"
                id="search-trigger"
              >
                <Search className="w-5.5 h-5.5" />
              </button>

              {/* Search Modal Overlay Dropdown */}
              {isSearchOpen && (
                <div 
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-fade-in"
                  id="search-dropdown"
                >
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search news, careers or flight deals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none text-sm text-gray-900 focus:outline-none"
                      autoFocus
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-gray-400 hover:text-gray-600 font-bold px-1.5"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Dropdown search results */}
                  <div className="max-h-80 overflow-y-auto">
                    {searchQuery.trim().length <= 1 ? (
                      <div className="p-4 text-center text-xs text-gray-500">
                        Type at least 2 characters to search. Try "Lagos", "Air Peace", "EASA", or "A321"
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {searchResults.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => handleLinkClick(`#article/${article.id}`)}
                            className="w-full text-left p-3 hover:bg-amber-50/50 transition-colors block focus:outline-none"
                          >
                            <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {article.category.replace('-', ' ')}
                            </span>
                            <h5 className="font-semibold text-xs text-gray-900 mt-1 line-clamp-1">
                              {article.title}
                            </h5>
                            <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                              {article.excerpt}
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-gray-500">
                        No articles found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#1B4F72] hover:bg-gray-100 rounded-lg lg:hidden transition-all focus:outline-none"
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg animate-slide-down absolute left-0 right-0 z-35" id="mobile-drawer">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 px-3 font-bold mb-1">
              Editorial Pillars
            </p>
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <button
                  key={pillar.category}
                  onClick={() => handleLinkClick(pillar.path)}
                  className="w-full text-left px-4 py-3 rounded-md text-sm font-semibold text-gray-800 hover:bg-amber-50 hover:text-[#1B4F72] flex items-center space-x-3 transition-all focus:outline-none"
                >
                  <IconComp className="w-4 h-4 text-gray-500" />
                  <span>{pillar.name}</span>
                </button>
              );
            })}
            
            <div className="border-t border-gray-100 my-3 pt-3">
              <button
                onClick={() => handleLinkClick('#travel-hub')}
                className="w-full text-center py-3 px-4 bg-[#1B4F72] text-white rounded-md text-sm font-bold uppercase tracking-widest shadow-sm hover:bg-opacity-95 transition-all flex items-center justify-center space-x-2 focus:outline-none"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore Travel Hub</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
