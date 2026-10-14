import { useEffect, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { getHeadlines } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
export default function Home() {
  const { user } = useAuth(); const [news, setNews] = useState([]); const [state, setState] = useState('loading'); const [error, setError] = useState('');
  const load = () => { setState('loading'); setError(''); getHeadlines().then(items => { setNews(items.slice(0, 10)); setState('ready'); }).catch(e => { setError(e.response?.data?.message || 'We could not load the latest headlines. Please try again.'); setState('error'); }); };
  useEffect(load, []);
  return <div className="home-page"><section className="hero"><div><span className="eyebrow">TODAY'S SIGNAL</span><h1>News for the <em>curious</em> mind.</h1><p>Ten essential headlines, clearly presented. Browse freely, then sign in when you are ready to read deeper.</p></div><div className="hero-note"><ShieldCheck size={18} /><span>Public headlines<br /><strong>Private reading</strong></span></div></section><div className="section-heading"><div><span className="eyebrow">LATEST STORIES</span><h2>What’s happening now</h2></div>{state !== 'loading' && <button className="icon-button" onClick={load} aria-label="Refresh headlines"><RefreshCw size={18} /></button>}</div>{state === 'loading' && <div className="news-grid">{Array.from({ length: 6 }, (_, i) => <LoadingSkeleton key={i} />)}</div>}{state === 'error' && <div className="state-card"><h3>Something went wrong</h3><p>{error}</p><button className="button button-primary" onClick={load}>Try again</button></div>}{state === 'ready' && !news.length && <div className="state-card"><h3>No headlines yet</h3><p>The news feed returned no stories. Check back shortly.</p></div>}{state === 'ready' && news.length > 0 && <div className="news-grid">{news.map(item => <NewsCard key={item.id} article={item} signedIn={!!user} />)}</div>}</div>;
}
