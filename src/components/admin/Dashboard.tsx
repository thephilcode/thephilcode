import type { Payload } from 'payload';
import Link from 'next/link';

interface DashboardProps {
  payload: Payload;
}

export default async function Dashboard({ payload }: DashboardProps) {
  const [projectsResult, lastUpdatedResult] = await Promise.all([
    payload.find({
      collection: 'projects',
      limit: 0,
    }),
    payload.find({
      collection: 'projects',
      limit: 1,
      sort: '-updatedAt',
    }),
  ]);

  const projectCount = projectsResult.totalDocs || 0;
  const lastUpdated = lastUpdatedResult.docs[0]?.updatedAt
    ? new Date(lastUpdatedResult.docs[0].updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <div style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          color: '#C8A97E',
          fontSize: '1.5rem',
          marginBottom: '0.25rem',
        }}
      >
        {'// Dashboard'}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          color: '#F5F5F3',
          fontSize: '0.875rem',
          opacity: 0.6,
          marginBottom: '2rem',
        }}
      >
        Welcome back, Philip.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div
          style={{
            background: '#1A1A1A',
            borderLeft: '3px solid #C8A97E',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              color: '#AAAAAA',
              marginBottom: '0.5rem',
            }}
          >
            Projects Published
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: '#F5F5F3',
            }}
          >
            {projectCount}
          </div>
        </div>

        <div
          style={{
            background: '#1A1A1A',
            borderLeft: '3px solid #C8A97E',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              color: '#AAAAAA',
              marginBottom: '0.5rem',
            }}
          >
            Last Updated
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: '#F5F5F3',
            }}
          >
            {lastUpdated}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <Link
          href="/admin/collections/projects"
          className="dashboard-link-card"
        >
          Manage Projects
        </Link>

        <Link
          href="/admin/globals/hero-settings"
          className="dashboard-link-card"
        >
          Site Settings
        </Link>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          opacity: 0.3,
          textAlign: 'center',
          marginTop: 'auto',
          paddingTop: '2rem',
        }}
      >
        thephilcode admin · Payload CMS 3.81
      </div>
    </div>
  );
}
