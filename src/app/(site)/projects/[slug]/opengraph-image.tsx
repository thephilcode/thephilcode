import { ImageResponse } from 'next/og';
import { getPayload } from 'payload';
import config from '@payload-config';

export const runtime = 'nodejs';

export async function generateImageParams(params: Promise<{ slug: string }>) {
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
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#0A0A0A',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#fff', fontSize: 48, fontFamily: 'Satoshi' }}>
            Project Not Found
          </span>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const thumbnail = project.thumbnail ? (project.thumbnail as { url?: string }) : null;

  if (thumbnail?.url) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#0A0A0A',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail.url}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.95) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 64,
              left: 64,
              right: 64,
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 48,
                fontFamily: 'Satoshi',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              {project.title}
            </span>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 48,
              right: 64,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                color: '#C8A97E',
                fontSize: 14,
                fontFamily: 'Space Grotesk',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              thephilcode.vercel.app
            </span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            border: '1px solid rgba(200,169,126,0.2)',
            borderRadius: 12,
            marginBottom: 48,
          }}
        />
        <span
          style={{
            color: '#fff',
            fontSize: 48,
            fontFamily: 'Satoshi',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {project.title}
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              color: '#C8A97E',
              fontSize: 14,
              fontFamily: 'Space Grotesk',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            thephilcode.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  return generateImageParams(params);
}