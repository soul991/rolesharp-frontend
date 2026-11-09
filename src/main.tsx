import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider } from './router/RouterContext';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
