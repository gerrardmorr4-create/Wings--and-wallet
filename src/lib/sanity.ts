import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'agdcogvu',
  dataset: 'production',
  apiVersion: '2026-07-13',
  useCdn: true,
});

export async function fetchArticles() {
  const query = `*[_type == "article"]{
    "id": _id,
    title,
    subtitle,
    excerpt,
    category,
    author,
    authorRole,
    publishedDate,
    readTime,
    "imageUrl": image.asset->url,
    tags,
    featured,
    content,
    dealInfo
  }`;
  return await client.fetch(query);
}
