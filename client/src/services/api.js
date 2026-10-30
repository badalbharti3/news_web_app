import axios from 'axios';

// VITE_API_BASE_URL wins when set (see client/.env.example). Otherwise the dev
// server talks to a local backend and production builds fall back to the
// deployed API, so neither mode silently points at the wrong host.
const baseURL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://briefly-newsapp.onrender.com/api');

const api = axios.create({ baseURL, withCredentials: true });
export default api;
