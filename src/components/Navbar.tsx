import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Mountain, Map, Info, MessageSquare, Camera, FileText, Globe, Package, Calendar, ShoppingBag, TrendingUp, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const navItems = [
  { name: 'explore', path: '/explore', icon: Compass },
  { name: 'packages', path: '/packages', icon: Package },
  { name: 'marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'investors', path: '/investors', icon: TrendingUp },
  { name: 'directory', path: '/directory', icon: Map },
  { name: 'blog', path: '/blog', icon: FileText },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
            <img src="/logo.jpeg" alt="Bagrote Valley Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className={cn(
            "font-serif text-xl font-bold tracking-tight",
            scrolled ? "text-brand-primary" : "text-white"
          )}>
            Bagrote Valley
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity",
                scrolled ? "text-brand-primary" : "text-white",
                location.pathname === item.path && "border-b-2 border-brand-accent"
              )}
            >
              {t(item.name)}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={toggleLanguage}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                scrolled 
                  ? "bg-gray-100 text-brand-primary hover:bg-gray-200" 
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              )}
            >
              <Globe size={14} />
              {i18n.language === 'en' ? 'اردو' : 'EN'}
            </button>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg",
                scrolled 
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90" 
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-brand-primary"
              )}
            >
              <MessageSquare size={14} />
              {t('AI Guide')}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} className={scrolled ? "text-brand-primary" : "text-white"} /> : <Menu size={28} className={scrolled ? "text-brand-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-brand-primary font-serif text-lg border-b border-gray-100 pb-2"
              >
                <item.icon size={20} className="text-brand-accent" />
                {t(item.name)}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 text-brand-primary font-serif text-lg"
              >
                <Globe size={20} className="text-brand-accent" />
                {i18n.language === 'en' ? 'اردو (Urdu)' : 'English'}
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-ai-assistant'));
                }}
                className="flex items-center gap-4 text-brand-primary font-serif text-lg"
              >
                <MessageSquare size={20} className="text-brand-accent" />
                AI Guide
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
