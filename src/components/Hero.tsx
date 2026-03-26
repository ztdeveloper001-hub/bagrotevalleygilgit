import { motion } from 'motion/react';
import { ChevronDown, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  showScroll?: boolean;
  ctaLink?: string;
  ctaText?: string;
}

export default function Hero({ title, subtitle, image, showScroll = true, ctaLink, ctaText = "Start Your Journey" }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-500",
        !showScroll ? "pt-20 pb-32" : "py-20"
      )}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-accent font-mono text-sm uppercase tracking-[0.3em] mb-4 drop-shadow-md"
        >
          Welcome to the Karakoram
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white text-5xl md:text-8xl font-serif font-bold leading-tight mb-6 drop-shadow-2xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {ctaLink ? (
            <a href={ctaLink} className="px-8 py-4 bg-white text-brand-primary rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl">
              {ctaText}
            </a>
          ) : (
            <button className="px-8 py-4 bg-white text-brand-primary rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl">
              {ctaText}
            </button>
          )}
          <button className="flex items-center gap-3 text-white group">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-brand-primary transition-all">
              <Play size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Watch Film</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Discover More</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
