import { motion } from 'motion/react';
import { Landmark, Info, Phone, Mail, MapPin, Globe, ShieldCheck, HelpCircle } from 'lucide-react';

export default function TourismCenter() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/History.jpeg" 
            alt="Tourism Information Center" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 backdrop-blur-md text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Landmark size={14} />
            Government of Gilgit-Baltistan
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Tourism Information <span className="text-brand-accent italic">Center</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 font-light max-w-2xl mx-auto"
          >
            Your official gateway to exploring the wonders of Bagrote Valley and Gilgit-Baltistan.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Info */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-primary mb-6">About the Center</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The Tourism Information Center (TIC) in Farfooh, Bagrote Valley, is a dedicated facility established by the Government of Gilgit-Baltistan to assist travelers, researchers, and adventurers. Our center serves as a hub for reliable information, permits, and guidance for exploring the Karakoram range.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <ShieldCheck className="text-brand-accent mb-4" size={32} />
                    <h3 className="font-bold text-brand-primary mb-2">Official Guidance</h3>
                    <p className="text-sm text-gray-500">Verified information about trekking routes, weather conditions, and safety protocols.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <HelpCircle className="text-brand-accent mb-4" size={32} />
                    <h3 className="font-bold text-brand-primary mb-2">Visitor Support</h3>
                    <p className="text-sm text-gray-500">Assistance with local logistics, guide hiring, and emergency contacts.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-primary mb-6">GB Tourism Policies</h2>
                <div className="space-y-4">
                  {[
                    "Sustainable Tourism Development Policy 2024",
                    "Environmental Protection Regulations for High Altitudes",
                    "Local Community Engagement & Benefit Sharing",
                    "Adventure Tourism Safety Standards",
                    "Cultural Heritage Preservation Guidelines"
                  ].map((policy, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-accent transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors">
                        <Info size={18} />
                      </div>
                      <span className="font-medium text-brand-primary">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Sidebar */}
            <div className="space-y-8">
              <div className="bg-brand-primary text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-serif font-bold mb-6">Visit Us</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-brand-accent shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">Location</p>
                      <p className="text-white/70 text-sm">Tourism Information Center, Farfooh, Bagrote Valley, Gilgit-Baltistan</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-brand-accent shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-white/70 text-sm">+9203474336806</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="text-brand-accent shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white/70 text-sm">tic.farfooh@gb.gov.pk</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className="text-brand-accent shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">Website</p>
                      <p className="text-white/70 text-sm">www.tourism.gb.gov.pk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-brand-accent/10 rounded-3xl border border-brand-accent/20">
                <h3 className="text-lg font-bold text-brand-primary mb-4">Operating Hours</h3>
                <div className="space-y-2 text-sm text-brand-primary/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-bold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-bold text-red-500 uppercase">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
