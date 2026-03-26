import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Globe, Users, BarChart3, Download, ExternalLink, Briefcase } from 'lucide-react';
import Hero from '@/components/Hero';

const stats = [
  { label: 'Annual Visitors', value: '45,000+', growth: '+12%' },
  { label: 'Investment Potential', value: '$12M+', growth: 'High' },
  { label: 'Local Jobs Created', value: '1,200', growth: '+8%' },
  { label: 'Protected Area', value: '85%', growth: 'Stable' },
];

const opportunities = [
  {
    title: 'Eco-Lodge Development',
    desc: 'Sustainable luxury lodging opportunities in upper Bagrote.',
    roi: '15-18%',
    status: 'Open',
  },
  {
    title: 'Adventure Infrastructure',
    desc: 'Development of safe trekking routes and base camp facilities.',
    roi: '12-14%',
    status: 'Strategic',
  },
  {
    title: 'Organic Agriculture Export',
    desc: 'Scaling the production and export of high-altitude organic honey and fruits.',
    roi: '20%+',
    status: 'Growth',
  },
];

export default function Investors() {
  return (
    <main className="bg-white">
      <Hero 
        title="Investor Relations"
        subtitle="Partner with the Bagrote Valley Tourism Authority to build a sustainable, world-class destination."
        image="/Investor1.jpg"
        showScroll={false}
      />

      {/* Official Authority Badge */}
      <section className="py-12 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck size={32} className="text-brand-accent" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">Official Tourism Authority</h2>
              <p className="text-sm text-white/60">Regulated by the Gilgit-Baltistan Tourism Department</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
              <Download size={16} />
              Annual Report 2025
            </button>
            <button className="px-6 py-3 bg-brand-accent text-brand-primary rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
              Contact Authority
            </button>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-brand-primary mb-4">Market Insights</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Data-driven analysis of Bagrote Valley's tourism potential and growth trajectory.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
              <p className="text-3xl font-serif font-bold text-brand-primary mb-1">{stat.value}</p>
              <p className="text-[10px] font-bold text-brand-accent">{stat.growth}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-primary mb-2">Investment Opportunities</h2>
              <p className="text-gray-500">Strategic projects open for private equity and partnership.</p>
            </div>
            <Briefcase className="text-brand-accent" size={32} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {opp.status}
                  </span>
                  <TrendingUp size={20} className="text-gray-300 group-hover:text-brand-accent transition-colors" />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-primary mb-4">{opp.title}</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">{opp.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Target ROI</p>
                    <p className="font-bold text-brand-primary">{opp.roi}</p>
                  </div>
                  <button className="p-3 bg-gray-50 rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Vision */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/Investor2.jpg" 
              className="rounded-3xl shadow-2xl" 
              alt="Sustainable Tourism" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-brand-accent p-8 rounded-3xl shadow-xl hidden md:block">
              <p className="text-4xl font-serif font-bold text-brand-primary">2030</p>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Vision Goal</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-brand-primary leading-tight">Our Commitment to Sustainable Growth</h2>
            <p className="text-gray-600 leading-relaxed">
              We are building a tourism model that prioritizes environmental preservation and community empowerment. Our "Bagrote 2030" vision ensures that every investment contributes to the long-term health of our valley.
            </p>
            <div className="space-y-4">
              {[
                { icon: Globe, title: 'Zero-Waste Initiatives', desc: 'Implementing valley-wide waste management systems.' },
                { icon: Users, title: 'Community Equity', desc: 'Ensuring 70% of tourism revenue stays within local villages.' },
                { icon: BarChart3, title: 'Impact Monitoring', desc: 'Real-time tracking of environmental and social metrics.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brand-primary rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent rounded-full blur-[120px]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 relative z-10">Ready to Shape the Future?</h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10">
            Download our full investment prospectus or schedule a private briefing with our development team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="px-10 py-5 bg-brand-accent text-brand-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
              Download Prospectus
            </button>
            <button className="px-10 py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all">
              Contact Investment Team
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
