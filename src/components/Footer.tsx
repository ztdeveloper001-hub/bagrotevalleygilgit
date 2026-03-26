import { Link } from 'react-router-dom';
import { MapPin, BookOpen, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                <img src="/logo.jpeg" alt="Bagrote Valley Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Bagrote Valley</span>
            </Link>
            <p className="text-white/60 max-w-sm mb-10 leading-relaxed">
              The official tourism guide for Bagrote Valley, Gilgit-Baltistan. 
              Our mission is to promote sustainable tourism while preserving the 
              unique natural and cultural heritage of the Karakoram.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-brand-accent">Explore</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">About Bagrote</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">Villages & Peaks</Link></li>
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Local Marketplace</Link></li>
              <li><Link to="/investors" className="hover:text-white transition-colors font-bold text-white">Investor Relations</Link></li>
              <li><Link to="/guide" className="hover:text-white transition-colors">Travel Guide</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Stories</Link></li>
              <li><Link to="/adventure" className="hover:text-white transition-colors">Trekking Routes</Link></li>
              <li><Link to="/culture" className="hover:text-white transition-colors">Cultural Heritage</Link></li>
              <li><Link to="/directory" className="hover:text-white transition-colors">Local Directory</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors text-gray-600">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-brand-accent">Contact Info</h4>
            <ul className="space-y-6 text-sm text-white/60">
              <li className="flex gap-4">
                <MapPin size={18} className="text-brand-accent shrink-0" />
                <span>
                  Tourism Information Center, <Link to="/tourism-center" className="text-brand-accent font-bold hover:underline">Farfooh</Link>, Bagrote Valley, Gilgit-Baltistan
                </span>
              </li>
              <li className="flex gap-4">
                <BookOpen size={18} className="text-brand-accent shrink-0" />
                <span>info@bagrotevalley.com</span>
              </li>
              <li className="flex gap-4">
                <Phone size={18} className="text-brand-accent shrink-0" />
                <span>+9203474336806</span>
              </li>
              <li className="flex gap-4">
                <Link to="/developer" className="text-brand-accent hover:underline font-bold uppercase tracking-widest text-[10px]">Developer Portal</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <p>© 2026 Bagrote Valley Tourism Council. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
