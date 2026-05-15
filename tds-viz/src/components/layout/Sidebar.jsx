import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext.jsx';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { data, selectedTerm } = useDashboard();
  const navigate = useNavigate();

  const assignments = data.assignmentsByTerm[selectedTerm] ?? [];
  const gas = assignments.filter(a => a.startsWith('GA'));
  const hasRoe = assignments.includes('ROE');

  return (
    <nav className={styles.nav}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandTitle}>TDS Analytics</div>
        <div className={styles.brandSub}>Tools in Data Science</div>
      </div>

      {/* Overview */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>navigation</span>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.dot} />
          Overview
        </NavLink>
      </div>

      {/* GAs */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>assignments</span>
        {gas.map(ga => {
          const gaId = ga.toLowerCase();
          const to = `/${selectedTerm}/ga/${ga}`;
          return (
            <NavLink
              key={ga}
              to={to}
              className={({ isActive }) => `${styles.item} ${styles.sub} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.dot} />
              {ga}
            </NavLink>
          );
        })}
        {hasRoe && (
          <NavLink
            to={`/${selectedTerm}/roe`}
            className={({ isActive }) => `${styles.item} ${styles.sub} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.dot} />
            ROE
          </NavLink>
        )}
      </div>
    </nav>
  );
}
