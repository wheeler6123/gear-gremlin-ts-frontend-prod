import { Routes, Route } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import TripsPage from './pages/TripsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import './App.css';

function App() {
  const { enableLinkTracking } = useMatomo();

  enableLinkTracking();

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/trips" element={<TripsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;