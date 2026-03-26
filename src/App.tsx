/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Adventure from './pages/Adventure';
import Culture from './pages/Culture';
import Directory from './pages/Directory';
import About from './pages/About';
import ValleyDetail from './pages/ValleyDetail';
import TravelGuide from './pages/TravelGuide';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Packages from './pages/Packages';
import Bookings from './pages/Bookings';
import Investors from './pages/Investors';
import Marketplace from './pages/Marketplace';
import AuthorProfile from './pages/AuthorProfile';
import Developer from './pages/Developer';
import TourismCenter from './pages/TourismCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/valleys/:id" element={<ValleyDetail />} />
              <Route path="/guide" element={<TravelGuide />} />
              <Route path="/adventure" element={<Adventure />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/author/:id" element={<AuthorProfile />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/tourism-center" element={<TourismCenter />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
          <AIAssistant />
        </div>
      </Router>
    </HelmetProvider>
  );
}
