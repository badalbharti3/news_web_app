import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

// Glass search overlay: filters the headline feed client-side by keyword.
export default function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const closeRef = useRef(onClose);
  const [term, setTerm] = useState('');
  closeRef.current = onClose;

  // Focus the field once, then keep the page still while the sheet is open.
  useEffect(() => {
    inputRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') closeRef.current(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const submit = e => {
    e.preventDefault();
    const query = term.trim();
    onClose();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search stories" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="search-panel" onSubmit={submit}>
        <label className="search-label" htmlFor="story-search">Search the archive</label>
        <div className="search-row">
          <Search size={20} />
          <input
            id="story-search"
            ref={inputRef}
            className="search-input"
            type="search"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search headlines, sources…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
          />
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search"><X size={20} /></button>
        </div>
        <p className="search-hint">Press Enter to search — Esc to close.</p>
      </form>
    </div>
  );
}
