import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '@/components/Hero';
import { Calendar, CheckCircle2, Clock, MapPin, Package, Star, TrendingUp, Hotel, Mountain, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

export default function Bookings() {
  const { user } = useAuth();
  const [activeType, setActiveType] = useState<'hotel' | 'trek' | 'package'>('hotel');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1 Guest',
    type: 'Standard Room',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to make a booking.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        userId: user.uid,
        bookingType: activeType,
        status: 'pending',
        createdAt: Timestamp.now(),
        totalPrice: 120 // Mock price for now
      });
      setSuccess(true);
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: '1 Guest',
        type: 'Standard Room',
        name: '',
        email: '',
        phone: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f8f9fa] min-h-screen">
      <Hero 
        title="Online Bookings"
        subtitle="Secure your stay, trek, or tour package with our integrated booking system."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { id: 'hotel', name: 'Hotels & Stays', icon: Hotel },
            { id: 'trek', name: 'Trek Bookings', icon: Mountain },
            { id: 'package', name: 'Tour Packages', icon: Package },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id as any)}
              className={cn(
                "flex items-center gap-4 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
                activeType === type.id 
                  ? "bg-brand-primary text-white shadow-xl" 
                  : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
              )}
            >
              <type.icon size={18} className={cn(activeType === type.id ? "text-brand-accent" : "text-gray-300")} />
              {type.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-3xl font-serif font-bold text-brand-primary mb-8">Reservation Details</h3>
              
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-green-50 text-green-700 rounded-2xl flex items-center gap-4"
                >
                  <CheckCircle2 className="text-green-500" />
                  <p className="font-bold text-sm uppercase tracking-widest">Booking inquiry sent successfully! We will contact you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Check-in Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        required
                        type="date" 
                        value={formData.checkIn}
                        onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                        className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Check-out Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        required
                        type="date" 
                        value={formData.checkOut}
                        onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                        className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Number of Guests</label>
                    <div className="relative">
                      <Users size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select 
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                      >
                        <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4+ Guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Room/Trek Type</label>
                    <div className="relative">
                      <Hotel size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                      >
                        <option>Standard Room</option><option>Deluxe Suite</option><option>Family Room</option><option>Traditional Hut</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-green-50 text-green-600">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Estimated Total</p>
                      <p className="text-2xl font-serif font-bold text-brand-primary">$120.00</p>
                    </div>
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full md:w-auto px-12 py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : 'Proceed to Payment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Future Scalability: Booking Policy */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-brand-primary">Flexible Cancellation</h4>
                <p className="text-sm text-gray-500">Cancel up to 48 hours before your arrival for a full refund.</p>
              </div>
            </div>
          </div>

          {/* Sidebar: Recent Bookings / Info */}
          <div className="space-y-8">
            <div className="bg-brand-primary p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">Why Book with Us?</h3>
              <div className="space-y-6 relative z-10">
                {[
                  { title: 'Local Support', desc: '24/7 assistance from our valley office.' },
                  { title: 'Verified Stays', desc: 'Every hotel is personally inspected by our team.' },
                  { title: 'Secure Payment', desc: 'Industry-standard encryption for all transactions.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-brand-accent" /></div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Scalability: Mobile App Promo */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={24} className="text-brand-primary" />
              </div>
              <h4 className="font-serif font-bold text-brand-primary mb-2">Get the App</h4>
              <p className="text-xs text-gray-500 mb-6">Manage your bookings on the go with our mobile app.</p>
              <button className="w-full py-3 border-2 border-brand-primary text-brand-primary rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-primary hover:text-white transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
