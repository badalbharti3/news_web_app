// Shared navigation helpers for opening an article from any card or story block.
export function articlePath(id, page = 1) {
  return `/article/${encodeURIComponent(id)}?page=${page || 1}`;
}

export function openArticle({ id, page = 1, signedIn, navigate }) {
  const path = articlePath(id, page);
  navigate(signedIn ? path : `/signin?next=${encodeURIComponent(path)}`);
}

// "12 March 2026" style stamp used in editorial metadata.
export function editionDate(date = new Date()) {
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
}
