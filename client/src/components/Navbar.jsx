import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Newspaper, LogOut, Menu, X, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const triggerRef = useRef(null);

  const logout = async () => { setOpen(false); await signOut(); navigate('/'); };
  const closeMenu = () => setOpen(false);

  const openSearch = event => {
    triggerRef.current = event.currentTarget;
    closeMenu();
    setSearching(true);
  };
  const closeSearch = () => {
    setSearching(false);
    // Hand focus back to whichever control opened the sheet (before it unmounts).
    triggerRef.current?.focus({ preventScroll: true });
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };

  // Close the mobile sheet whenever the route changes (links, back/forward).
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Mobile sheet: lock the page, close on Escape or a tap outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const onPointerDown = e => { if (!headerRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="navbar" ref={headerRef}>
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Newspaper size={19} /></span>
          <span className="brand-word">Briefly</span>
        </Link>

        <div className="nav-actions">
          <button
            className="icon-button nav-search"
            onClick={openSearch}
            aria-label="Search stories"
            aria-haspopup="dialog"
            title="Search"
          >
            <Search size={17} />
          </button>
          <button
            className="menu-button"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav id="primary-navigation" className={open ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/news" onClick={closeMenu}>More stories</NavLink>
          <button
            className="icon-button"
            onClick={openSearch}
            aria-label="Search stories"
            aria-haspopup="dialog"
            title="Search"
          >
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
      {searching && <SearchOverlay onClose={closeSearch} />}
    </header>
  );
}
