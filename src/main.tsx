import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initialLang, loadDict } from './i18n';
import type { LangCode } from './i18n/languages';
import './index.css';

// Load the visitor's saved language before first paint (English is bundled; others are small chunks).
const wanted = initialLang();
loadDict(wanted)
  .then((dict) => [wanted, dict] as const)
  .catch(() => loadDict('en').then((dict) => ['en' as LangCode, dict] as const))
  .then(([lang, dict]) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App lang={lang} dict={dict} />
      </StrictMode>,
    );
  });
