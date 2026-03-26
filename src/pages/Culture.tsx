import { motion } from 'motion/react';
import Hero from '@/components/Hero';

export default function Culture() {
  return (
    <main className="bg-white">
      <Hero 
        title="Heritage & Culture"
        subtitle="Discover the ancient traditions, languages, and hospitality of the Shina people."
        image="https://picsum.photos/seed/culture-hero/1920/1080"
        showScroll={false}
      />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src="https://picsum.photos/seed/culture-img/1000/1200" alt="Culture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-brand-primary mb-6">The Shina Legacy</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              The people of Bagrote Valley have preserved their unique Shina culture for centuries. 
              Known for their hospitality and deep connection to the land, the locals welcome visitors 
              with open arms and stories of the mountains.
            </p>
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-primary">Traditional Festivals</h3>
              <p className="text-gray-500 text-sm">Experience local celebrations like the harvest festival, featuring traditional music, dance, and food.</p>
              
              <h3 className="font-serif text-xl font-bold text-brand-primary">Local Crafts</h3>
              <p className="text-gray-500 text-sm">Discover hand-woven textiles, woodwork, and unique jewelry crafted by local artisans.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
