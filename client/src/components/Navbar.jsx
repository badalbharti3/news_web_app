import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
export default function Navbar() {
  const { user, signOut } = useAuth(); const [open, setOpen] = useState(false); const navigate = useNavigate();
  const logout = async () => { await signOut(); navigate('/'); };
  return <header className="navbar"><div className="nav-inner"><Link to="/" className="brand"><span className="brand-mark"><Newspaper size={21} /></span><span>Briefly</span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button><nav className={open ? 'nav-links open' : 'nav-links'}><Link to="/" onClick={() => setOpen(false)}>Home</Link><Link to="/news" onClick={() => setOpen(false)}>More stories</Link><ThemeToggle />{user ? <button className="text-button" onClick={logout}><LogOut size={16} /> Sign out</button> : <><Link className="button button-ghost" to="/signin">Sign in</Link><Link className="button button-primary" to="/signup">Join free</Link></>}</nav></div></header>;
}
