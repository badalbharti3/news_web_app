import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const signIn = async data => { const r = await api.post('/auth/signin', data); setUser(r.data.user); return r.data.user; };
  const signUp = async data => { const r = await api.post('/auth/signup', data); setUser(r.data.user); return r.data.user; };
  const signOut = async () => {
    // Always drop the local session so the UI never sticks in a signed-in
    // state when the logout request fails (network blip, expired session).
    try { await api.post('/auth/logout'); } catch { /* session cookie is already gone or unusable */ }
    setUser(null);
  };
  return <AuthContext.Provider value={useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading])}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
