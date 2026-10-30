import { Link } from 'react-router-dom';

export default function NotFound() {
  return <div className="page-center">
    <div className="state-card">
      <span className="eyebrow">404 · OFF THE RECORD</span>
      <h3>That page wandered off.</h3>
      <p>The story you are looking for does not exist — or it has been spiked.</p>
      <Link className="button button-primary" to="/">Return to the edition</Link>
    </div>
  </div>;
}
