import { useLocation } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext.jsx';
import { useTheme } from '../../hooks/useTheme.js';
import styles from './TopBar.module.css';

function getPageTitle(pathname) {
  if (pathname === '/') return 'Overview';
  if (pathname === '/hack' || pathname === '/anomalies') return 'Hack %';
  const roeMatch = pathname.match(/\/[^/]+\/roe$/i);
  if (roeMatch) return 'ROE';
  const gaMatch = pathname.match(/\/[^/]+\/ga\/([^/]+)$/i);
  if (gaMatch) return gaMatch[1];
  return 'Dashboard';
}

export default function TopBar() {
  const { data, selectedTerm, setSelectedTerm } = useDashboard();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const isDark = theme === 'dark';

  return (
    <div className={styles.bar}>
      <span className={styles.title}>{title}</span>
      <div className={styles.right}>
        <div className={styles.pills}>
          {data.terms.map(term => (
            <button
              key={term}
              className={`${styles.pill} ${term === selectedTerm ? styles.active : ''}`}
              onClick={() => setSelectedTerm(term)}
            >
              {term}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggle}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            // sun icon — clicking returns to light
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // moon icon — clicking switches to dark
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
