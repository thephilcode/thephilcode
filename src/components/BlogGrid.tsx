'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface PostSummary {
  id: string | number;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  coverImage?: { url?: string; alt?: string } | null;
  tags?: Array<{ id?: string; tag: string }> | null;
  publishedAt?: string | null;
  readingMinutes: number;
}

interface Props {
  posts: PostSummary[];
}

const PAGE_SIZE = 9;

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
}

export default function BlogGrid({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="cards-grid">
        {posts.map((post, i) => (
          <div key={post.id} style={i >= visibleCount ? { display: 'none' } : undefined}>
            <div className="card" style={{ height: '100%' }}>
              {post.coverImage?.url && (
                <div className="card__thumbnail">
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="card__thumbnail-img"
                  />
                </div>
              )}
              <div>
                <p className="card__meta">
                  {formatDate(post.publishedAt)}
                  {post.publishedAt ? ' · ' : ''}
                  {post.readingMinutes} min read
                </p>
                <h2 className="card__title">
                  {post.slug ? (
                    <Link href={`/blog/${post.slug}`} className="card__title-link">
                      {post.title}
                    </Link>
                  ) : (
                    post.title
                  )}
                </h2>
              </div>
              {post.excerpt && (
                <p className="card__description">{post.excerpt}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-tags">
                  {post.tags.map((t, ti) => (
                    <span key={t.id ?? ti} className="blog-tag">{t.tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="btn btn-outline load-more-btn"
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
          >
            Load More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
