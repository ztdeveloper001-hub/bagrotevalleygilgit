import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mountain, Hotel, Tent, Loader2, Star } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Valley } from '@/types';

export default function Explore() {
  const [valleys, setValleys] = useState<Valley[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'valleys'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setValleys(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Valley)));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching valleys:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Helmet>
        <title>Explore Gilgit Baltistan Valleys | Bagrote Valley Guide</title>
        <meta name="description" content="Discover the best Gilgit Baltistan valleys. Explore Bagrote's hidden settlements, glaciers, and trekking routes with our comprehensive guide." />
        <meta name="keywords" content="Gilgit Baltistan valleys, Bagrote travel guide, Hidden valleys in Pakistan" />
      </Helmet>
      <Hero 
        title="Explore Bagrote"
        subtitle="Journey through the diverse landscapes, from lush orchards to ancient glaciers."
        image="/Explore1.jpg"
        showScroll={false}
        ctaLink="#villages"
        ctaText="View Villages"
      />

      <section id="villages" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold text-brand-primary mb-4">The Heart of the Karakoram</h2>
            <p className="text-gray-500 leading-relaxed">
              Bagrote Valley is divided into several distinct settlements, each with its own character, 
              microclimate, and traditions. Explore the unique beauty of each area.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Mountain size={20} className="text-brand-accent" />
            <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">{valleys.length}+ Settlements</p>
          </div>
        </div>

        {valleys.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valleys.map((valley, i) => (
              <motion.div
                key={valley.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                <Link to={`/valleys/${valley.id}`}>
                  <div className="relative h-72 overflow-hidden">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                        {valley.elevation}m
                      </span>
                      {(valley.name.toLowerCase().includes('gargoo') || valley.name.toLowerCase().includes('barcha')) && (
                        <span className="px-4 py-1.5 bg-brand-accent text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1">
                          <Star size={10} className="fill-brand-primary" /> Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {valley.location}
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                      {valley.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-8 leading-relaxed">
                      {valley.description}
                    </p>
                    <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all">
                      Explore Village <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Mountain className="mx-auto text-gray-300 mb-6" size={48} />
            <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">No Villages Found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              We're currently updating our directory of settlements. Please check back soon or visit the admin panel to add new locations.
            </p>
            <Link to="/admin" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent transition-all">
              Go to Admin Panel
            </Link>
          </div>
        )}
      </section>

      {/* Map Section */}
      <section className="py-24 bg-brand-primary text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-serif font-bold mb-6">Interactive Valley Map</h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Navigate through the complex geography of Bagrote Valley. Our interactive map helps you visualize 
              the connections between villages, glaciers, and trekking routes.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <MapPin size={14} className="text-brand-accent" /> Valleys
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Hotel size={14} className="text-blue-400" /> Hotels
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Tent size={14} className="text-green-400" /> Camping
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <InteractiveMap />
          </div>
        </div>
      </section>
    </main>
  );
}
