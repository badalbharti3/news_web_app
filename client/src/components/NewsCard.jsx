import { ArrowUpRight, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function NewsCard({ article, signedIn }) {
  const navigate = useNavigate(); const open = () => signedIn ? navigate(`/article/${encodeURIComponent(article.id)}?page=${article.page || 1}`) : navigate(`/signin?next=${encodeURIComponent(`/article/${article.id}?page=${article.page || 1}`)}`);
  return <article className="news-card" onClick={open} tabIndex="0" onKeyDown={e => e.key === 'Enter' && open()}><div className="card-image-wrap">{article.image ? <img src={article.image} alt="" className="card-image" onError={e => { e.currentTarget.style.display = 'none'; }} /> : <div className="image-placeholder"><span>BR</span></div>}<span className="source-pill">{article.source}</span></div><div className="card-body"><div className="meta"><span><Clock3 size={13} /> {article.date}</span></div><h2>{article.title}</h2>{article.description && <p>{article.description}</p>}<button className="read-link">Read article <ArrowUpRight size={16} /></button></div></article>;
}
