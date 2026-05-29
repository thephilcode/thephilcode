import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogGrid, { type PostSummary } from '@/components/BlogGrid';
import { estimateReadingTime } from '@/lib/readingTime';

export const metadata: Metadata = {
  title: 'Blog — thephilcode',
  description: 'Developer insights, project breakdowns, and technical writing by Philip Ayo.',
};

export default async function BlogPage() {
  const payload = await getPayload({ config });

  const summaries: PostSummary[] = [];

  try {
    const { docs: posts } = await payload.find({
      collection: 'posts',
      limit: 200,
      sort: '-publishedAt',
      depth: 1,
      where: { _status: { equals: 'published' } },
    });

    const sorted = [
      ...posts.filter(p => p.featured),
      ...posts.filter(p => !p.featured),
    ];

    for (const post of sorted) {
      const cover = post.coverImage && typeof post.coverImage !== 'number'
        ? (post.coverImage as { url?: string; alt?: string })
        : null;
      summaries.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: cover,
        tags: post.tags as PostSummary['tags'],
        publishedAt: post.publishedAt,
        readingMinutes: estimateReadingTime((post as Record<string, unknown>).body),
      });
    }
  } catch {
    // Table may not exist yet during first build before migration
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container">
          <header className="projects-page-head">
            <p className="section-label">Blog</p>
            <div className="divider" />
            <h1 className="projects-page-title">All Posts</h1>
            <p className="projects-page-count">{summaries.length} post{summaries.length !== 1 ? 's' : ''}</p>
          </header>

          <BlogGrid posts={summaries} />
        </div>
      </main>
      <Footer />
    </>
  );
}
