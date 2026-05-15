import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';
import s from './Layout.module.css';

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={s.shell}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={s.main}>
        <TopBar onHamburger={() => setSidebarOpen(o => !o)} />
        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
}

// Re-export layout helpers for pages
export { default as ls } from './Layout.module.css';
