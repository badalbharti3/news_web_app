import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Newspaper, LogOut, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const logout = async () => { setOpen(false); await signOut(); navigate('/'); };
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Newspaper size={19} /></span>
          <span>Briefly</span>
        </Link>

        <button className="menu-button" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/news" onClick={closeMenu}>More stories</NavLink>
          <button className="icon-button" onClick={() => { closeMenu(); setSearching(true); }} aria-label="Search stories" title="Search">
            <Search size={17} />
          </button>
          <ThemeToggle />
          {user
            ? <button className="text-button" onClick={logout}><LogOut size={15} /> Sign out</button>
            : <>
                <Link className="button button-ghost" to="/signin" onClick={closeMenu}>Sign in</Link>
                <Link className="button button-primary" to="/signup" onClick={closeMenu}>Join free</Link>
              </>}
        </nav>
      </div>
      {searching && <SearchOverlay onClose={() => setSearching(false)} />}
    </header>
  );
}
