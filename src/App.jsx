import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext.jsx';
import Shell    from './components/layout/Shell.jsx';
import Sidebar  from './components/layout/Sidebar.jsx';
import TopBar   from './components/layout/TopBar.jsx';
import Overview from './pages/Overview.jsx';
import GaPage   from './pages/GaPage.jsx';
import RoePage  from './pages/RoePage.jsx';
import AnomalyPage from './pages/AnomalyPage.jsx';
import NotFound from './pages/NotFound.jsx';
import './global.css';

function Layout({ children }) {
  return (
    <Shell
      sidebar={<Sidebar />}
      topbar={<TopBar />}
    >
      {children}
    </Shell>
  );
}

export default function App() {
  return (
    <Router>
      <DashboardProvider>
        <Layout>
          <Routes>
            <Route path="/"                      element={<Overview />} />
            <Route path="/hack"                  element={<AnomalyPage />} />
            <Route path="/anomalies"             element={<AnomalyPage />} />
            <Route path="/:term/ga/:gaId"        element={<GaPage />} />
            <Route path="/:term/roe"             element={<RoePage />} />
            <Route path="*"                      element={<NotFound />} />
          </Routes>
        </Layout>
      </DashboardProvider>
    </Router>
  );
}
