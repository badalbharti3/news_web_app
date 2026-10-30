import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles.css';

// BASE_URL follows Vite's `base`: '/' on Netlify, '/news_web_app/' on GitHub Pages.
const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === '/' ? undefined : baseUrl.replace(/\/+$/, '');

createRoot(document.getElementById('root')).render(
  <React.StrictMode><ThemeProvider><AuthProvider><BrowserRouter basename={basename}><App /></BrowserRouter></AuthProvider></ThemeProvider></React.StrictMode>
);
