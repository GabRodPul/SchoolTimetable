import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import i18n from './i18n.ts';

i18n.on("initialized", () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Suspense fallback={"Loading..."}>
        <App />
      </Suspense>
    </React.StrictMode>,
  )  
});
