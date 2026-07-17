import { useState, useEffect } from 'react';
import { Article } from '../types';
import { fetchArticles } from '../lib/sanity';
import { ARTICLES } from '../data/articles';
import { mergeArticles } from '../lib/articlesDb';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    async function loadArticles() {
      try {
        const data = await fetchArticles();
        if (!active) return;
        if (data && data.length > 0) {
          setArticles(mergeArticles(data));
          setError(null);
        } else {
          console.warn('Sanity database returned empty, falling back to local ARTICLES dataset');
          setArticles(mergeArticles(ARTICLES));
          setError(null);
        }
      } catch (err) {
        if (!active) return;
        console.error('Failed to fetch from Sanity, falling back to local ARTICLES dataset:', err);
        setArticles(mergeArticles(ARTICLES));
        setError(null); // Clear error because we loaded rich local fallback data successfully
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadArticles();

    // Event listener for dynamic dashboard additions
    const handleArticlesChanged = () => {
      loadArticles();
    };

    window.addEventListener('diaspora_articles_changed', handleArticlesChanged);

    return () => {
      active = false;
      window.removeEventListener('diaspora_articles_changed', handleArticlesChanged);
    };
  }, []);

  return { articles, loading, error };
}

