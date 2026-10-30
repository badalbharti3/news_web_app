import api from './api';

// Headlines and article details are served by the backend proxy so the news
// provider key stays server-side. Sharing the api instance keeps a single,
// configurable base URL for every request (auth included).
export const getHeadlines = (page = 1) => api.get('/news', { params: { page } }).then(r => r.data.news);
export const getArticle = (id, page = 1) => api.get(`/news/${encodeURIComponent(id)}`, { params: { page } }).then(r => r.data.news);
