import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FormPage from './pages/FormPage';
import NoteRisquePage from './pages/NoteRisquePage';
import HistoriquePage from './pages/HistoriquePage';
import ResultsPage from './pages/ResultsPage';
import InstallBanner from './components/InstallBanner';

// pages: 'login' | 'dashboard' | 'admin-dashboard' | 'analyze' | 'results' | 'note' | 'historique'

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem('grisk_user') || null);
  const [page, setPage] = useState(() => {
    const savedUser = sessionStorage.getItem('grisk_user');
    const savedRole = sessionStorage.getItem('grisk_role');
    if (!savedUser) return 'login';
    return savedRole === 'admin' ? 'admin-dashboard' : 'dashboard';
  });
  const [analysis, setAnalysis] = useState(null);

  function handleLogin(email, role = 'user') {
    sessionStorage.setItem('grisk_user', email);
    sessionStorage.setItem('grisk_role', role);
    setUser(email);
    setPage(role === 'admin' ? 'admin-dashboard' : 'dashboard');
  }

  function handleLogout() {
    sessionStorage.removeItem('grisk_user');
    sessionStorage.removeItem('grisk_role');
    setUser(null);
    setAnalysis(null);
    setPage('login');
  }

  function handleAnalyze(risks, formData) {
    setAnalysis({ risks, formData });
    setPage('results');
  }

  return (
    <>
      {page === 'login'           && <LoginPage onLogin={handleLogin} />}
      {page === 'admin-dashboard' && <AdminDashboardPage onLogout={handleLogout} />}
      {page === 'dashboard'       && <DashboardPage user={user} onLogout={handleLogout} onGoAnalyze={() => setPage('analyze')} onGoNote={() => setPage('note')} onGoHistory={() => setPage('historique')} />}
      {page === 'analyze'   && <FormPage user={user} onLogout={handleLogout} onAnalyze={handleAnalyze} onMenu={() => setPage('dashboard')} />}
      {page === 'results'   && <ResultsPage user={user} onLogout={handleLogout} analysis={analysis} onBack={() => setPage('analyze')} />}
      {page === 'note'      && <NoteRisquePage user={user} onLogout={handleLogout} onBack={() => setPage('dashboard')} onGoHistory={() => setPage('historique')} />}
      {page === 'historique' && <HistoriquePage user={user} onLogout={handleLogout} onBack={() => setPage('dashboard')} />}
      <InstallBanner />
    </>
  );
}

export default App;
