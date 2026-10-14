import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router(); const cookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 7
};
function token(user) { return jwt.sign({ id: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' }); }
router.post('/signup', async (req, res, next) => { try { const { name, email, password, confirmPassword, terms } = req.body; if (!name || !email || !password || password !== confirmPassword || !terms) return res.status(400).json({ message: 'Please complete all fields and accept the terms.' }); if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' }); if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with that email already exists.' }); const user = await User.create({ name, email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12) }); res.cookie('accessToken', token(user), cookieOptions).status(201).json({ user: { id: user._id, name: user.name, email: user.email } }); } catch (e) { next(e); } });
router.post('/signin', async (req, res, next) => { try { const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() }); if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' }); res.cookie('accessToken', token(user), cookieOptions).json({ user: { id: user._id, name: user.name, email: user.email } }); } catch (e) { next(e); } });
router.post('/logout', (req, res) => res.clearCookie('accessToken', cookieOptions).json({ message: 'Signed out.' }));
router.get('/me', requireAuth, async (req, res, next) => { try { const user = await User.findById(req.user.id).select('name email'); if (!user) return res.status(401).json({ message: 'User not found.' }); res.json({ user: { id: user._id, name: user.name, email: user.email } }); } catch (e) { next(e); } });
export default router;
