import { motion } from 'motion/react';
import { Github, Globe, Linkedin, Mail, Twitter, ExternalLink, Download, Code, Rocket, Heart, Star, Layout, Database, Smartphone } from 'lucide-react';
import Hero from '@/components/Hero';

const projects = [
  {
    title: 'Shina Keyboard AI',
    desc: 'A specialized AI-powered keyboard for the Shina language, enabling seamless communication and preservation of local heritage.',
    tech: ['React', 'AI/ML', 'Tailwind CSS'],
    link: 'https://shinakeyboardai.netlify.app',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Shina NLP',
    desc: 'Natural Language Processing tools specifically designed for the Shina language to support research and digital inclusion.',
    tech: ['Python', 'NLP', 'FastAPI'],
    link: 'https://shinanlp.netlify.app',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Developer Portfolio',
    desc: 'My personal showcase of projects, skills, and digital experiences crafted for the global community.',
    tech: ['React', 'Vite', 'Framer Motion'],
    link: 'https://zaighamtd.netlify.app',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
  }
];

const skills = [
  { name: 'Frontend Development', icon: <Layout size={24} />, level: 'Expert' },
  { name: 'Backend Systems', icon: <Database size={24} />, level: 'Advanced' },
  { name: 'Mobile Apps', icon: <Smartphone size={24} />, level: 'Advanced' },
  { name: 'UI/UX Design', icon: <Star size={24} />, level: 'Expert' },
];

export default function Developer() {
  return (
    <main className="bg-white min-h-screen">
      <Hero 
        title="Meet the Developer"
        subtitle="Crafting digital experiences for the Bagrote Valley and beyond."
        image="/developer2.jpeg"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest">
              <Code size={14} />
              Lead Developer & Designer
            </div>
            <h2 className="text-5xl font-serif font-bold text-brand-primary leading-tight">
              Zaigham the Developer <br />
              <span className="text-brand-accent">(ztdeveloper)</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              I am a full-stack developer and digital strategist passionate about leveraging technology to empower local communities. My work focuses on building sustainable digital ecosystems that bridge the gap between traditional heritage and modern innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:zaighama377@gamil.com" className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all flex items-center gap-2">
                <Mail size={16} />
                Get in Touch
              </a>
              <div className="flex items-center gap-2">
                <a href="https://github.com/ztdeveloper001-hub" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href="https://zaighamtd.netlify.app" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                  <Globe size={20} />
                </a>
                <a href="#" className="p-4 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl">
              <img src="/developer1.jpeg" className="w-full h-full object-cover" alt="Zaigham" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-12 -left-12 p-8 rounded-3xl bg-white shadow-2xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center">
                  <Rocket size={24} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-brand-primary">100+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Projects Delivered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-brand-primary mb-4">Technical Expertise</h2>
            <p className="text-gray-500">Specializing in modern web technologies and scalable architectures.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-primary mb-2">{skill.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects & Marketing */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-brand-primary">My Apps & Portfolio</h2>
            <p className="text-gray-500">Explore my real-world applications and digital solutions.</p>
          </div>
          <a href="https://zaighamtd.netlify.app" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors">
            View Portfolio <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a href={project.link} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors">
                    Visit Site <ExternalLink size={12} />
                  </a>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors">
                    Download <Download size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="p-16 rounded-[48px] bg-brand-primary text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 space-y-8"
          >
            <div className="w-20 h-20 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center mx-auto mb-8">
              <Heart size={40} fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold max-w-3xl mx-auto leading-tight">
              Let's Build Something Amazing for the Valley
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-serif italic">
              "Technology is at its best when it brings people together and preserves what truly matters."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:zaighama377@gamil.com" className="px-12 py-5 bg-brand-accent text-brand-primary rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
                Start a Collaboration
              </a>
              <a href="https://zaighamtd.netlify.app" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-white/10 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all backdrop-blur-md">
                View Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
