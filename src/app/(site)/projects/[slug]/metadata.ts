import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const project = result.docs[0];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const thumbnail = project.thumbnail ? (project.thumbnail as { url?: string }) : null;

  return {
    title: `${project.title} — Ayo Philip Odongo`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Ayo Philip Odongo`,
      description: project.description,
      type: 'website',
      url: `https://thephilcode.vercel.app/projects/${project.slug}`,
      images: thumbnail?.url
        ? [
            {
              url: thumbnail.url,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [
            {
              url: `https://thephilcode.vercel.app/projects/${project.slug}/opengraph-image`,
              width: 1200,
              height: 630,
            },
          ],
    },
  };
}