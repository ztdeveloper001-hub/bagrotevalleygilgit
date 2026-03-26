import { motion } from 'motion/react';
import Hero from '@/components/Hero';
import { History, Globe, Users, Languages, Sprout, Star } from 'lucide-react';

const sections = [
  {
    id: 'history',
    title: 'History of Bagrote Valley',
    icon: History,
    content: `Bagrote Valley has a rich and ancient history, serving as a secluded sanctuary in the Karakoram for centuries. Historically, it was part of the Gilgit Agency and has been inhabited by the Shina-speaking people who migrated to these high-altitude regions. The valley's isolation preserved its unique traditions and social structures, making it a living museum of mountain life. Ancient water channels and stone architecture still seen today are testaments to the ingenuity of early settlers who tamed this rugged landscape.`,
    image: '/History.jpeg'
  },
  {
    id: 'geography',
    title: 'Geography & Landscape',
    icon: Globe,
    content: `Situated at the heart of the Karakoram Range, Bagrote Valley is characterized by its dramatic verticality. The valley rises from around 2,500m to the towering 7,788m summit of Rakaposhi. It is home to massive glaciers like Hinarchi and Gutumi, which carve through the mountains and provide the lifeblood for the villages below. The landscape transitions from arid, rocky slopes to lush alpine meadows and dense forests of juniper and pine, offering a microcosm of the Karakoram's diverse ecosystems.`,
    image: '/Geography.jpeg'
  },
  {
    id: 'culture',
    title: 'Culture & Traditions',
    icon: Users,
    content: `The culture of Bagrote is deeply rooted in the Shina heritage. The people are known for their extraordinary hospitality and a strong sense of community. Traditional music, played with instruments like the Dadang (drum) and Surnai (flute), accompanies vibrant folk dances during festivals. The social fabric is woven around seasonal cycles, with communal celebrations for sowing and harvesting. Folklore and oral traditions continue to pass down the wisdom of the ancestors to the younger generations.`,
    image: '/Culture.jpeg'
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: Languages,
    content: `Shina is the primary language spoken in Bagrote Valley, with local dialects that reflect the valley's unique identity. While Urdu is widely understood and used for education and administration, Shina remains the language of the home, poetry, and traditional songs. In recent years, with the rise of tourism, many locals have also become proficient in English to better assist international visitors, bridging the gap between ancient traditions and the modern world.`,
    image: '/language1.jpeg'
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Lifestyle',
    icon: Sprout,
    content: `Agriculture is the backbone of the Bagrote lifestyle. The valley is famous for its high-quality fruits, including apricots, apples, cherries, and walnuts. Farmers use a sophisticated system of gravity-fed irrigation channels (Kuhls) to water their terraced fields. Livestock rearing, particularly goats and yaks, is also central to the economy, providing wool, milk, and meat. The lifestyle is one of hard work and harmony with nature, dictated by the changing seasons of the high mountains.`,
    image: '/Agriculture.jpg'
  },
  {
    id: 'tourism',
    title: 'Importance in GB Tourism',
    icon: Star,
    content: `Bagrote Valley is rapidly becoming a cornerstone of tourism in Gilgit-Baltistan. Its proximity to Gilgit city makes it an accessible yet pristine destination. It serves as a vital hub for adventure tourism, offering some of the best trekking routes to the base camps of Rakaposhi and Diran. Beyond adventure, its cultural authenticity and stunning landscapes make it a prime location for eco-tourism and sustainable travel initiatives, contributing significantly to the regional economy while preserving its natural beauty.`,
    image: '/Tourism.jpg'
  }
];

export default function About() {
  return (
    <main className="bg-white">
      <Hero 
        title="About Bagrote"
        subtitle="A journey through the history, culture, and breathtaking landscapes of the hidden paradise."
        image="/About1.jpeg"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-32">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center">
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary">{section.title}</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {section.content}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-brand-primary text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">7,788m</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Highest Peak (Rakaposhi)</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">15+</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Villages & Settlements</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">1hr</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Drive from Gilgit</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">2,500m</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Average Elevation</p>
          </div>
        </div>
      </section>
    </main>
  );
}
