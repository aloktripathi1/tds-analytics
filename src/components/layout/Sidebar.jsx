import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext.jsx';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { data, selectedTerm } = useDashboard();
  const [collapsed, setCollapsed] = useState(false);

  const assignments = data.assignmentsByTerm[selectedTerm] ?? [];
  const gas = assignments.filter(a => a.startsWith('GA'));
  const hasRoe = assignments.includes('ROE');

  return (
    <nav className={`${styles.nav} ${collapsed ? styles.navCollapsed : ''}`}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandTitle}>{collapsed ? 'TDS' : 'TDS Analytics'}</div>
        {!collapsed && <div className={styles.brandSub}>Tools in Data Science</div>}
      </div>

      {/* Overview */}
      <div className={styles.section}>
        {!collapsed && <span className={styles.sectionLabel}>navigation</span>}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          title={collapsed ? 'Overview' : undefined}
        >
          <span className={styles.dot} />
          {!collapsed && 'Overview'}
        </NavLink>
      </div>

      {/* GAs */}
      <div className={styles.section}>
        {!collapsed && <span className={styles.sectionLabel}>assignments</span>}
        {gas.map(ga => {
          const to = `/${selectedTerm}/ga/${ga}`;
          return (
            <NavLink
              key={ga}
              to={to}
              className={({ isActive }) => `${styles.item} ${styles.sub} ${isActive ? styles.active : ''}`}
              title={collapsed ? ga : undefined}
            >
              <span className={styles.dot} />
              {!collapsed && ga}
            </NavLink>
          );
        })}
        {hasRoe && (
          <NavLink
            to={`/${selectedTerm}/roe`}
            className={({ isActive }) => `${styles.item} ${styles.sub} ${isActive ? styles.active : ''}`}
            title={collapsed ? 'ROE' : undefined}
          >
            <span className={styles.dot} />
            {!collapsed && 'ROE'}
          </NavLink>
        )}
      </div>

      <div className={styles.section}>
        {!collapsed && <span className={styles.sectionLabel}>patterns</span>}
        <NavLink
          to="/hack"
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          title={collapsed ? 'Hack %' : undefined}
        >
          <span className={styles.dot} />
          {!collapsed && 'Hack %'}
        </NavLink>
      </div>

      {/* Collapse toggle */}
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '→' : '←'}
      </button>
    </nav>
  );
}
