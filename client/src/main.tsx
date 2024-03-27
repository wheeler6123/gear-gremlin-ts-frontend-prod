import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

const instance = createInstance({
  urlBase: '//matomo-g6ro.onrender.com/',
  siteId: 3,
  userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: '//matomo-g6ro.onrender.com/matomo.php', // optional, default value: `${urlBase}matomo.php`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    // disableCookies: true,
    // setSecureCookie: true,
    // setRequestMethod: 'POST'
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <main>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </main>
);
