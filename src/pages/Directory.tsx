import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '@/components/Hero';
import { 
  Hotel, 
  MapPin, 
  Phone, 
  Star, 
  Users, 
  Car, 
  Tent, 
  Search, 
  MessageSquare,
  X,
  CheckCircle2,
  Info,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { db, auth } from '@/firebase';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { DirectoryListing } from '@/types';

const categories = [
  { id: 'all', name: 'All', icon: Info },
  { id: 'hotels', name: 'Hotels & Guest Houses', icon: Hotel },
  { id: 'guides', name: 'Tour Guides', icon: Users },
  { id: 'jeeps', name: 'Jeep Services', icon: Car },
  { id: 'camping', name: 'Camping Services', icon: Tent },
];

export default function Directory() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBiz, setSelectedBiz] = useState<DirectoryListing | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'directory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setListings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as DirectoryListing)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredListings = listings.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleInquiry = (biz: DirectoryListing) => {
    setSelectedBiz(biz);
    setIsModalOpen(true);
    setFormStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBiz) return;
    
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const inquiryData = {
      userId: auth.currentUser?.uid || 'anonymous',
      userEmail: formData.get('email') as string,
      userName: formData.get('name') as string,
      serviceId: selectedBiz.id,
      serviceName: selectedBiz.name,
      serviceCategory: selectedBiz.category,
      date: formData.get('date') as string,
      message: formData.get('message') as string,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'bookings'), inquiryData);
      setFormStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus('idle');
      }, 2000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setFormStatus('idle');
      alert("Failed to submit inquiry. Please try again.");
    }
  };

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
        title="Local Directory"
        subtitle="Connect with trusted hotels, guides, and services in Bagrote Valley."
        image="/Local1.jpg"
        showScroll={false}
      />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Search and Filter */}
        <div className="mb-16 space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              className="w-full pl-16 pr-6 py-5 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === cat.id 
                    ? "bg-brand-primary text-white shadow-lg" 
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                )}
              >
                <cat.icon size={16} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((biz) => (
              <motion.div
                key={biz.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={biz.image} 
                    alt={biz.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    {biz.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-brand-primary">{biz.name}</h3>
                      <div className="flex items-center gap-2 text-brand-accent mt-1">
                        <MapPin size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{biz.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-brand-accent">
                      <Star size={14} className="fill-brand-accent" />
                      <span className="text-sm font-bold">{biz.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-2">
                    {biz.desc}
                  </p>
                  <div className="flex items-center gap-4">
                    <a 
                      href={`tel:${biz.contact}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gray-50 text-brand-primary text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                    >
                      <Phone size={14} />
                      Call
                    </a>
                    <button 
                      onClick={() => handleInquiry(biz)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-md"
                    >
                      <MessageSquare size={14} />
                      Inquiry
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 font-serif text-xl italic">No listings found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X size={20} className="text-gray-400" />
              </button>

              <div className="p-8 md:p-12">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-primary mb-2">Inquiry Sent!</h3>
                    <p className="text-gray-500">The business owner will contact you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-brand-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Booking Inquiry</p>
                      <h3 className="text-2xl font-serif font-bold text-brand-primary">Contact {selectedBiz?.name}</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                          <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                          <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Service Date</label>
                        <input required type="date" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message / Requirements</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" placeholder="E.g. Number of guests, specific route, etc."></textarea>
                      </div>
                      <button 
                        disabled={formStatus === 'submitting'}
                        className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg disabled:opacity-50"
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
