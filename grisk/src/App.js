import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';
import InstallBanner from './components/InstallBanner';

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem('grisk_user') || null);
  const [analysis, setAnalysis] = useState(null); // { risks, formData }

  function handleLogin(email) {
    sessionStorage.setItem('grisk_user', email);
    setUser(email);
  }

  function handleLogout() {
    sessionStorage.removeItem('grisk_user');
    setUser(null);
    setAnalysis(null);
  }

  function handleAnalyze(risks, formData) {
    setAnalysis({ risks, formData });
  }

  function handleBack() {
    setAnalysis(null);
  }

  return (
    <>
      {!user && <LoginPage onLogin={handleLogin} />}
      {user && !analysis && <FormPage user={user} onLogout={handleLogout} onAnalyze={handleAnalyze} />}
      {user && analysis && <ResultsPage user={user} onLogout={handleLogout} analysis={analysis} onBack={handleBack} />}
      <InstallBanner />
    </>
  );
}

export default App;
