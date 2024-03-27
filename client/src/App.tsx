import { Routes, Route } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import TripsPage from './pages/TripsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import './App.css';

function App() {
  const { enableLinkTracking } = useMatomo();
  var window: any;
  
  useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    (function() {
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      // eslint-disable-next-line no-non-null-assertion
      g.async=true; g.src='https://matomo-g6ro.onrender.com/js/container_29eRwnvu.js'; s.parentNode!.insertBefore(g,s);
    })();
  });


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