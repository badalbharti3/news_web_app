import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const signIn = async data => { const r = await api.post('/auth/signin', data); setUser(r.data.user); return r.data.user; };
  const signUp = async data => { const r = await api.post('/auth/signup', data); setUser(r.data.user); return r.data.user; };
  const signOut = async () => { await api.post('/auth/logout'); setUser(null); };
  return <AuthContext.Provider value={useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading])}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
