import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { Calendar, User, ArrowRight, Search, Tag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { BlogPost } from '@/types';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(['All']);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blog'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as BlogPost));
      setBlogPosts(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Travel Tips', 'Guide', 'Adventure', 'Culture'];

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => {
      if (cat === 'All') return ['All'];
      const withoutAll = prev.filter(c => c !== 'All');
      if (withoutAll.includes(cat)) {
        const next = withoutAll.filter(c => c !== cat);
        return next.length === 0 ? ['All'] : next;
      }
      return [...withoutAll, cat];
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = post.author.toLowerCase().includes(authorSearch.toLowerCase());
    const matchesCategory = activeCategories.includes('All') || activeCategories.includes(post.category);
    return matchesSearch && matchesAuthor && matchesCategory;
  });

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
        title="Valley Stories"
        subtitle="Insights, guides, and stories from the heart of the Karakoram."
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            <div className="grid gap-12">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        <span className="bg-brand-primary/5 px-3 py-1 rounded-full">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={14} />
                          {post.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-gray-400 font-serif text-xl italic">No articles found matching your search.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-80 space-y-12">
            {/* Search */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-brand-primary">Search Articles</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by title..." 
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by author..." 
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-brand-primary">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      activeCategories.includes(cat) 
                        ? "bg-brand-primary text-white shadow-md" 
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-8 rounded-3xl bg-brand-primary text-white space-y-4">
              <h3 className="text-xl font-serif font-bold">Stay Updated</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Subscribe to our newsletter for the latest travel guides and valley updates.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
                <button className="w-full py-3 bg-white text-brand-primary rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:text-white transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
