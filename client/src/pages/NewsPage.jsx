import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getHeadlines } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function NewsPage() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const page = Math.max(2, Number.parseInt(params.get('page'), 10) || 2);
  const [news, setNews] = useState([]);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setState('loading');
    setError('');
    getHeadlines(page).then(items => {
      if (!active) return;
      setNews(items.map(item => ({ ...item, page })));
      setState('ready');
    }).catch(e => {
      if (!active) return;
      setError(e.response?.data?.message || 'We could not load more stories.');
      setState('error');
    });
    return () => { active = false; };
  }, [page, retry]);

  return <div className="home-page">
    <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to the edition</Link>

    <header className="listing-heading">
      <span className="eyebrow">CONTINUED COVERAGE</span>
      <h1>More stories.</h1>
      <p>The next page of the live wire — beyond the ten stories in today's edition.</p>
    </header>

    {state === 'loading' && <div className="news-grid">{Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} />)}</div>}

    {state === 'error' && <div className="state-card">
      <span className="eyebrow">WIRE INTERRUPTED</span>
      <h3>Something went wrong</h3>
      <p>{error}</p>
      <button className="button button-primary" onClick={() => setRetry(n => n + 1)}>Try again</button>
    </div>}

    {state === 'ready' && !news.length && <div className="state-card">
      <span className="eyebrow">END OF THE WIRE</span>
      <h3>No more stories</h3>
      <p>The feed returned no stories on this page. Refresh to see if new copy has come in.</p>
      <Link className="button button-primary" to="/">Back to the edition</Link>
    </div>}

    {state === 'ready' && news.length > 0 && <>
      <div className="news-grid">
        {news.map((item, i) => <NewsCard key={item.id} article={item} signedIn={!!user} wide={i === 0} />)}
      </div>
      <div className="pagination">
        <button className="button button-ghost" onClick={() => setParams({ page: String(page - 1) })} disabled={page <= 2}><ArrowLeft size={15} /> Previous</button>
        <span>Page {page - 1} of continued coverage</span>
        <button className="button button-primary" onClick={() => setParams({ page: String(page + 1) })}>Next <ArrowRight size={15} /></button>
      </div>
    </>}
  </div>;
}
