import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Clock3, RefreshCw, ShieldCheck } from 'lucide-react';
import { getHeadlines } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { openArticle, editionDate } from '../utils/articleLink';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();

  const [news, setNews] = useState([]);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');

  const load = () => {
    setState('loading');
    setError('');
    const request = query
      ? Promise.all([getHeadlines(1), getHeadlines(2)]).then(([a, b]) => [...a, ...b])
      : getHeadlines();

    request
      .then(items => {
        const results = query
          ? items.filter(item => `${item.title} ${item.description || ''} ${item.source}`.toLowerCase().includes(query.toLowerCase()))
          : items;
        setNews(results.slice(0, 12));
        setState('ready');
      })
      .catch(e => {
        setError(e.response?.data?.message || 'We could not load the latest headlines. Please try again.');
        setState('error');
      });
  };

  useEffect(load, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const open = item => openArticle({ id: item.id, page: item.page, signedIn: !!user, navigate });

  const featured = news[0];
  const rail = news.slice(1, 4);
  const grid = news.slice(4);

  if (state === 'loading') {
    return <div className="home-page">
      <div className="edition-head"><span className="eyebrow">{query ? 'SEARCH' : "TODAY'S EDITION"}</span><span className="edition-date">{editionDate()}</span></div>
      <div className="news-grid">{Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} />)}</div>
    </div>;
  }

  if (state === 'error') {
    return <div className="home-page">
      <div className="section-heading"><div><span className="eyebrow">THE DAILY EDITION</span><h2>Something went wrong</h2></div></div>
      <div className="state-card"><h3>We lost the wire</h3><p>{error}</p><button className="button button-primary" onClick={load}>Try again</button></div>
    </div>;
  }

  if (query) {
    return <div className="home-page">
      <div className="edition-head"><span className="eyebrow">SEARCH RESULTS</span><span className="edition-date">{editionDate()}</span></div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">{news.length ? `${news.length} ${news.length === 1 ? 'story' : 'stories'}` : 'NO MATCHES'}</span>
          <h2>“{query}”</h2>
        </div>
        <button className="icon-button" onClick={() => navigate('/')} aria-label="Clear search" title="Clear search"><RefreshCw size={17} /></button>
      </div>
      {news.length === 0
        ? <div className="state-card"><h3>Nothing matched</h3><p>No headlines matched “{query}”. Try a broader keyword, such as a country, company or topic.</p><button className="button button-primary" onClick={() => navigate('/')}>Back to the edition</button></div>
        : <div className="news-grid">{news.map((item, i) => <NewsCard key={item.id} article={item} signedIn={!!user} wide={i === 0} />)}</div>}
    </div>;
  }

  return <div className="home-page">
    <div className="edition-head">
      <span className="eyebrow">TODAY'S EDITION</span>
      <span className="edition-date">{editionDate()} · Ten essential stories</span>
    </div>

    <section className="hero">
      {featured && (
        <article
          className={featured.image ? 'featured' : 'featured no-image'}
          onClick={() => open(featured)}
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter') open(featured); }}
        >
          {featured.image && <img className="featured-image" src={featured.image} alt={featured.title} />}
          <div className="featured-overlay">
            <span className="category">{featured.category || featured.source}</span>
            <h1>{featured.title}</h1>
            {featured.description && <p className="featured-lead">{featured.description}</p>}
            <div className="featured-meta">
              <span>{featured.source}</span>
              <span className="dot" />
              <span>{featured.date}</span>
              <span className="read-more">Read the story <ArrowRight size={15} /></span>
            </div>
          </div>
        </article>
      )}

      <aside className="hero-rail">
        <span className="rail-label">Also in this edition</span>
        {rail.map(item => (
          <article
            key={item.id}
            className="rail-story"
            onClick={() => open(item)}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') open(item); }}
          >
            <div className={item.image ? 'rail-thumb' : 'rail-thumb placeholder'}>
              {item.image ? <img src={item.image} alt={item.title} loading="lazy" /> : <span>BRIEFLY</span>}
            </div>
            <div className="rail-body">
              <span className="category">{item.category || item.source}</span>
              <h3>{item.title}</h3>
              <div className="meta"><Clock3 size={12} /> <span>{item.date}</span></div>
            </div>
          </article>
        ))}
        <div className="rail-note">
          <ShieldCheck size={18} />
          <span>Headlines are free to browse.<br /><strong>Sign in</strong> to read a story in full.</span>
        </div>
      </aside>
    </section>

    <div className="section-heading">
      <div>
        <span className="eyebrow">LATEST STORIES</span>
        <h2>What's happening now</h2>
        <p>The rest of today's feed, updated as the wire moves.</p>
      </div>
      <button className="icon-button" onClick={load} aria-label="Refresh headlines" title="Refresh"><RefreshCw size={17} /></button>
    </div>

    {grid.length > 0 && <div className="news-grid">
      {grid.map((item, i) => <NewsCard key={item.id} article={item} signedIn={!!user} wide={i === 0} />)}
    </div>}

    {news.length > 0 && grid.length === 0 && (
      <div className="state-card"><h3>The wire is quiet</h3><p>The feed returned only a few stories. Refresh to see if more have come in.</p><button className="button button-primary" onClick={load}>Refresh</button></div>
    )}
  </div>;
}
