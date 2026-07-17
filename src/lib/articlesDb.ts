/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article } from '../types';
import { ARTICLES } from '../data/articles';

const CUSTOM_ARTICLES_KEY = 'custom_diaspora_articles';

export function getCustomArticles(): Article[] {
  try {
    const data = localStorage.getItem(CUSTOM_ARTICLES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse custom articles from localStorage', error);
    return [];
  }
}

export function saveCustomArticle(article: Article): void {
  try {
    const existing = getCustomArticles();
    const idx = existing.findIndex((a) => a.id === article.id);
    if (idx !== -1) {
      existing[idx] = article;
    } else {
      existing.unshift(article); // Add new ones to the top
    }
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(existing));
    // Dispatch a storage event to alert other components/hooks of change
    window.dispatchEvent(new Event('diaspora_articles_changed'));
  } catch (error) {
    console.error('Failed to save custom article', error);
  }
}

export function deleteCustomArticle(id: string): void {
  try {
    const existing = getCustomArticles();
    const filtered = existing.filter((a) => a.id !== id);
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('diaspora_articles_changed'));
  } catch (error) {
    console.error('Failed to delete custom article', error);
  }
}

export function mergeArticles(fetchedOrStatic: Article[]): Article[] {
  const custom = getCustomArticles();
  // Filter out any custom articles that might somehow duplicate a static ID
  const staticFiltered = fetchedOrStatic.filter(
    (sa) => !custom.some((ca) => ca.id === sa.id)
  );
  // Return custom articles first, then static ones, sorted by publishedDate desc
  const all = [...custom, ...staticFiltered];
  return all.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}
