import { motion } from 'motion/react';
import Hero from '@/components/Hero';
import { Plane, Car, Bus, Sun, CloudRain, Thermometer, Camera, Map, Users, Sprout, Tent, Mountain, ChevronDown } from 'lucide-react';

const climateData = [
  { month: 'Jan', temp: '-5°C / 5°C', condition: 'Snowy' },
  { month: 'Feb', temp: '-3°C / 7°C', condition: 'Snowy' },
  { month: 'Mar', temp: '2°C / 12°C', condition: 'Chilly' },
  { month: 'Apr', temp: '8°C / 18°C', condition: 'Pleasant' },
  { month: 'May', temp: '12°C / 24°C', condition: 'Sunny' },
  { month: 'Jun', temp: '15°C / 28°C', condition: 'Warm' },
  { month: 'Jul', temp: '18°C / 32°C', condition: 'Hot' },
  { month: 'Aug', temp: '17°C / 30°C', condition: 'Warm' },
  { month: 'Sep', temp: '12°C / 25°C', condition: 'Pleasant' },
  { month: 'Oct', temp: '6°C / 18°C', condition: 'Cool' },
  { month: 'Nov', temp: '1°C / 10°C', condition: 'Cold' },
  { month: 'Dec', temp: '-4°C / 6°C', condition: 'Freezing' },
];

export default function TravelGuide() {
  return (
    <main className="bg-white">
      <Hero 
        title="Travel Guide"
        subtitle="Everything you need to plan your perfect journey to Bagrote Valley."
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
        showScroll={false}
      />

      {/* How to Reach */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Logistics</p>
            <h2 className="text-4xl font-serif font-bold text-brand-primary mb-6">How to Reach</h2>
            <p className="text-gray-500 leading-relaxed">
              Bagrote Valley is accessible via Gilgit, the administrative capital of Gilgit-Baltistan. 
              The journey itself is an adventure through some of the world's highest mountain ranges.
            </p>
          </div>
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-6">
                <Plane size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-primary mb-4">From Islamabad</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-accent font-bold">01.</span>
                  <span><strong>By Air:</strong> A 1-hour scenic flight to Gilgit Airport (subject to weather).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-accent font-bold">02.</span>
                  <span><strong>By Road:</strong> A 14-16 hour drive via the Karakoram Highway (KKH) or Naran-Kaghan road (seasonal).</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-6">
                <Car size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-primary mb-4">From Gilgit City</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-accent font-bold">01.</span>
                  <span><strong>Private Jeep:</strong> The most flexible option, taking about 1-1.5 hours.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-accent font-bold">02.</span>
                  <span><strong>Local Transport:</strong> Hiace vans depart regularly from Gilgit's main bus terminal.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Information */}
      <section className="py-24 bg-brand-primary text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Climate</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Weather Information</h2>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <Sun size={16} className="text-brand-accent" />
              <span className="text-sm font-bold uppercase tracking-widest">Best Season: May to September</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 font-serif text-lg">Month</th>
                  <th className="py-6 font-serif text-lg">Temperature</th>
                  <th className="py-6 font-serif text-lg">Condition</th>
                </tr>
              </thead>
              <tbody>
                {climateData.map((data, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono text-sm tracking-widest">{data.month}</td>
                    <td className="py-4 text-white/70">{data.temp}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-widest">
                        {data.condition}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Things To Do */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Activities</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-6">Things To Do</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Mountain />, title: 'Trekking', desc: 'From day hikes to multi-day glacier expeditions like the Diran Base Camp trek.' },
            { icon: <Tent />, title: 'Camping', desc: 'Sleep under the stars at Rakaposhi Base Camp or Hinarchi Glacier.' },
            { icon: <Camera />, title: 'Photography', desc: 'Capture the dramatic verticality of the Karakoram and the vibrant local culture.' },
            { icon: <Users />, title: 'Cultural Exploration', desc: 'Visit ancient villages, listen to Shina music, and learn about local traditions.' },
            { icon: <Sprout />, title: 'Farming Experience', desc: 'Participate in traditional fruit harvesting or learn about the Kuhl irrigation system.' },
            { icon: <Map />, title: 'Village Hopping', desc: 'Explore the 11 sub-valleys, each offering a unique landscape and community.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-gray-100 hover:border-brand-accent transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-primary mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000" 
                alt="Transport in Bagrote" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Getting Around</p>
              <h2 className="text-4xl font-serif font-bold text-brand-primary mb-6">Transport Options</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-brand-accent flex items-center justify-center text-brand-accent">
                    <Car size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-2">4x4 Jeeps</h4>
                    <p className="text-sm text-gray-500">Essential for reaching higher valleys like Farfooh or Chirrah where roads are unpaved.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-brand-accent flex items-center justify-center text-brand-accent">
                    <Bus size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-2">Local Hiace</h4>
                    <p className="text-sm text-gray-500">Affordable shared transport between Gilgit and Sinakar. Great for budget travelers.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-brand-accent flex items-center justify-center text-brand-accent">
                    <Mountain size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-2">Walking/Trekking</h4>
                    <p className="text-sm text-gray-500">The best way to truly experience the valley. Many sub-valleys are only connected by trails.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-accent font-mono text-xs uppercase tracking-[0.3em] mb-4">Help Center</p>
          <h2 className="text-4xl font-serif font-bold text-brand-primary mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What are the visa requirements for visiting Gilgit-Baltistan?",
              a: "Most foreign nationals require a standard Pakistan Tourist Visa. Some nationalities are eligible for Visa on Arrival or E-Visa. Additionally, certain areas in GB might require a No Objection Certificate (NOC) for foreign tourists, though Bagrote Valley is generally accessible. Always check the latest regulations from the official Pakistan Online Visa portal."
            },
            {
              q: "What is the best local transportation to reach Bagrote from Gilgit?",
              a: "The most reliable way is hiring a private 4x4 Jeep from Gilgit city, which takes about 1-1.5 hours. For budget travelers, local Hiace vans depart from the main Gilgit bus terminal (Gari Bagh) multiple times a day, primarily heading to Sinakar village."
            },
            {
              q: "Who should I contact in case of an emergency?",
              a: "In case of emergency, contact the Gilgit-Baltistan Tourism Police or the main Gilgit City Hospital. Local village heads (Numberdars) are also extremely helpful and should be your first point of contact within the valley. Emergency Numbers: Police (15), Ambulance (115), Tourism Helpline (1422)."
            },
            {
              q: "Is there mobile network or internet in Bagrote Valley?",
              a: "SCOM is the primary network provider in the valley and offers the best coverage. While 4G is available in lower villages like Sinakar, connectivity becomes limited or non-existent as you move higher into the sub-valleys and trekking routes."
            }
          ].map((faq, i) => (
            <details key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h4 className="font-serif font-bold text-brand-primary pr-4">{faq.q}</h4>
                <div className="w-8 h-8 rounded-full border border-brand-accent flex items-center justify-center text-brand-accent group-open:rotate-180 transition-transform">
                  <ChevronDown size={18} />
                </div>
              </summary>
              <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
