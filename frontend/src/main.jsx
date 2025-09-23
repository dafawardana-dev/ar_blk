// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexts.jsx'; // ✅ Import AuthProvider
import App from './App.jsx';
import './App.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ AuthProvider di DALAM Router */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);