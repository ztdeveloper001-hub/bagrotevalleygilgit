import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Calendar, 
  CloudSun, 
  MapPin, 
  BookOpen, 
  Camera, 
  CheckCircle2, 
  Star, 
  Instagram, 
  Facebook, 
  Twitter,
  Quote,
  FileText,
  Loader2,
  Megaphone,
  ExternalLink,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import Hero from '@/components/Hero';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { db } from '@/firebase';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';
import { BlogPost, Valley, GalleryImage, LocalAd } from '@/types';

import { jsPDF } from 'jspdf';

const quickInfo = [
  { title: "Best Time to Visit", desc: "April to October for trekking; Winter for snow sports.", icon: Calendar },
  { title: "Weather", desc: "Mild summers (15-25°C), cold winters with heavy snow.", icon: CloudSun },
  { title: "Top Attractions", desc: "Rakaposhi Base Camp, Hinarchi Glacier, Farfu Village.", icon: MapPin },
  { title: "Travel Guide", desc: "Official maps, permits, and local guide directories.", icon: BookOpen },
];

const travelTips = [
  "Respect local customs and dress modestly in villages.",
  "Carry cash as ATMs are only available in Gilgit city.",
  "Hire a local guide for high-altitude treks.",
  "Stay hydrated and acclimatize properly.",
  "Pack warm layers, even during the summer months.",
  "Avoid littering and respect the fragile ecosystem.",
  "Always ask for permission before taking photos of locals.",
  "Register your arrival at the local tourism office."
];

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [valleys, setValleys] = useState<Valley[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [ads, setAds] = useState<LocalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      
      // Add Logo
      try {
        const logoUrl = '/logo.jpeg';
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        
        const base64Logo = await base64Promise;
        doc.addImage(base64Logo, 'JPEG', 10, 10, 30, 30);
      } catch (e) {
        console.error("Could not add logo to PDF", e);
      }

      // Title
      doc.setFontSize(22);
      doc.setTextColor(10, 45, 35); // brand-primary color
      doc.text("Bagrote Valley Official Travel Guide", 50, 25);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Sustainable Tourism | Cultural Heritage | Adventure", 50, 35);
      
      doc.setDrawColor(242, 125, 38); // brand-accent
      doc.setLineWidth(1);
      doc.line(10, 45, 200, 45);

      // Content
      doc.setFontSize(16);
      doc.setTextColor(10, 45, 35);
      doc.text("Essential Travel Tips", 10, 60);

      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      
      let yPos = 75;
      travelTips.forEach((tip, index) => {
        doc.text(`${index + 1}. ${tip}`, 15, yPos);
        yPos += 10;
      });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("© 2026 Bagrote Valley Tourism Council. All rights reserved.", 10, 280);
      doc.text("www.bagrotevalley.com", 160, 280);

      doc.save("Bagrote_Valley_Travel_Guide.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const blogQuery = query(collection(db, 'blog'), limit(3));
    const valleysQuery = query(collection(db, 'valleys'), limit(3));
    const galleryQuery = query(collection(db, 'gallery'), limit(6));
    const adsQuery = query(collection(db, 'ads'), limit(3));

    const unsubBlog = onSnapshot(blogQuery, (snapshot) => {
      setBlogPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost)));
    }, (error) => console.error("Error fetching blog posts:", error));

    const unsubValleys = onSnapshot(valleysQuery, (snapshot) => {
      setValleys(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Valley)));
    }, (error) => console.error("Error fetching valleys:", error));

    const unsubGallery = onSnapshot(galleryQuery, (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as GalleryImage)));
    }, (error) => console.error("Error fetching gallery:", error));

    const unsubAds = onSnapshot(adsQuery, (snapshot) => {
      setAds(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LocalAd)));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching ads:", error);
      setLoading(false);
    });

    return () => {
      unsubBlog();
      unsubValleys();
      unsubGallery();
      unsubAds();
    };
  }, []);

const testimonials = [
  { name: "Sarah Jenkins", role: "Adventure Photographer", text: "Bagrote is unlike anything I've seen. The scale of the mountains is humbling, and the people are the kindest in the world.", rating: 5 },
  { name: "Ahmed Khan", role: "Trekking Enthusiast", text: "The trek to Rakaposhi Base Camp was life-changing. This guide helped me plan every step perfectly.", rating: 5 },
  { name: "Elena Rossi", role: "Cultural Researcher", text: "The preservation of Shina traditions in Farfu is fascinating. A must-visit for anyone interested in heritage.", rating: 5 },
];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-white overflow-hidden">
      <Helmet>
        <title>Bagrote Valley Tourism | Official Travel Guide & Trekking</title>
        <meta name="description" content="Official Bagrote Valley tourism portal. Explore hidden valleys in Pakistan, find the best Bagrote travel guide, and plan your trekking in Bagrote." />
        <meta name="keywords" content="Bagrote Valley tourism, Bagrote travel guide, Gilgit Baltistan valleys, Hidden valleys in Pakistan, Trekking in Bagrote" />
      </Helmet>
      <Hero 
        title="Bagrote Valley"
        subtitle="Discover the Hidden Paradise of Gilgit-Baltistan. A sanctuary of towering peaks, ancient glaciers, and timeless culture."
        image="/bagrote1.jpg"
      />

      {/* Official Authority & Vision Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/5 rounded-full border border-brand-primary/10">
                <ShieldCheck className="text-brand-accent" size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Official Tourism Authority</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary leading-tight">
                A Vision for Sustainable <span className="text-brand-accent italic">Excellence</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                As the official governing body for Bagrote Valley tourism, we are committed to a long-term vision that balances world-class hospitality with environmental stewardship. We invite investors and travelers alike to join us in building a sustainable future for this hidden paradise.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-brand-primary">2030</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Vision Target</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-brand-primary">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Eco-Certified</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/investors" className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg">
                  Investor Portal
                </Link>
                <Link to="/about" className="px-8 py-4 border border-brand-primary/20 text-brand-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all">
                  Our Mission
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/bagrote2.jpg" 
                className="rounded-[40px] shadow-2xl" 
                alt="Bagrote Vision" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
                    <TrendingUp className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-primary">Market Growth</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Bagrote Valley</p>
                  </div>
                </div>
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-accent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-brand-accent transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <info.icon size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-brand-primary">{info.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{info.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-brand-accent font-mono text-sm uppercase tracking-[0.3em] mb-4">The Gateway to Adventure</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary leading-tight mb-8">
            Where Earth Meets the Sky
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Located just an hour from Gilgit, Bagrote Valley is a breathtaking landscape of dramatic contrasts. 
            From the lush green orchards of Sinakkar to the frozen expanse of the Gutumi Glacier, every corner 
            of this valley tells a story of resilience and natural wonder.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/explore" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg group">
              Explore the Valley
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/bagrote3.jpg" 
              alt="Bagrote Landscape" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-accent rounded-3xl -z-10 hidden md:block" />
          <div className="absolute -top-10 -right-10 w-48 h-48 border-2 border-brand-primary/10 rounded-3xl -z-10 hidden md:block" />
        </motion.div>
      </section>

      {/* Featured Valleys */}
      <section className="py-32 bg-brand-primary text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Hidden Gems</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Settlements</h2>
            </div>
            <Link to="/explore" className="text-sm font-bold uppercase tracking-widest border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors">
              View All Villages
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {valleys.map((valley, i) => (
              <motion.div
                key={valley.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4]"
              >
                <img 
                  src={
                    valley.name.toLowerCase().includes('farfooh') ? '/farfooh1.jpg' :
                    valley.name.toLowerCase().includes('hopey') ? '/hopay.jpg' :
                    valley.name.toLowerCase().includes('sinakar') ? '/sinaker1.jpg' :
                    valley.name.toLowerCase().includes('datuche') ? '/datucha1.jpg' :
                    valley.name.toLowerCase().includes('gasunar') ? '/gosnar.jpg' :
                    valley.name.toLowerCase().includes('darr') ? '/darjia.jpg' :
                    valley.name.toLowerCase().includes('satt') ? '/satt.jpg' :
                    valley.name.toLowerCase().includes('chiraah') ? '/chirra.jpg' :
                    valley.name.toLowerCase().includes('gargoo') ? '/bagrote3.jpg' :
                    valley.name.toLowerCase().includes('barcha') ? '/bagrote1.jpg' :
                    valley.image
                  } 
                  alt={valley.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  {(valley.name.toLowerCase().includes('gargoo') || valley.name.toLowerCase().includes('barcha')) && (
                    <span className="px-4 py-1.5 bg-brand-accent text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1">
                      <Star size={10} className="fill-brand-primary" /> Popular
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{valley.name}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 line-clamp-2">{valley.description}</p>
                  <Link to={`/explore#${valley.name.toLowerCase()}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent group/btn">
                    Learn More
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Camera className="mx-auto text-brand-accent mb-4" size={32} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-4">Valley Moments</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">A visual journey through the seasons and landscapes of Bagrote.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-auto object-cover hover:brightness-75 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="text-white" size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Ads Section */}
      {ads.length > 0 && (
        <section className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Megaphone className="text-brand-accent" size={32} />
              <h2 className="text-4xl font-serif font-bold text-brand-primary">Local Services & Offers</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {ads.map((ad, i) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-brand-accent transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={ad.image} 
                      alt={ad.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {ad.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-serif font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                      {ad.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                      {ad.description}
                    </p>
                    <a 
                      href={ad.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-[10px] hover:text-brand-accent transition-colors"
                    >
                      Learn More <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Stories Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Insights & Stories</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">Latest From Our Blog</h2>
            </div>
            <Link to="/blog" className="text-sm font-bold uppercase tracking-widest border-b border-brand-accent pb-1 text-brand-primary hover:text-brand-accent transition-colors">
              View All Articles
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-[10px]">
                      Read More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="/Essential1.jpg" alt="Tips 1" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
              <img src="/Essential2.jpg" alt="Tips 2" className="rounded-2xl shadow-lg mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Plan Your Visit</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8">Essential Travel Tips</h2>
            <div className="space-y-6">
              {travelTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="mt-1 bg-brand-accent/20 p-1 rounded-full">
                    <CheckCircle2 size={18} className="text-brand-accent" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
            <button 
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className="mt-12 px-8 py-4 border-2 border-brand-primary text-brand-primary rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText size={16} />
                  Download Full Guide (PDF)
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Quote className="mx-auto text-brand-accent/20 mb-4" size={64} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-4">Voices of the Valley</h2>
            <p className="text-gray-500">What travelers say about their experience in Bagrote.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-50 relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-brand-primary">{t.name}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
