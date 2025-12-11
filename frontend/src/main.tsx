import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Disabled MSW to use real backend API at http://localhost:3000
// async function enableMocking() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import('../mocks/msw/browser');
//     return worker.start({
//       onUnhandledRequest: 'bypass',
//     });
//   }
// }

// enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
// });
