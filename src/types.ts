/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PillarCategory = 'industry-news' | 'careers' | 'travel-deals' | 'aircraft-tech';

export interface DealInfo {
  route: string;
  price: string;
  airline: string;
  expiryDate: string;
  savings?: string;
  origin: string; // e.g. "United Kingdom", "Germany", "France"
  destination: string; // e.g. "Nigeria", "Ghana", "Kenya"
  bookingLink?: string;
  dealType?: 'standard' | 'student' | 'business';
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string[]; // split by paragraphs for clean layout
  category: PillarCategory;
  author: string;
  authorRole?: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  dealInfo?: DealInfo;
  featured?: boolean;
}

export type ActivePage = 
  | { type: 'home' }
  | { type: 'pillar'; category: PillarCategory }
  | { type: 'travel-hub' }
  | { type: 'article'; id: string }
  | { type: 'advertise' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'legal' };
