import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function ThemeToggle() { const { theme, toggleTheme } = useTheme(); return <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>; }
