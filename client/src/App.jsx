import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return <div className="app-shell"><Navbar /><main className="main-content"><Routes>
    <Route path="/" element={<Home />} /><Route path="/news" element={<NewsPage />} /><Route path="/signin" element={<SignIn />} /><Route path="/signup" element={<SignUp />} />
    <Route element={<ProtectedRoute />}><Route path="/article/:id" element={<Article />} /></Route>
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></div>;
}
