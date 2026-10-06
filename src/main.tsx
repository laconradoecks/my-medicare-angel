import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { isDemoForms } from './config/site';
import './styles/global.css';

// Whether the forms actually send. The prerender step reads this and fails a
// production build that would ship them in preview mode, and it ends up in
// every prerendered page, so the live HTML says which mode it is in.
document.documentElement.dataset.forms = isDemoForms ? 'preview' : 'live';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
