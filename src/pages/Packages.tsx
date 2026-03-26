import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Hero from '@/components/Hero';
import { Calendar, CheckCircle2, Clock, MapPin, Package, Star, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { db } from '@/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { TourPackage } from '@/types';

export default function Packages() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'packages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as TourPackage)));
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
      <Hero 
        title="Tour Packages"
        subtitle="Curated experiences designed to showcase the best of Bagrote Valley."
        image="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=2000"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold text-brand-primary mb-4">Choose Your Adventure</h2>
            <p className="text-gray-500 leading-relaxed">
              From high-altitude treks to cultural immersions, our packages are all-inclusive and led by local experts who know every corner of the valley.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <TrendingUp size={20} className="text-brand-accent" />
            <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">Best Price Guaranteed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {pkg.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="bg-brand-primary/90 backdrop-blur-md px-4 py-2 rounded-xl text-white flex items-center gap-2">
                    <Star size={14} className="text-brand-accent fill-brand-accent" />
                    <span className="text-xs font-bold">{pkg.rating}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-brand-primary font-serif font-bold">
                    ${pkg.price}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {pkg.duration}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                  {pkg.title}
                </h3>
                <div className="space-y-3 mb-8">
                  {['Local Expert Guide', 'All Meals Included', 'Equipment Provided'].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-500">
                      <CheckCircle2 size={16} className="text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link to="/bookings" className="block w-full py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg text-center">
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Scalability: Booking CTA */}
      <section className="py-24 px-6 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1541414779316-956a5084c0d4?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Package size={48} className="text-brand-accent mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Custom Tour Packages</h2>
          <p className="text-white/70 text-lg mb-12 leading-relaxed">
            Need a personalized itinerary for your group or family? Our travel consultants can design the perfect Bagrote experience tailored to your interests and budget.
          </p>
          <button className="px-12 py-5 bg-brand-accent text-brand-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl">
            Contact Our Experts
          </button>
        </div>
      </section>
    </main>
  );
}
