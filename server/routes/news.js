import { Router } from 'express';
import { fetchNews } from '../services/newsService.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', async (req, res, next) => { try { const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1); res.json({ news: await fetchNews(page), page }); } catch (e) { next(e); } });
router.get('/:id', requireAuth, async (req, res, next) => { try { const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1); const item = (await fetchNews(page)).find(article => article.id === req.params.id); if (!item) return res.status(404).json({ message: 'Article not found.' }); res.json({ news: item }); } catch (e) { next(e); } });
export default router;
