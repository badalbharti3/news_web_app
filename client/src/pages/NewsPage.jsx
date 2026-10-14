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

  useEffect(() => {
    setState('loading');
    setError('');
    getHeadlines(page).then(items => {
      setNews(items.map(item => ({ ...item, page })));
      setState('ready');
    }).catch(e => {
      setError(e.response?.data?.message || 'We could not load more stories.');
      setState('error');
    });
  }, [page]);

  return <div className="home-page">
    <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to latest</Link>
    <section className="listing-heading">
      <span className="eyebrow">MORE STORIES</span>
      <h1>Keep exploring.</h1>
      <p>Ten more headlines from the next page of the live news feed.</p>
    </section>
    {state === 'loading' && <div className="news-grid">{Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} />)}</div>}
    {state === 'error' && <div className="state-card"><h3>Something went wrong</h3><p>{error}</p><button className="button button-primary" onClick={() => setParams({ page: String(page) })}>Try again</button></div>}
    {state === 'ready' && !news.length && <div className="state-card"><h3>No more stories</h3><p>The feed returned no stories on this page.</p></div>}
    {state === 'ready' && news.length > 0 && <><div className="news-grid">{news.map(item => <NewsCard key={item.id} article={item} signedIn={!!user} />)}</div><div className="pagination"><button className="button button-ghost" onClick={() => setParams({ page: String(page - 1) })} disabled={page <= 2}><ArrowLeft size={16} /> Previous</button><span>Page {page - 1} of more stories</span><button className="button button-primary" onClick={() => setParams({ page: String(page + 1) })}>Next <ArrowRight size={16} /></button></div></>}
  </div>;
}
