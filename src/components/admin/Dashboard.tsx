import type { Payload } from 'payload';
import Link from 'next/link';

interface DashboardProps { payload: Payload }
interface UmamiStats {
  pageviews: { value: number; prev: number };
  visitors: { value: number; prev: number };
  visits: { value: number; prev: number };
  bounces: { value: number; prev: number };
  totaltime: { value: number; prev: number };
}
interface UmamiMetric { x: string; y: number }

function formatLongDate(s: string) {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function formatShortDate(s: string) {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function fmt(n: number) { return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n); }

async function fetchUmamiStats(): Promise<UmamiStats | null> {
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const key = process.env.UMAMI_API_KEY;
  if (!id || !key) return null;
  const now = Date.now(), start = now - 30 * 24 * 60 * 60 * 1000;
  try {
    const res = await fetch(
      `https://api.umami.is/v1/websites/${id}/stats?startAt=${start}&endAt=${now}`,
      { headers: { Authorization: `Bearer ${key}` }, next: { revalidate: 3600 } },
    );
    return res.ok ? res.json() : null;
  } catch { return null; }
}

async function fetchUmamiTopPages(): Promise<UmamiMetric[] | null> {
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const key = process.env.UMAMI_API_KEY;
  if (!id || !key) return null;
  const now = Date.now(), start = now - 30 * 24 * 60 * 60 * 1000;
  try {
    const res = await fetch(
      `https://api.umami.is/v1/websites/${id}/metrics?startAt=${start}&endAt=${now}&type=url&limit=5`,
      { headers: { Authorization: `Bearer ${key}` }, next: { revalidate: 3600 } },
    );
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export default async function Dashboard({ payload }: DashboardProps) {
  const [publishedResult, recentResult, draftResult, heroGlobal, aboutGlobal, contactGlobal, umamiStats, umamiPages] =
    await Promise.all([
      payload.find({ collection: 'projects', limit: 0 }),
      payload.find({ collection: 'projects', limit: 5, sort: '-updatedAt', draft: true }),
      payload.find({ collection: 'projects', limit: 0, draft: true, where: { _status: { equals: 'draft' } } }),
      payload.findGlobal({ slug: 'hero-settings' }),
      payload.findGlobal({ slug: 'about-settings' }),
      payload.findGlobal({ slug: 'contact-settings' }),
      fetchUmamiStats(),
      fetchUmamiTopPages(),
    ]);

  const publishedCount = publishedResult.totalDocs;
  const draftCount = draftResult.totalDocs;
  const lastUpdated = recentResult.docs[0]?.updatedAt ? formatLongDate(recentResult.docs[0].updatedAt) : '—';
  const globalDates = [heroGlobal.updatedAt, aboutGlobal.updatedAt, contactGlobal.updatedAt]
    .filter((d): d is string => typeof d === 'string');
  const settingsLastUpdated = globalDates.length > 0
    ? formatShortDate(globalDates.reduce((a, b) => new Date(a) > new Date(b) ? a : b))
    : '—';
  const statusLabel = draftCount > 0 ? `${draftCount} DRAFTS PENDING` : 'ALL PUBLISHED';
  const statusDotClass = draftCount > 0 ? 'dash-dot dash-dot--warn' : 'dash-dot dash-dot--ok';

  return (
    <div className="dash-root">
      <header className="dash-header">
        <div className="dash-title-group"><h1 className="dash-heading">Dashboard</h1></div>
        <div className="dash-status"><span className={statusDotClass} /><span>{statusLabel}</span></div>
      </header>

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
          {umamiStats ? (
            <>
              <div className="dash-analytics-period">Last 30 days</div>
              <div className="dash-analytics-stats">
                <div>
                  <div className="dash-analytics-stat-value">{fmt(umamiStats.pageviews.value)}</div>
                  <div className="dash-analytics-stat-label">Pageviews</div>
                </div>
                <div>
                  <div className="dash-analytics-stat-value">{fmt(umamiStats.visitors.value)}</div>
                  <div className="dash-analytics-stat-label">Visitors</div>
                </div>
                <div>
                  <div className="dash-analytics-stat-value">{fmt(umamiStats.visits.value)}</div>
                  <div className="dash-analytics-stat-label">Visits</div>
                </div>
              </div>
              {umamiPages && umamiPages.length > 0 && (
                <>
                  <div className="dash-analytics-pages-label">Top Pages</div>
                  <div className="dash-analytics-pages">
                    {umamiPages.map((p) => (
                      <div key={p.x} className="dash-analytics-page">
                        <span className="dash-analytics-page-url">{p.x}</span>
                        <span className="dash-analytics-page-count">{fmt(p.y)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="dash-analytics-unavailable">No data available</div>
          )}
        </div>
      </div>

      <section className="dash-section">
        <p className="dash-section-label"><span className="dash-section-prefix"></span>recent projects</p>
        <div className="dash-divider" />
        <table className="dash-projects-table">
          <thead><tr><th>#</th><th>TITLE</th><th>STATUS</th><th>UPDATED</th></tr></thead>
          <tbody>
            {recentResult.docs.length === 0 ? (
              <tr><td colSpan={4} style={{ color: '#555555', fontStyle: 'italic' }}>No projects yet.</td></tr>
            ) : recentResult.docs.map((project, i) => (
              <tr key={project.id}>
                <td>{String(i + 1).padStart(2, '0')}</td>
                <td><a href={`/admin/collections/projects/${project.id}`}>{String(project.title ?? '—')}</a></td>
                <td>
                  <span className="dash-status-pill">
                    <span className={`dash-status-dot ${project._status === 'published' ? 'dash-status-dot--pub' : 'dash-status-dot--dft'}`} />
                    {project._status ?? 'unknown'}
                  </span>
                </td>
                <td>{project.updatedAt ? formatShortDate(project.updatedAt) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dash-section">
        <p className="dash-section-label"><span className="dash-section-prefix"></span>quick access</p>
        <div className="dash-action-grid">
          <Link href="/admin/collections/projects" className="dash-bracket dash-action-card">
            <div className="dash-action-top"><span className="dash-action-title">Manage Projects</span><span className="dash-action-arrow">→</span></div>
            <div className="dash-action-desc">{publishedCount} published · {draftCount} draft</div>
            <div className="dash-action-status"><span className={statusDotClass} />{statusLabel}</div>
          </Link>
          <Link href="/admin/globals/hero-settings" className="dash-bracket dash-action-card">
            <div className="dash-action-top"><span className="dash-action-title">Site Settings</span><span className="dash-action-arrow">→</span></div>
            <div className="dash-action-desc">Hero · About · Contact</div>
            <div className="dash-action-status dash-action-status--timestamp">UPDATED {settingsLastUpdated}</div>
          </Link>
        </div>
      </section>

      <footer className="dash-footer">thephilcode admin · Payload CMS 3.81</footer>
    </div>
  );
}
