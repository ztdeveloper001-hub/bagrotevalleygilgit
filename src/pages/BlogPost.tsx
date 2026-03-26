import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, MessageSquare, Tag, Loader2, Facebook, Twitter, Linkedin, Send, Clock } from 'lucide-react';
import Hero from '@/components/Hero';
import { db } from '@/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, addDoc, serverTimestamp, orderBy, onSnapshot } from 'firebase/firestore';
import { BlogPost as BlogPostType, Comment } from '@/types';
import { useAuth } from '@/hooks/useAuth';

import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ userName: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'blog', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = { ...docSnap.data(), id: docSnap.id } as BlogPostType;
          setPost(postData);

          // Fetch related posts
          const relatedQuery = query(
            collection(db, 'blog'),
            where('category', '==', postData.category),
            limit(4)
          );
          const relatedSnap = await getDocs(relatedQuery);
          const related = relatedSnap.docs
            .map(doc => ({ ...doc.data(), id: doc.id } as BlogPostType))
            .filter(p => p.id !== id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', id),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Comment)));
    });
    return () => unsubscribe();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || (!user && !newComment.userName) || !newComment.content) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        postId: id,
        userId: user?.uid || null,
        userName: user?.displayName || newComment.userName,
        content: newComment.content,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        createdAt: serverTimestamp()
      });
      setNewComment({ userName: '', content: '' });
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = post?.title || 'Bagrote Valley Blog';

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={18} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Twitter', icon: <Twitter size={18} />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}` },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif font-bold text-brand-primary">Article Not Found</h1>
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
        title={post.title}
        subtitle={`${post.category} • ${post.date}`}
        image={post.image}
        showScroll={false}
      />

      <article className="py-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-8">
            <Link to={`/author/${post.authorId || 'default'}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-accent transition-colors">
              <User size={16} className="text-brand-accent" />
              <span className="font-bold uppercase tracking-widest text-[10px]">{post.author}</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} className="text-brand-accent" />
              <span className="font-bold uppercase tracking-widest text-[10px]">{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} className="text-brand-accent" />
              <span className="font-bold uppercase tracking-widest text-[10px]">{post.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Share:</span>
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all"
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-primary prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-a:text-brand-accent hover:prose-a:text-brand-primary transition-colors">
          <p className="text-xl text-gray-500 font-serif italic mb-12 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <Link to="/blog" className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-[10px] hover:text-brand-accent transition-colors">
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
            <div className="flex flex-wrap gap-2">
              <Tag size={14} className="text-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">{post.category}</span>
              {post.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/5 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-32 pt-24 border-t border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-brand-primary mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/blog/${related.id}`} className="group space-y-4">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                    <img src={related.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={related.title} referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{related.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="mt-32 pt-24 border-t border-gray-100">
          <div className="flex items-center gap-4 mb-12">
            <MessageSquare className="text-brand-accent" size={32} />
            <h2 className="text-3xl font-serif font-bold text-brand-primary">Comments ({comments.length})</h2>
          </div>

          <form onSubmit={handleCommentSubmit} className="mb-16 p-8 rounded-3xl bg-gray-50 border border-gray-100 space-y-6">
            <h3 className="text-xl font-serif font-bold text-brand-primary">Leave a Comment</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={newComment.userName}
                  onChange={(e) => setNewComment(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Comment</label>
              <textarea 
                required
                rows={4}
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your thoughts..."
                className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all resize-none"
              />
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {comments.map((comment) => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-bold text-brand-primary">{comment.userName}</h4>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {comments.length === 0 && (
              <p className="text-center text-gray-400 font-serif italic py-12">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
