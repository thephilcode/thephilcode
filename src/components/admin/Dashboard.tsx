import type { Payload } from 'payload';
import Link from 'next/link';

interface DashboardProps {
  payload: Payload
}

function formatLongDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default async function Dashboard({ payload }: DashboardProps) {
  const [publishedResult, recentResult, draftResult, heroGlobal, aboutGlobal, contactGlobal] =
    await Promise.all([
      payload.find({ collection: 'projects', limit: 0 }),
      payload.find({ collection: 'projects', limit: 5, sort: '-updatedAt', draft: true }),
      payload.find({
        collection: 'projects',
        limit: 0,
        draft: true,
        where: { _status: { equals: 'draft' } },
      }),
      payload.findGlobal({ slug: 'hero-settings' }),
      payload.findGlobal({ slug: 'about-settings' }),
      payload.findGlobal({ slug: 'contact-settings' }),
    ])

  const publishedCount = publishedResult.totalDocs
  const draftCount = draftResult.totalDocs

  const lastUpdatedRaw = recentResult.docs[0]?.updatedAt
  const lastUpdated = lastUpdatedRaw ? formatLongDate(lastUpdatedRaw) : '—'

  const globalDates = [heroGlobal.updatedAt, aboutGlobal.updatedAt, contactGlobal.updatedAt].filter(
    (d): d is string => typeof d === 'string',
  )
  const latestGlobalDate =
    globalDates.length > 0
      ? globalDates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b))
      : null
  const settingsLastUpdated = latestGlobalDate ? formatShortDate(latestGlobalDate) : '—'

  const statusLabel = draftCount > 0 ? `${draftCount} DRAFTS PENDING` : 'ALL PUBLISHED'
  const statusDotClass = draftCount > 0 ? 'dash-dot dash-dot--warn' : 'dash-dot dash-dot--ok'

  return (
    <div className="dash-root">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-title-group">
          <h1 className="dash-heading">Dashboard</h1>
        </div>
        <div className="dash-status">
          <span className={statusDotClass} />
          <span>{statusLabel}</span>
        </div>
      </header>

      {/* Top grid: stats (left) + analytics (right) */}
      <div className="dash-top-grid">
        <div className="dash-stats-col">
          <div className="dash-bracket dash-stat-card">
            <div className="dash-card-label">PROJECTS PUBLISHED</div>
            <div className="dash-card-value">{publishedCount}</div>
          </div>
          <div className="dash-bracket dash-stat-card">
            <div className="dash-card-label">LAST UPDATED</div>
            <div className="dash-card-value dash-card-value--sm">{lastUpdated}</div>
          </div>
        </div>
        <div className="dash-bracket dash-bracket--muted dash-analytics-card">
          <div className="dash-card-label">ANALYTICS</div>
          <div className="dash-analytics-placeholder">
            <span>Phase D</span>
          </div>
        </div>
      </div>

      {/* Recent projects */}
      <section className="dash-section">
        <p className="dash-section-label">
          <span className="dash-section-prefix"></span>recent projects
        </p>
        <div className="dash-divider" />
        <table className="dash-projects-table">
          <thead>
            <tr>
              <th>#</th>
              <th>TITLE</th>
              <th>STATUS</th>
              <th>UPDATED</th>
            </tr>
          </thead>
          <tbody>
            {recentResult.docs.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: '#555555', fontStyle: 'italic' }}>
                  No projects yet.
                </td>
              </tr>
            ) : (
              recentResult.docs.map((project, i) => (
                <tr key={project.id}>
                  <td>{String(i + 1).padStart(2, '0')}</td>
                  <td>
                    <a href={`/admin/collections/projects/${project.id}`}>
                      {String(project.title ?? '—')}
                    </a>
                  </td>
                  <td>
                    <span className="dash-status-pill">
                      <span
                        className={`dash-status-dot ${
                          project._status === 'published'
                            ? 'dash-status-dot--pub'
                            : 'dash-status-dot--dft'
                        }`}
                      />
                      {project._status ?? 'unknown'}
                    </span>
                  </td>
                  <td>{project.updatedAt ? formatShortDate(project.updatedAt) : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Quick access */}
      <section className="dash-section">
        <p className="dash-section-label">
          <span className="dash-section-prefix"></span>quick access
        </p>
        <div className="dash-action-grid">
          <Link href="/admin/collections/projects" className="dash-bracket dash-action-card">
            <div className="dash-action-top">
              <span className="dash-action-title">Manage Projects</span>
              <span className="dash-action-arrow">→</span>
            </div>
            <div className="dash-action-desc">
              {publishedCount} published · {draftCount} draft
            </div>
            <div className="dash-action-status">
              <span className={statusDotClass} />
              {statusLabel}
            </div>
          </Link>
          <Link href="/admin/globals/hero-settings" className="dash-bracket dash-action-card">
            <div className="dash-action-top">
              <span className="dash-action-title">Site Settings</span>
              <span className="dash-action-arrow">→</span>
            </div>
            <div className="dash-action-desc">Hero · About · Contact</div>
            <div className="dash-action-status dash-action-status--timestamp">
              UPDATED {settingsLastUpdated}
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="dash-footer">thephilcode admin · Payload CMS 3.81</footer>
    </div>
  )
}
