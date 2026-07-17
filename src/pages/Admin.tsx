/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, LogOut, Plus, Trash2, List, Users, FileText, 
  Settings, CheckCircle2, AlertTriangle, ArrowLeft, Calendar, 
  MapPin, Mail, Tag, Image, Clock, User, Bookmark, Plane
} from 'lucide-react';
import { Article, PillarCategory, DealInfo } from '../types';
import { getCustomArticles, saveCustomArticle, deleteCustomArticle } from '../lib/articlesDb';
import { useArticles } from '../hooks/useArticles';
import { newsletterBackend, Subscriber } from '../lib/newsletterBackend';
import SEOHead from '../components/SEOHead';

// Pre-defined list of premium images that the admin can easily select, or input their own URL
const PRESET_IMAGES = [
  { label: 'Boeing Flight Deck', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800' },
  { label: 'Airport Terminal', url: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=800' },
  { label: 'Sunset Flight', url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800' },
  { label: 'Lagos Airport / Travel', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800' },
  { label: 'Nairobi Horizon', url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800' }
];

interface AdminProps {
  onNavigate: (hash: string) => void;
}

export default function Admin({ onNavigate }: AdminProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab: 'articles' | 'subscribers' | 'add-article'
  const [activeTab, setActiveTab] = useState<'articles' | 'subscribers' | 'add-article'>('articles');

  // Articles & Subscribers State
  const { articles: allArticles } = useArticles();
  const [customArticles, setCustomArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  
  // Form State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState(''); // Textarea with double newlines separating paragraphs
  const [formCategory, setFormCategory] = useState<PillarCategory>('travel-deals');
  const [formAuthor, setFormAuthor] = useState('');
  const [formAuthorRole, setFormAuthorRole] = useState('');
  const [formImageUrl, setFormImageUrl] = useState(PRESET_IMAGES[2].url);
  const [formTags, setFormTags] = useState('');
  const [formReadTime, setFormReadTime] = useState('4 min read');
  const [formFeatured, setFormFeatured] = useState(false);

  // Deal Info Toggle & Fields
  const [hasDealInfo, setHasDealInfo] = useState(false);
  const [dealRoute, setDealRoute] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [dealAirline, setDealAirline] = useState('');
  const [dealExpiry, setDealExpiry] = useState('');
  const [dealSavings, setDealSavings] = useState('');
  const [dealOrigin, setDealOrigin] = useState('United Kingdom');
  const [dealDestination, setDealDestination] = useState('Nigeria');
  const [dealBookingLink, setDealBookingLink] = useState('');
  const [dealType, setDealType] = useState<'standard' | 'student' | 'business'>('standard');

  // Form notifications
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Load backend statistics
  useEffect(() => {
    setCustomArticles(getCustomArticles());
    setSubscribers(newsletterBackend.getSubscribers());

    const handleUpdate = () => {
      setCustomArticles(getCustomArticles());
      setSubscribers(newsletterBackend.getSubscribers());
    };

    window.addEventListener('diaspora_articles_changed', handleUpdate);
    return () => window.removeEventListener('diaspora_articles_changed', handleUpdate);
  }, []);

  // Handle Admin Authorization login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for instant testing and high accessibility
    if (password === 'diaspora2026' || password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError(null);
    } else {
      setAuthError('Invalid administrator passkey. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  // Pre-fill form fields for editing
  const handleEditClick = (article: Article) => {
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormSubtitle(article.subtitle || '');
    setFormExcerpt(article.excerpt);
    setFormContent(article.content.join('\n\n'));
    setFormCategory(article.category);
    setFormAuthor(article.author);
    setFormAuthorRole(article.authorRole || '');
    setFormImageUrl(article.imageUrl);
    setFormTags(article.tags.join(', '));
    setFormReadTime(article.readTime);
    setFormFeatured(article.featured || false);

    if (article.dealInfo) {
      setHasDealInfo(true);
      setDealRoute(article.dealInfo.route);
      setDealPrice(article.dealInfo.price);
      setDealAirline(article.dealInfo.airline);
      setDealExpiry(article.dealInfo.expiryDate);
      setDealSavings(article.dealInfo.savings || '');
      setDealOrigin(article.dealInfo.origin);
      setDealDestination(article.dealInfo.destination);
      setDealBookingLink(article.dealInfo.bookingLink || '');
      setDealType(article.dealInfo.dealType || 'standard');
    } else {
      setHasDealInfo(false);
      setDealRoute('');
      setDealPrice('');
      setDealAirline('');
      setDealExpiry('');
      setDealSavings('');
      setDealOrigin('United Kingdom');
      setDealDestination('Nigeria');
      setDealBookingLink('');
      setDealType('standard');
    }

    setActiveTab('add-article');
    setFormSuccess(null);
  };

  // Delete article handler
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this custom article/deal? This action cannot be undone.')) {
      deleteCustomArticle(id);
      setFormSuccess('Article deleted successfully.');
      setTimeout(() => setFormSuccess(null), 3000);
    }
  };

  // Submit article handler
  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formTitle || !formExcerpt || !formContent || !formAuthor) {
      setFormError('Please fill out all required fields: Title, Excerpt, Content, and Author.');
      return;
    }

    // Process tag inputs
    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Process content paragraphs
    const contentParagraphs = formContent
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Assemble optional Deal Info
    let dealInfo: DealInfo | undefined = undefined;
    if (hasDealInfo) {
      if (!dealRoute || !dealPrice || !dealAirline || !dealExpiry) {
        setFormError('Please fill out all flight deal details (Route, Price, Airline, Expiry Date) if Deal Alerts are enabled.');
        return;
      }
      dealInfo = {
        route: dealRoute,
        price: dealPrice,
        airline: dealAirline,
        expiryDate: dealExpiry,
        savings: dealSavings || undefined,
        origin: dealOrigin,
        destination: dealDestination,
        bookingLink: dealBookingLink || undefined,
        dealType: dealType
      };
    }

    const targetId = editingArticleId || `custom-${Date.now()}`;
    const targetDate = editingArticleId 
      ? (customArticles.find(a => a.id === editingArticleId)?.publishedDate || new Date().toISOString().split('T')[0])
      : new Date().toISOString().split('T')[0];

    const updatedArticle: Article = {
      id: targetId,
      title: formTitle,
      subtitle: formSubtitle || undefined,
      excerpt: formExcerpt,
      content: contentParagraphs,
      category: formCategory,
      author: formAuthor,
      authorRole: formAuthorRole || undefined,
      imageUrl: formImageUrl,
      tags: tagsArray.length > 0 ? tagsArray : [formCategory, 'diaspora'],
      readTime: formReadTime,
      publishedDate: targetDate,
      featured: formFeatured,
      dealInfo: dealInfo
    };

    saveCustomArticle(updatedArticle);

    setFormSuccess(editingArticleId ? 'Article updated successfully!' : 'New Article published successfully!');
    
    // Reset Form
    setEditingArticleId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormAuthor('');
    setFormAuthorRole('');
    setFormTags('');
    setFormReadTime('4 min read');
    setFormFeatured(false);
    setHasDealInfo(false);
    setDealRoute('');
    setDealPrice('');
    setDealAirline('');
    setDealExpiry('');
    setDealSavings('');
    setDealBookingLink('');

    setTimeout(() => {
      setActiveTab('articles');
      setFormSuccess(null);
    }, 1500);
  };

  const handleResetForm = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormAuthor('');
    setFormAuthorRole('');
    setFormTags('');
    setFormReadTime('4 min read');
    setFormFeatured(false);
    setHasDealInfo(false);
    setDealRoute('');
    setDealPrice('');
    setDealAirline('');
    setDealExpiry('');
    setDealSavings('');
    setDealBookingLink('');
    setFormSuccess(null);
    setFormError(null);
  };

  return (
    <div className="pb-24 animate-fade-in bg-gray-50 min-h-screen">
      <SEOHead 
        title="Admin Portal - Editorial Board"
        description="Internal portal to manage aviation policy briefings, luggage hacks, and flight deals for the African diaspora in Europe."
        keywords={['admin board', 'flight publication admin']}
        type="website"
      />

      {/* Header Board */}
      <div className="bg-neutral-900 text-white py-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A017] font-bold bg-amber-500/10 px-2.5 py-1 rounded">
              Secure Operations Control
            </span>
            <h1 className="font-serif text-3xl font-extrabold tracking-tight">
              Aviation Editorial Console
            </h1>
            <p className="text-xs text-gray-400">
              Publish diaspora-centric articles, flight deal alerts, and review list subscribers.
            </p>
          </div>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-neutral-800 hover:bg-red-950 hover:text-red-200 border border-neutral-700 hover:border-red-900 text-xs font-semibold text-gray-300 transition-all self-start md:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Console</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!isAuthenticated ? (
          /* Login Guard Component */
          <div className="max-w-md mx-auto mt-12 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-neutral-900 p-6 text-center text-white space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#1B4F72] text-white flex items-center justify-center border border-gray-700 shadow-sm">
                <Lock className="w-5 h-5 text-[#D4A017]" />
              </div>
              <h2 className="font-serif text-lg font-bold">Admin Portal Authorization</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter your security passcode below to access the publisher dashboard.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded text-red-700 text-xs font-medium flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Security Passkey
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter passcode (e.g. diaspora2026)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72]"
                    required
                  />
                </div>
              </div>

              <div className="text-[11px] text-gray-500 bg-gray-50 border border-gray-100 p-3 rounded leading-relaxed">
                <strong className="text-gray-700">Testing credentials:</strong> Use <code className="bg-gray-200 px-1 py-0.5 rounded font-mono font-bold text-[#1B4F72]">diaspora2026</code> or <code className="bg-gray-200 px-1 py-0.5 rounded font-mono font-bold text-[#1B4F72]">admin</code> to log in instantly.
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4F72] hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Authorize Access</span>
              </button>
            </form>
          </div>
        ) : (
          /* Main Authorized Admin Dashboard */
          <div className="space-y-8">
            {/* Bento-style Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Publications</span>
                  <strong className="text-xl font-bold text-gray-800">{allArticles.length} Articles</strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-700 rounded-lg">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Custom Deals Added</span>
                  <strong className="text-xl font-bold text-gray-800">{customArticles.length} Posts</strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Registered Subscribers</span>
                  <strong className="text-xl font-bold text-gray-800">{subscribers.length} Emails</strong>
                </div>
              </div>
            </div>

            {/* Tab Controller and Content Wrapper */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('articles')}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                      activeTab === 'articles'
                        ? 'bg-[#1B4F72] text-white border-[#1B4F72]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>My Posts ({customArticles.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('subscribers')}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                      activeTab === 'subscribers'
                        ? 'bg-[#1B4F72] text-white border-[#1B4F72]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Subscribers ({subscribers.length})</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('add-article');
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 border border-amber-500 hover:border-amber-600 text-xs font-bold uppercase tracking-wider text-black transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingArticleId ? 'Editing Post' : 'Publish New Post'}</span>
                </button>
              </div>

              {/* Form Success / Error overlays */}
              {formSuccess && (
                <div className="mx-6 mt-4 p-4 bg-emerald-50 text-emerald-800 text-xs border border-emerald-100 rounded-xl font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {formError && (
                <div className="mx-6 mt-4 p-4 bg-red-50 text-red-800 text-xs border border-red-100 rounded-xl font-semibold flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Tab 1: Articles List */}
              {activeTab === 'articles' && (
                <div className="p-6">
                  {customArticles.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-sm font-bold text-gray-700">No Custom Articles Published</h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Articles and deals in the main layout are currently displaying pre-populated editorial dataset. Add your first custom post here to see it display immediately on live grids.
                      </p>
                      <button
                        onClick={() => setActiveTab('add-article')}
                        className="text-xs text-[#1B4F72] hover:underline font-bold"
                      >
                        Publish Your First Custom Post
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 text-[9px]">
                            <th className="p-4">Post Info</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Publish Date</th>
                            <th className="p-4">Deal Alert</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {customArticles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="p-4 flex items-center space-x-3">
                                <img 
                                  src={article.imageUrl} 
                                  alt={article.title} 
                                  className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0"
                                />
                                <div className="space-y-0.5">
                                  <strong className="text-gray-800 line-clamp-1">{article.title}</strong>
                                  <span className="text-[10px] text-gray-400 block">By {article.author} ({article.readTime})</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase border border-neutral-200">
                                  {article.category}
                                </span>
                              </td>
                              <td className="p-4 text-gray-500">{article.publishedDate}</td>
                              <td className="p-4">
                                {article.dealInfo ? (
                                  <span className="inline-flex items-center space-x-1 font-bold text-amber-700 bg-amber-50 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full">
                                    <Plane className="w-3 h-3" />
                                    <span>{article.dealInfo.route} ({article.dealInfo.price})</span>
                                  </span>
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </td>
                              <td className="p-4 text-right space-x-2 shrink-0">
                                <button
                                  onClick={() => handleEditClick(article)}
                                  className="px-2.5 py-1 text-[10px] uppercase font-bold text-[#1B4F72] bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-100 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(article.id)}
                                  className="px-2.5 py-1 text-[10px] uppercase font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-100 transition-colors"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Subscribers List */}
              {activeTab === 'subscribers' && (
                <div className="p-6">
                  {subscribers.length === 0 ? (
                    <div className="text-center py-12 space-y-1">
                      <p className="text-sm font-semibold text-gray-700">No Newsletter Subscribers Found</p>
                      <p className="text-xs text-gray-400">Newly registered emails from the newsletter block will automatically compile here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 text-[9px]">
                            <th className="p-4">Contact Profile</th>
                            <th className="p-4">Travel Corridor Preferences</th>
                            <th className="p-4">Notification Categories</th>
                            <th className="p-4">Subscribed At</th>
                            <th className="p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {subscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-gray-800">{sub.name || 'Anonymous User'}</div>
                                <div className="text-[10px] text-gray-400 font-mono">{sub.email}</div>
                              </td>
                              <td className="p-4 font-semibold text-gray-700">
                                <div className="flex items-center space-x-1.5">
                                  <Plane className="w-3.5 h-3.5 text-[#1B4F72] shrink-0" />
                                  <span>{sub.preferences.originHub} ➔ {sub.preferences.destinationCountry}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {sub.preferences.interests.map((interest) => (
                                    <span 
                                      key={interest}
                                      className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-indigo-50 border border-indigo-100 text-indigo-700"
                                    >
                                      {interest === 'flash-sales' ? '⚡ Deals' : interest === 'baggage-hacks' ? '🧳 Luggage' : '🎓 Student'}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-4 text-gray-500 font-mono text-[10px]">
                                {new Date(sub.subscribedAt).toLocaleString()}
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                  sub.status === 'active' 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                                    : 'bg-red-50 border-red-200 text-red-800'
                                }`}>
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Add / Edit Article Form */}
              {activeTab === 'add-article' && (
                <form onSubmit={handleArticleSubmit} className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="font-serif text-base font-bold text-[#1B4F72] flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-amber-600" />
                      <span>{editingArticleId ? 'Modify Custom Publication' : 'Write New Diaspora Briefing'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('articles')}
                      className="text-xs text-gray-500 hover:text-gray-800 flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column: Main Fields */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="article-title" className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                          Article Title *
                        </label>
                        <input
                          id="article-title"
                          type="text"
                          placeholder="e.g. Royal Air Maroc luggage allowances for summer 2026 diaspora travels"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#1B4F72] focus:border-[#1B4F72]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="article-subtitle" className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                          Subtitle (Optional)
                        </label>
                        <input
                          id="article-subtitle"
                          type="text"
                          placeholder="e.g. Navigating extra baggage weight fees, check-in loopholes, and cabin policies"
                          value={formSubtitle}
                          onChange={(e) => setFormSubtitle(e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="article-excerpt" className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                          Short Summary / Excerpt *
                        </label>
                        <textarea
                          id="article-excerpt"
                          rows={2}
                          placeholder="A quick summary showing in lists and card grids to engage travelers."
                          value={formExcerpt}
                          onChange={(e) => setFormExcerpt(e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="article-content" className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider flex justify-between">
                          <span>Article Content (Write each paragraph on a new line) *</span>
                          <span className="text-gray-400 font-normal capitalize">HTML elements are safely sanitized</span>
                        </label>
                        <textarea
                          id="article-content"
                          rows={8}
                          placeholder="Write the body paragraphs of your article here. Break paragraphs with line breaks to ensure clean layouts."
                          value={formContent}
                          onChange={(e) => setFormContent(e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#1B4F72]"
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column: Metadata Panels */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 space-y-3">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 border-b border-gray-200 pb-1.5 flex items-center space-x-1">
                          <Settings className="w-3.5 h-3.5 text-[#1B4F72]" />
                          <span>Publication Settings</span>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-category" className="block text-[10px] uppercase font-bold text-gray-500">
                            Pillar Category *
                          </label>
                          <select
                            id="article-category"
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value as PillarCategory)}
                            className="w-full text-xs border border-gray-300 rounded p-2 bg-white focus:outline-none focus:ring-1"
                          >
                            <option value="travel-deals">✈ Travel Deals</option>
                            <option value="industry-news">📰 Industry News</option>
                            <option value="careers">🎓 Careers &amp; Pathways</option>
                            <option value="aircraft-tech">⚙ Aircraft &amp; Aviation Tech</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-author" className="block text-[10px] uppercase font-bold text-gray-500">
                            Author Name *
                          </label>
                          <input
                            id="article-author"
                            type="text"
                            placeholder="Captain Amara"
                            value={formAuthor}
                            onChange={(e) => setFormAuthor(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-role" className="block text-[10px] uppercase font-bold text-gray-500">
                            Author Role / Title
                          </label>
                          <input
                            id="article-role"
                            type="text"
                            placeholder="Senior Corridor Analyst"
                            value={formAuthorRole}
                            onChange={(e) => setFormAuthorRole(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-readtime" className="block text-[10px] uppercase font-bold text-gray-500">
                            Read Time estimate
                          </label>
                          <input
                            id="article-readtime"
                            type="text"
                            placeholder="4 min read"
                            value={formReadTime}
                            onChange={(e) => setFormReadTime(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-tags" className="block text-[10px] uppercase font-bold text-gray-500">
                            Tags (Comma separated)
                          </label>
                          <input
                            id="article-tags"
                            type="text"
                            placeholder="luggage-hacks, nigeria, Royal Air Maroc"
                            value={formTags}
                            onChange={(e) => setFormTags(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <input
                            id="article-featured"
                            type="checkbox"
                            checked={formFeatured}
                            onChange={(e) => setFormFeatured(e.target.checked)}
                            className="h-4 w-4 rounded text-[#1B4F72] border-gray-300 focus:ring-[#1B4F72]"
                          />
                          <label htmlFor="article-featured" className="text-xs font-semibold text-gray-700 select-none">
                            Feature this article on top grids
                          </label>
                        </div>
                      </div>

                      {/* Image selector presets */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 space-y-3">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center space-x-1">
                          <Image className="w-3.5 h-3.5 text-amber-600" />
                          <span>Cover Image Presets</span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                          {PRESET_IMAGES.map((img) => (
                            <button
                              key={img.label}
                              type="button"
                              title={img.label}
                              onClick={() => setFormImageUrl(img.url)}
                              className={`aspect-square rounded border overflow-hidden transition-all relative shrink-0 ${
                                formImageUrl === img.url ? 'ring-2 ring-[#1B4F72] border-transparent' : 'border-gray-200 hover:opacity-80'
                              }`}
                            >
                              <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="article-imageurl" className="block text-[10px] uppercase font-bold text-gray-500">
                            Or custom Image URL
                          </label>
                          <input
                            id="article-imageurl"
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={formImageUrl}
                            onChange={(e) => setFormImageUrl(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded p-2 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attachment Section: Flight Deal Info */}
                  <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-300/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-bold text-[#1B4F72] flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-amber-600" />
                          <span>Attach Interactive Flight Deal Data</span>
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Enable this section to append an interactive flight deal calculator, live booking alert, and target prices to this post.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setHasDealInfo(!hasDealInfo)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            hasDealInfo ? 'bg-amber-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                              hasDealInfo ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {hasDealInfo && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                        <div className="space-y-1">
                          <label htmlFor="deal-route" className="block text-[10px] uppercase font-bold text-amber-800">
                            Route (e.g. LHR - LOS) *
                          </label>
                          <input
                            id="deal-route"
                            type="text"
                            placeholder="London Heathrow - Lagos"
                            value={dealRoute}
                            onChange={(e) => setDealRoute(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required={hasDealInfo}
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-price" className="block text-[10px] uppercase font-bold text-amber-800">
                            Target Deal Price *
                          </label>
                          <input
                            id="deal-price"
                            type="text"
                            placeholder="£520"
                            value={dealPrice}
                            onChange={(e) => setDealPrice(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required={hasDealInfo}
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-airline" className="block text-[10px] uppercase font-bold text-amber-800">
                            Airline Operator *
                          </label>
                          <input
                            id="deal-airline"
                            type="text"
                            placeholder="Royal Air Maroc / Qatar"
                            value={dealAirline}
                            onChange={(e) => setDealAirline(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required={hasDealInfo}
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-expiry" className="block text-[10px] uppercase font-bold text-amber-800">
                            Deal Expiry Date *
                          </label>
                          <input
                            id="deal-expiry"
                            type="date"
                            value={dealExpiry}
                            onChange={(e) => setDealExpiry(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required={hasDealInfo}
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-savings" className="block text-[10px] uppercase font-bold text-amber-800">
                            Est. Savings (optional)
                          </label>
                          <input
                            id="deal-savings"
                            type="text"
                            placeholder="Save £150"
                            value={dealSavings}
                            onChange={(e) => setDealSavings(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-origin" className="block text-[10px] uppercase font-bold text-amber-800">
                            Departure Country
                          </label>
                          <select
                            id="deal-origin"
                            value={dealOrigin}
                            onChange={(e) => setDealOrigin(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none"
                          >
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Netherlands">Netherlands</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-destination" className="block text-[10px] uppercase font-bold text-amber-800">
                            African Destination Country
                          </label>
                          <select
                            id="deal-destination"
                            value={dealDestination}
                            onChange={(e) => setDealDestination(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none"
                          >
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Senegal">Senegal</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="deal-type" className="block text-[10px] uppercase font-bold text-amber-800">
                            Deal Category Tier
                          </label>
                          <select
                            id="deal-type"
                            value={dealType}
                            onChange={(e) => setDealType(e.target.value as 'standard' | 'student' | 'business')}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none"
                          >
                            <option value="standard">Standard Diaspora Economy</option>
                            <option value="student">Student / Baggage Bonus</option>
                            <option value="business">Premium Business Upgrade</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label htmlFor="deal-booking" className="block text-[10px] uppercase font-bold text-amber-800">
                            Booking Link (optional - defaults to custom inquiry)
                          </label>
                          <input
                            id="deal-booking"
                            type="url"
                            placeholder="https://www.google.com/flights?..."
                            value={dealBookingLink}
                            onChange={(e) => setDealBookingLink(e.target.value)}
                            className="w-full text-xs border border-amber-300/40 rounded p-2 bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submission Row */}
                  <div className="flex items-center justify-end space-x-3 border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      Clear Fields
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded bg-[#1B4F72] hover:bg-[#153E5B] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingArticleId ? 'Update Publication' : 'Publish to Grids'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
