import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Loader2, ArrowLeft, Calendar, Tag } from 'lucide-react';
import Hero from '@/components/Hero';
import { db } from '@/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Author, BlogPost } from '@/types';

export default function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'authors', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAuthor({ ...docSnap.data(), id: docSnap.id } as Author);
          
          // Fetch author's posts
          const q = query(collection(db, 'blog'), where('authorId', '==', id));
          const querySnapshot = await getDocs(q);
          setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost)));
        } else if (id === 'default') {
          // Mock default author if not found
          setAuthor({
            id: 'default',
            name: 'Bagrote Explorer',
            bio: 'A passionate traveler and storyteller dedicated to uncovering the hidden gems of the Bagrote Valley. With years of experience trekking through the Karakoram, I share insights on culture, adventure, and sustainable travel.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
            socials: {
              facebook: '#',
              twitter: '#',
              instagram: '#'
            }
          });
          
          const q = query(collection(db, 'blog'), where('author', '==', 'Bagrote Explorer'));
          const querySnapshot = await getDocs(q);
          setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost)));
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif font-bold text-brand-primary">Author Not Found</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Hero 
        title={author.name}
        subtitle="Author Profile"
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Author Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img src={author.image} className="w-full h-full object-cover" alt={author.name} referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-brand-primary">{author.name}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {author.bio}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {author.socials.facebook && (
                  <a href={author.socials.facebook} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                    <Facebook size={20} />
                  </a>
                )}
                {author.socials.twitter && (
                  <a href={author.socials.twitter} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                    <Twitter size={20} />
                  </a>
                )}
                {author.socials.linkedin && (
                  <a href={author.socials.linkedin} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                    <Linkedin size={20} />
                  </a>
                )}
                {author.socials.instagram && (
                  <a href={author.socials.instagram} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Author Posts */}
          <div className="lg:col-span-2 space-y-12">
            <h3 className="text-2xl font-serif font-bold text-brand-primary pb-4 border-b border-gray-100">
              Articles by {author.name}
            </h3>
            <div className="grid gap-12">
              {posts.map((post) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        <span className="bg-brand-primary/5 px-3 py-1 rounded-full">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <Calendar size={12} />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <Tag size={12} />
                          {post.category}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
              {posts.length === 0 && (
                <p className="text-center text-gray-400 font-serif italic py-12">No articles published yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
