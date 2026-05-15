import { useLocation } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext.jsx';
import styles from './TopBar.module.css';

function getPageTitle(pathname, selectedTerm) {
  if (pathname === '/') return 'Overview';
  const roeMatch = pathname.match(/\/[^/]+\/roe$/i);
  if (roeMatch) return 'ROE';
  const gaMatch = pathname.match(/\/[^/]+\/ga\/([^/]+)$/i);
  if (gaMatch) return gaMatch[1];
  return 'Dashboard';
}

export default function TopBar() {
  const { data, selectedTerm, setSelectedTerm } = useDashboard();
  const location = useLocation();
  const title = getPageTitle(location.pathname, selectedTerm);

  return (
    <div className={styles.bar}>
      <span className={styles.title}>{title}</span>
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
    </div>
  );
}
