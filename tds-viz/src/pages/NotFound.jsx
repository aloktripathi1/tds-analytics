import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Page not found</h1>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        The route you requested doesn't exist.
      </p>
      <Link to="/" style={{ fontSize: '12px', color: 'var(--green)' }}>← Back to Overview</Link>
    </div>
  );
}
