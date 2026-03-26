import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import { Mountain, Wind, Map, Compass } from 'lucide-react';

const activities = [
  { title: "Trekking", icon: Mountain, desc: "From day hikes to multi-day expeditions to Rakaposhi Base Camp." },
  { title: "Camping", icon: Wind, desc: "Sleep under the clearest skies in the world at high-altitude meadows." },
  { title: "Mountaineering", icon: Compass, desc: "Challenge yourself on some of the most technical peaks in the Karakoram." },
  { title: "Local Guides", icon: Map, desc: "Expert local guides to ensure your safety and enrich your experience." }
];

export default function Adventure() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Trekking in Bagrote | Adventure Travel Pakistan</title>
        <meta name="description" content="Experience world-class trekking in Bagrote Valley. From Rakaposhi Base Camp to Hinarchi Glacier, find your next adventure in Gilgit Baltistan." />
        <meta name="keywords" content="Trekking in Bagrote, Bagrote Valley tourism, Hidden valleys in Pakistan" />
      </Helmet>
      <Hero 
        title="Adventure Awaits"
        subtitle="Push your limits in one of the most rugged and rewarding landscapes on Earth."
        image="https://picsum.photos/seed/adventure-hero/1920/1080"
        showScroll={false}
      />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-4">Choose Your Challenge</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Whether you're a seasoned climber or a weekend hiker, Bagrote offers adventures for every level.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-brand-primary hover:text-white transition-all group"
            >
              <act.icon className="text-brand-accent mb-6 group-hover:text-white transition-colors" size={40} />
              <h3 className="text-xl font-serif font-bold mb-4">{act.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{act.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
