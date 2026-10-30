import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getArticle } from '../services/newsService';

export default function Article() {
  const { id } = useParams();
  const page = new URLSearchParams(useLocation().search).get('page') || '1';
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setArticle(null);
    setError('');
    getArticle(id, page)
      .then(item => { if (active) setArticle(item); })
      .catch(e => { if (active) setError(e.response?.data?.message || 'This article is unavailable.'); });
    return () => { active = false; };
  }, [id, page]);

  if (error) {
    return <div className="page-center">
      <div className="state-card">
        <span className="eyebrow">STORY UNAVAILABLE</span>
        <h3>Article unavailable</h3>
        <p>{error}</p>
        <Link className="button button-primary" to="/">Back to the edition</Link>
      </div>
    </div>;
  }

  if (!article) {
    return <div className="page-center"><span className="edition-date">Setting the type…</span></div>;
  }

  return <article className="article-page">
    <Link to={page === '1' ? '/' : `/news?page=${page}`} className="back-link"><ArrowLeft size={15} /> Back to the edition</Link>

    <span className="eyebrow">{article.category || article.source}</span>
    <h1>{article.title}</h1>

    <div className="article-meta">
      <span>{article.source}</span>
      <span className="dot" />
      <span>{article.date}</span>
      {article.author && <><span className="dot" /><span>By {article.author}</span></>}
    </div>

    {article.image && <img className="article-image" src={article.image} alt={article.title} />}
    {article.description && <p className="article-lead">{article.description}</p>}
    {article.content && <div className="article-content">{article.content}</div>}

    {article.url && <a className="button button-primary" href={article.url} target="_blank" rel="noreferrer">
      Continue reading at {article.source} <ExternalLink size={15} />
    </a>}
  </article>;
}
