import { Link } from 'react-router-dom';
export default function NotFound() { return <div className="page-center"><div className="state-card"><span className="eyebrow">404</span><h3>That page wandered off.</h3><p>The story you are looking for does not exist.</p><Link className="button button-primary" to="/">Return home</Link></div></div>; }
