import axios from 'axios';

const NEWS_API_URL = 'https://briefly-newsapp.onrender.com/api/news';
const newsApi = axios.create({ baseURL: NEWS_API_URL, withCredentials: true });

export const getHeadlines = (page = 1) => newsApi.get('', { params: { page } }).then(r => r.data.news);
export const getArticle = (id, page = 1) => newsApi.get(`/${encodeURIComponent(id)}`, { params: { page } }).then(r => r.data.news);
