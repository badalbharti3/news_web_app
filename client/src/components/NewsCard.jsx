import { ArrowUpRight, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openArticle } from '../utils/articleLink';

export default function NewsCard({ article, signedIn, wide = false }) {
  const navigate = useNavigate();
  const open = () => openArticle({ id: article.id, page: article.page, signedIn, navigate });

  return (
    <article
      className={wide ? 'news-card news-card--wide' : 'news-card'}
      onClick={open}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
    >
      <div className="card-image-wrap">
        {article.image
          ? <img src={article.image} alt={article.title} className="card-image" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
          : <div className="image-placeholder"><span>BRIEFLY</span></div>}
        <span className="source-pill">{article.source}</span>
      </div>
      <div className="card-body">
        <span className="category">{article.category || article.source}</span>
        <h2>{article.title}</h2>
        {article.description && <p>{article.description}</p>}
        <div className="meta"><Clock3 size={13} /> <span>{article.date}</span></div>
        <span className="read-link">Read article <ArrowUpRight size={15} /></span>
      </div>
    </article>
  );
}
