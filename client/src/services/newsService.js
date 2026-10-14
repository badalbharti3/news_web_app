import api from './api';
export const getHeadlines = (page = 1) => api.get('/news', { params: { page } }).then(r => r.data.news);
export const getArticle = (id, page = 1) => api.get(`/news/${encodeURIComponent(id)}`, { params: { page } }).then(r => r.data.news);
