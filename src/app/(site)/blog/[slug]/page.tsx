import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { estimateReadingTime } from '@/lib/readingTime';

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso));
}

type LexicalNodeData = {
  type: string;
  children?: LexicalNodeData[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  fields?: { url?: string; newTab?: boolean };
  url?: string;
  [key: string]: unknown;
};

// Walks Lexical AST and returns React elements (safe, no raw HTML injection)
function LexicalNode({ node, idx }: { node: LexicalNodeData; idx: string }): React.ReactNode {
  if (!node) return null;
  const children = node.children?.map((child: LexicalNodeData, i: number) => (
    <LexicalNode key={`${idx}-${i}`} node={child} idx={`${idx}-${i}`} />
  ));

  switch (node.type) {
    case 'root':
      return <>{children}</>;
    case 'paragraph':
      return <p key={idx}>{children}</p>;
    case 'heading': {
      const level = (node.tag as string) || 'h2';
      if (level === 'h1') return <h1 key={idx}>{children}</h1>;
      if (level === 'h3') return <h3 key={idx}>{children}</h3>;
      if (level === 'h4') return <h4 key={idx}>{children}</h4>;
      return <h2 key={idx}>{children}</h2>;
    }
    case 'list':
      return node.listType === 'bullet'
        ? <ul key={idx}>{children}</ul>
        : <ol key={idx}>{children}</ol>;
    case 'listitem':
      return <li key={idx}>{children}</li>;
    case 'quote':
      return <blockquote key={idx}>{children}</blockquote>;
    case 'horizontalrule':
      return <hr key={idx} />;
    case 'linebreak':
      return <br key={idx} />;
    case 'link': {
      const url = node.fields?.url ?? node.url ?? '#';
      const newTab = node.fields?.newTab ?? false;
      return (
        <a key={idx} href={url} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    }
    case 'text': {
      let content: React.ReactNode = node.text ?? '';
      const fmt = node.format ?? 0;
      if (fmt & 1)  content = <strong>{content}</strong>;
      if (fmt & 2)  content = <em>{content}</em>;
      if (fmt & 8)  content = <code>{content}</code>;
      if (fmt & 16) content = <sub>{content}</sub>;
      if (fmt & 32) content = <sup>{content}</sup>;
      return <span key={idx}>{content}</span>;
    }
    default:
      return children ? <>{children}</> : null;
  }
}

function LexicalContent({ data }: { data: { root: LexicalNodeData } }) {
  if (!data?.root) return null;
  return <LexicalNode node={data.root} idx="root" />;
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 100,
    });

    return posts.docs
      .filter((p): p is typeof p & { slug: string } => !!p.slug)
      .map(post => ({ slug: post.slug }));
  } catch {
    // Table may not exist yet during first build before migration
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const post = result.docs[0];
  if (!post) return {};

  const coverUrl = post.coverImage && typeof post.coverImage !== 'number'
    ? (post.coverImage as { url?: string }).url
    : undefined;

  return {
    title: `${post.title} — thephilcode`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const post = result.docs[0];
  if (!post) notFound();

  const cover = post.coverImage && typeof post.coverImage !== 'number'
    ? (post.coverImage as { url?: string; alt?: string })
    : null;

  const body = (post as Record<string, unknown>).body as { root: LexicalNodeData } | undefined;
  const readingMinutes = estimateReadingTime(body);
  const tags = post.tags as Array<{ id?: string; tag: string }> | null | undefined;

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* Hero image */}
        <div className="project-hero">
          {cover?.url ? (
            <>
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                className="project-hero__img"
                priority
              />
              <div className="project-hero__overlay" />
            </>
          ) : (
            <div className="project-hero__placeholder" />
          )}
        </div>

        {/* Content */}
        <div className="container">
          <div className="project-content">
            <Link href="/blog" className="project-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>

            <p className="project-meta">
              {formatDate(post.publishedAt)}
              {post.publishedAt ? ' · ' : ''}
              {readingMinutes} min read
            </p>
            <h1 className="project-title">{post.title}</h1>

            {tags && tags.length > 0 && (
              <div className="blog-tags" style={{ marginBottom: '2rem' }}>
                {tags.map((t, i) => (
                  <span key={t.id ?? i} className="blog-tag">{t.tag}</span>
                ))}
              </div>
            )}

            {body ? (
              <div className="project-body">
                <LexicalContent data={body} />
              </div>
            ) : (
              post.excerpt && <p className="project-description">{post.excerpt}</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
