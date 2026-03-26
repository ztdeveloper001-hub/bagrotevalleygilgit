import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Hero from '@/components/Hero';
import { MapPin, Mountain, Clock, Sun, ShieldAlert, ArrowLeft, Camera, Loader2, ArrowRight, Star, Compass, Wind, Cloud, Info, X } from 'lucide-react';
import { db } from '@/firebase';
import { doc, getDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Valley } from '@/types';
import { cn } from '@/lib/utils';

interface FamousValleyProps {
  valley: Valley;
  nearbyValleys: Valley[];
  getValleyImage: (name: string, fallback: string) => string;
}

function FamousValleyDetail({ valley, nearbyValleys, getValleyImage }: FamousValleyProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden selection:bg-brand-accent selection:text-brand-primary">
      {/* Immersive Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={getValleyImage(valley.name, valley.image)} 
            className="w-full h-full object-cover"
            alt={valley.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="px-6 py-2 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 rounded-full flex items-center gap-3"
              >
                <Star size={14} className="text-brand-accent fill-brand-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">World Class Destination</span>
              </motion.div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter leading-[0.85] uppercase">
              {valley.name.split(' ').map((word, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed italic font-serif"
            >
              "{valley.description.substring(0, 120)}..."
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent" />
        </motion.div>
      </section>

      {/* Premium Stats Grid */}
      <section className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
          {[
            { label: "Difficulty", value: valley.difficulty, icon: Mountain },
            { label: "Travel Time", value: valley.travelTime, icon: Clock },
            { label: "Best Season", value: valley.bestSeason, icon: Sun },
            { label: "Altitude", value: "3,500m+", icon: Cloud }
          ].map((stat, i) => (
            <div key={i} className="p-10 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors">
              <stat.icon className="text-brand-accent" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">{stat.label}</p>
                <p className="text-xl font-serif font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immersive Content */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px]">The Essence</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">A Sanctuary of <br />Unrivaled Beauty</h2>
            </div>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              {valley.description}
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-serif font-bold text-brand-accent mb-2">98%</div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Visitor Rating</p>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-accent mb-2">#1</div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Global Rank</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group"
          >
            <img 
              src={valley.gallery[0] || valley.image} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Immersive view"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <p className="text-sm font-serif italic text-white/80">"The silence here speaks louder than words."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Gallery */}
      <section className="py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px]">Visual Journey</span>
              <h2 className="text-5xl font-serif font-bold">Captured Moments</h2>
            </div>
            <p className="text-white/40 max-w-md text-sm leading-relaxed">
              Explore the raw, unfiltered beauty of {valley.name} through the lens of those who have walked its paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {valley.gallery.slice(0, 5).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveGalleryIndex(i)}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer group",
                  i === 0 ? "md:col-span-8 aspect-video" : 
                  i === 1 ? "md:col-span-4 aspect-square" :
                  i === 2 ? "md:col-span-4 aspect-square" :
                  "md:col-span-4 aspect-square"
                )}
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={`Gallery ${i}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Safety Split */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="p-16 rounded-[4rem] bg-brand-accent text-brand-primary space-y-12">
            <div className="flex items-center gap-4">
              <Compass size={32} />
              <h3 className="text-3xl font-serif font-bold">The Experience</h3>
            </div>
            <div className="space-y-8">
              {valley.attractions.map((attr, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <span className="text-4xl font-serif font-bold opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{attr}</h4>
                    <p className="text-sm opacity-70">Experience the unique charm and breathtaking views of this iconic spot.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-16 rounded-[4rem] bg-white/5 border border-white/10 space-y-12">
            <div className="flex items-center gap-4">
              <ShieldAlert size={32} className="text-brand-accent" />
              <h3 className="text-3xl font-serif font-bold">Guardian's Guide</h3>
            </div>
            <div className="space-y-6">
              {valley.safetyTips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-center p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-accent/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                  <p className="text-sm text-white/70">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Exploration */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl font-serif font-bold">Continue the Journey</h2>
            <Link to="/explore" className="group flex items-center gap-3 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
              View All Valleys <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {nearbyValleys.map((v) => (
              <Link key={v.id} to={`/valley/${v.id}`} className="group space-y-6">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                  <img 
                    src={getValleyImage(v.name, v.image)} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={v.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-2">{v.difficulty}</p>
                    <h4 className="text-2xl font-serif font-bold text-white">{v.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <footer className="py-20 px-6 border-t border-white/10 text-center">
        <Link to="/explore" className="inline-flex items-center gap-4 text-white/40 hover:text-brand-accent transition-colors font-bold uppercase tracking-[0.4em] text-[10px]">
          <ArrowLeft size={16} />
          Back to All Destinations
        </Link>
      </footer>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
          >
            <button 
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={valley.gallery[activeGalleryIndex]} 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              alt="Fullscreen view"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ValleyDetail() {
  const { id } = useParams<{ id: string }>();
  const [valley, setValley] = useState<Valley | null>(null);
  const [nearbyValleys, setNearbyValleys] = useState<Valley[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValleyData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // Fetch current valley
        const docRef = doc(db, 'valleys', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const currentValley = { ...docSnap.data(), id: docSnap.id } as Valley;
          setValley(currentValley);

          // Fetch nearby valleys (other valleys in the same collection)
          const valleysRef = collection(db, 'valleys');
          const q = query(valleysRef, limit(4));
          const querySnapshot = await getDocs(q);
          const otherValleys = querySnapshot.docs
            .map(doc => ({ ...doc.data(), id: doc.id } as Valley))
            .filter(v => v.id !== id)
            .slice(0, 3);
          setNearbyValleys(otherValleys);
        }
      } catch (error) {
        console.error("Error fetching valley data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchValleyData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!valley) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-4xl font-serif font-bold text-brand-primary mb-4">Valley Not Found</h1>
        <p className="text-gray-500 mb-8">The valley you are looking for does not exist in our directory.</p>
        <Link to="/explore" className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all">
          Back to Explore
        </Link>
      </div>
    );
  }

  const isFamous = valley?.name.toLowerCase().includes('gargoo') || valley?.name.toLowerCase().includes('barcha');

  const getValleyImage = (name: string, fallback: string) => {
    const n = name.toLowerCase();
    if (n.includes('farfooh')) return '/farfooh1.jpg';
    if (n.includes('hopey')) return '/hopay.jpg';
    if (n.includes('sinakar')) return '/sinaker1.jpg';
    if (n.includes('datuche')) return '/datucha1.jpg';
    if (n.includes('gasunar')) return '/gosnar.jpg';
    if (n.includes('darr')) return '/darjia.jpg';
    if (n.includes('satt')) return '/satt.jpg';
    if (n.includes('chiraah')) return '/chirra.jpg';
    if (n.includes('gargoo')) return '/bagrote3.jpg';
    if (n.includes('barcha')) return '/bagrote1.jpg';
    return fallback;
  };

  if (isFamous && valley) {
    return (
      <FamousValleyDetail 
        valley={valley} 
        nearbyValleys={nearbyValleys} 
        getValleyImage={getValleyImage} 
      />
    );
  }

  return (
    <main className="bg-white overflow-hidden">
      <div className="relative">
        <Hero 
          title={valley.name}
          subtitle={valley.description.length > 150 ? valley.description.substring(0, 150) + "..." : valley.description}
          image={getValleyImage(valley.name, valley.image)}
          showScroll={false}
        />
        {isFamous && (
          <div className="absolute top-32 left-1/2 -translate-x-1/2 z-30">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-2 bg-brand-accent text-brand-primary rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center gap-2"
            >
              <Star size={14} className="fill-brand-primary" />
              Top Tourist Destination
            </motion.div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <section className="relative z-20 -mt-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <Mountain size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Difficulty</p>
              <p className="font-bold text-brand-primary">{valley.difficulty}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Travel Time</p>
              <p className="font-bold text-brand-primary">{valley.travelTime}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <Sun size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Best Season</p>
              <p className="font-bold text-brand-primary">{valley.bestSeason}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Location</p>
              <p className="font-bold text-brand-primary truncate max-w-[150px]">{valley.mapLocation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-brand-primary mb-6">About {valley.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {valley.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">Top Attractions</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {valley.attractions.map((attr, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-brand-accent" />
                    <span className="text-gray-700 font-medium">{attr}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">Trekking Routes</h3>
              <div className="space-y-4">
                {valley.trekkingRoutes.map((route, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-accent transition-colors">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
                      <Mountain size={20} />
                    </div>
                    <span className="text-gray-700">{route}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {isFamous && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-brand-accent/5 border border-brand-accent/20 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">Why it's a Must-Visit</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {valley.name} is widely recognized as one of the most iconic destinations in Bagrote Valley. 
                    Known for its unparalleled panoramic views and rich cultural hospitality, it offers a 
                    perfect blend of adventure and tranquility that captures the true essence of Gilgit-Baltistan.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-serif font-bold text-brand-primary mb-1">98%</div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Visitor Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-serif font-bold text-brand-primary mb-1">#1</div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Photography Spot</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-serif font-bold text-brand-primary mb-1">Top</div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Cultural Experience</p>
                    </div>
                  </div>
                </div>
                <Star className="absolute -bottom-10 -right-10 text-brand-accent/10 w-48 h-48 rotate-12" />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-brand-primary text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="text-brand-accent" size={24} />
                <h3 className="text-xl font-serif font-bold">Safety Tips</h3>
              </div>
              <ul className="space-y-4">
                {valley.safetyTips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                    <span className="text-brand-accent">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
            >
              <h3 className="text-xl font-serif font-bold text-brand-primary mb-6">Location Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-400">Region</span>
                  <span className="font-bold text-brand-primary">Bagrote Valley</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-gray-400">District</span>
                  <span className="font-bold text-brand-primary">Gilgit</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="text-gray-400">Map Ref</span>
                  <span className="font-bold text-brand-primary">{valley.mapLocation}</span>
                </div>
              </div>
              <button className="w-full mt-6 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-accent transition-all">
                Open in Maps
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-brand-primary">Photo Gallery</h2>
            <Camera className="text-brand-accent" size={24} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {valley.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-video rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={img} alt={`${valley.name} gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Valleys */}
      {nearbyValleys.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-brand-primary">Explore Nearby</h2>
            <Link to="/explore" className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nearbyValleys.map((v) => (
              <Link 
                key={v.id} 
                to={`/valley/${v.id}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={getValleyImage(v.name, v.image)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={v.name} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {v.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {v.description}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mountain size={12} /> {v.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {v.travelTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/explore" className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
            Back to Explore
          </Link>
        </div>
      </section>
    </main>
  );
}
