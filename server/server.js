import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';

const app = express();
// Render (and most hosts) sit behind a proxy, so req.ip is the proxy address
// unless Express is told how many hops to trust. Without this every visitor
// shares one rate-limit bucket.
app.set('trust proxy', 1);

// CLIENT_ORIGIN may list several allowed origins, comma separated.
const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());

const limiter = options => rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => res.status(429).json({ message: 'Too many requests. Please wait a moment and try again.' }),
  ...options
});

app.use('/api/auth', limiter({ windowMs: 15 * 60 * 1000, max: 80 }), authRoutes);
app.use('/api/news', limiter({ windowMs: 60 * 1000, max: 60 }), newsRoutes);
app.use('/api', (req, res) => res.status(404).json({ message: 'That endpoint does not exist.' }));
app.use((err, req, res, next) => { console.error(err); res.status(err.response?.status || 500).json({ message: err.response?.data?.message || 'The server could not complete that request.' }); });

app.get('/', (req, res) => res.json({ name: 'Briefly News API', status: 'ok', endpoints: { news: '/api/news', auth: '/api/auth' } }));
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`API listening on ${port}`))).catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
