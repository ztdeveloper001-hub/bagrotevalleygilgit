import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ShoppingBag, Star, Package, Truck, ShieldCheck, Search, Filter, ShoppingCart, X, CheckCircle2, Heart, Globe, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Hero from '@/components/Hero';
import { db } from '@/firebase';
import { collection, addDoc, query, onSnapshot, orderBy, limit, where } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

const categories = ['All', 'Organic Food', 'Handicrafts', 'Textiles', 'Experiences'];

const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'PKR', symbol: 'Rs.', rate: 280 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
];

const products = [
  {
    id: 'p1',
    name: 'Pure Bagrote Wildflower Honey',
    category: 'Organic Food',
    price: 25,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    desc: 'Harvested from high-altitude wildflowers in the Bagrote Valley. 100% raw and organic.',
    stock: 45,
  },
  {
    id: 'p2',
    name: 'Hand-Woven Woolen Shawl',
    category: 'Textiles',
    price: 85,
    rating: 4.8,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
    desc: 'Traditional patterns woven by local artisans using pure mountain sheep wool.',
    stock: 12,
  },
  {
    id: 'p3',
    name: 'Dried Apricots (Sun-Dried)',
    category: 'Organic Food',
    price: 15,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=800',
    desc: 'Naturally sun-dried apricots from the orchards of Sinakar village. No preservatives.',
    stock: 120,
  },
  {
    id: 'p4',
    name: 'Traditional Walnut Carving',
    category: 'Handicrafts',
    price: 120,
    rating: 5.0,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    desc: 'Exquisite hand-carved decorative box made from aged walnut wood.',
    stock: 5,
  },
  {
    id: 'p5',
    name: 'Village Homestay Voucher',
    category: 'Experiences',
    price: 50,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    desc: 'A one-night stay voucher for a traditional homestay experience in Farfu village.',
    stock: 50,
  },
  {
    id: 'p6',
    name: 'Mountain Herb Tea Blend',
    category: 'Organic Food',
    price: 12,
    rating: 4.6,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    desc: 'A unique blend of wild mountain herbs known for their healing properties.',
    stock: 200,
  },
];

export default function Marketplace() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: '' });

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a product.');
      return;
    }
    try {
      await addDoc(collection(db, 'marketplace'), {
        ...newProduct,
        sellerId: user.uid,
        price: parseFloat(newProduct.price),
        rating: 5,
        reviews: 0,
        stock: 10,
        seller: user.displayName || 'Community Member',
        createdAt: new Date().toISOString()
      });
      setIsSellModalOpen(false);
      setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
      alert('Product submitted successfully! It will be visible after review.');
    } catch (error) {
      console.error("Error submitting product:", error);
      alert('Failed to submit product. Please try again.');
    }
  };

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bagrote_saved_items');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  // Persist saved items to localStorage
  useEffect(() => {
    localStorage.setItem('bagrote_saved_items', JSON.stringify(savedItems));
  }, [savedItems]);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const toggleSave = (product: any) => {
    setSavedItems(prev => {
      const isSaved = prev.find(item => item.id === product.id);
      if (isSaved) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const formatPrice = (price: number) => {
    const converted = (price * currency.rate).toFixed(currency.code === 'PKR' ? 0 : 2);
    return `${currency.symbol}${converted}`;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'easypaisa' | 'jazzcash' | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'confirm'>('details');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', address: '', phone: '' });
  const [transactionId, setTransactionId] = useState('');

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 'details') {
      setCheckoutStep('payment');
      return;
    }

    if (checkoutStep === 'payment') {
      if (!paymentMethod || !transactionId) {
        alert('Please select a payment method and enter the Transaction ID.');
        return;
      }

      try {
        await addDoc(collection(db, 'orders'), {
          userId: user?.uid || 'anonymous',
          items: cart,
          total: cartTotal,
          currency: currency.code,
          customer: customerInfo,
          payment: {
            method: paymentMethod,
            transactionId: transactionId,
            merchantAccount: paymentMethod === 'easypaisa' ? '03554295028' : '03474336806'
          },
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        setCheckoutStep('confirm');
        setCart([]);
      } catch (error) {
        console.error("Error creating order:", error);
        alert('Failed to process order. Please try again.');
      }
    }
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('details');
    setPaymentMethod(null);
    setTransactionId('');
  };

  const [orders, setOrders] = useState<any[]>([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'), 
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <main className="bg-white min-h-screen">
      <Hero 
        title="Bagrote Marketplace"
        subtitle="Support local artisans and farmers. Bring a piece of the valley home with you."
        image="https://images.unsplash.com/photo-1488459711635-0c67569b56a0?auto=format&fit=crop&q=80&w=1920"
        showScroll={false}
      />

      {/* Benefits Bar */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-primary text-sm">Worldwide Shipping</h4>
              <p className="text-xs text-gray-500">From Bagrote to your doorstep.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-primary text-sm">Authenticity Guaranteed</h4>
              <p className="text-xs text-gray-500">Directly from verified local sources.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
              <Package size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-primary text-sm">Eco-Friendly Packaging</h4>
              <p className="text-xs text-gray-500">Sustainable materials only.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Order History Collapsible */}
        {orders.length > 0 && (
          <div className="mb-12 bg-gray-50 rounded-[32px] border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
              className="w-full p-8 flex items-center justify-between hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Package size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-primary">Recent Orders ({orders.length})</h3>
              </div>
              {isOrdersOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            <AnimatePresence>
              {isOrdersOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-8"
                >
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID: {order.id.slice(0, 8)}</span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest",
                              order.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                            )}>
                              {order.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-brand-primary text-sm">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • {formatPrice(order.total)}
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            Payment: {order.payment.method.toUpperCase()} (TID: {order.payment.transactionId})
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden md:block">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</p>
                            <p className="text-xs font-bold text-brand-primary">{order.customer.name}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                            <Truck size={20} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Saved Items Collapsible */}
        {savedItems.length > 0 && (
          <div className="mb-12 bg-gray-50 rounded-[32px] border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setIsSavedOpen(!isSavedOpen)}
              className="w-full p-8 flex items-center justify-between hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center">
                  <Heart size={20} fill="currentColor" />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-primary">Saved for Later ({savedItems.length})</h3>
              </div>
              {isSavedOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            <AnimatePresence>
              {isSavedOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {savedItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-brand-primary text-xs truncate mb-1">{item.name}</h4>
                          <p className="font-bold text-brand-accent text-xs mb-2">{formatPrice(item.price)}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => addToCart(item)}
                              className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors"
                            >
                              Add to Basket
                            </button>
                            <button 
                              onClick={() => toggleSave(item)}
                              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Sell Button */}
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-primary rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-lg"
            >
              <Plus size={16} />
              Sell Product
            </button>

            {/* Currency Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs font-bold uppercase tracking-widest text-brand-primary">
                <Globe size={16} />
                {currency.code}
              </button>
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c)}
                    className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors ${
                      currency.code === c.code ? 'text-brand-accent' : 'text-brand-primary'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-4 bg-brand-primary text-white rounded-2xl shadow-xl hover:scale-105 transition-transform"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sell Modal */}
        <AnimatePresence>
          {isSellModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSellModalOpen(false)}
                className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[40px] p-12 shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setIsSellModalOpen(false)}
                  className="absolute top-8 right-8 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-serif font-bold text-brand-primary">Share Your Product</h3>
                    <p className="text-gray-500 text-sm">Join our community of artisans and sellers.</p>
                  </div>
                  <form onSubmit={handleSellSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Product Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                        placeholder="e.g. Hand-woven Woolen Shawl"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Price (USD)</label>
                        <input 
                          required
                          type="number" 
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                          placeholder="25"
                          value={newProduct.price}
                          onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Category</label>
                        <select 
                          required
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all appearance-none"
                          value={newProduct.category}
                          onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        >
                          <option value="">Select Category</option>
                          {categories.filter(c => c !== 'All').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Image URL</label>
                      <input 
                        required
                        type="url" 
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                        placeholder="https://images.unsplash.com/..."
                        value={newProduct.image}
                        onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all resize-none"
                        placeholder="Tell us about your product..."
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition-all shadow-xl mt-4"
                    >
                      Submit for Review
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isSaved = savedItems.some(item => item.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                      <button 
                        onClick={() => toggleSave(product)}
                        className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                          isSaved 
                          ? 'bg-brand-accent text-brand-primary' 
                          : 'bg-white/90 text-gray-400 hover:text-brand-accent'
                        }`}
                      >
                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-6 right-6 w-12 h-12 bg-brand-accent text-brand-primary rounded-2xl shadow-xl flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-brand-accent">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-brand-primary">{product.rating}</span>
                        <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
                      </div>
                      <p className="text-xl font-serif font-bold text-brand-primary">{formatPrice(product.price)}</p>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-brand-accent" size={24} />
                  <h2 className="text-2xl font-serif font-bold text-brand-primary">Your Basket</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Package size={64} className="text-gray-100 mb-6" />
                    <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">Basket is Empty</h3>
                    <p className="text-gray-400 text-sm">Start exploring the valley's treasures.</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt="" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-primary text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                        <p className="font-bold text-brand-primary">{formatPrice(item.price)}</p>
                      </div>
                      <button 
                        onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-gray-100 space-y-6">
                  <div className="flex items-center justify-between text-xl font-serif font-bold text-brand-primary">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                    Secure payment powered by Bagrote Pay
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 bg-brand-primary text-white rounded-2xl shadow-2xl z-[100] flex items-center gap-3"
          >
            <CheckCircle2 className="text-brand-accent" size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Added to Basket</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckout}
              className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] p-12 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={closeCheckout}
                className="absolute top-8 right-8 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              {checkoutStep === 'confirm' ? (
                <div className="text-center space-y-8 py-12">
                  <div className="w-24 h-24 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-bold text-brand-primary">Order Placed!</h3>
                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                      Thank you for your purchase. We have received your payment information and will process your order shortly.
                    </p>
                  </div>
                  <button 
                    onClick={closeCheckout}
                    className="px-12 py-4 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-serif font-bold text-brand-primary">Secure Checkout</h3>
                    <p className="text-gray-500 text-sm">
                      {checkoutStep === 'details' ? 'Enter your shipping information' : 'Complete your payment'}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={cn("w-3 h-3 rounded-full", checkoutStep === 'details' ? 'bg-brand-accent' : 'bg-gray-200')} />
                    <div className={cn("w-3 h-3 rounded-full", checkoutStep === 'payment' ? 'bg-brand-accent' : 'bg-gray-200')} />
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    {checkoutStep === 'details' ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                            placeholder="John Doe"
                            value={customerInfo.name}
                            onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                          <input 
                            required
                            type="email" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                            placeholder="john@example.com"
                            value={customerInfo.email}
                            onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Shipping Address</label>
                          <textarea 
                            required
                            rows={3}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all resize-none"
                            placeholder="Enter your full address..."
                            value={customerInfo.address}
                            onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                          <input 
                            required
                            type="tel" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                            placeholder="03XX-XXXXXXX"
                            value={customerInfo.phone}
                            onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('easypaisa')}
                            className={cn(
                              "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4",
                              paymentMethod === 'easypaisa' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-brand-accent/50'
                            )}
                          >
                            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-xl">
                              EP
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">EasyPaisa</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('jazzcash')}
                            className={cn(
                              "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4",
                              paymentMethod === 'jazzcash' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-brand-accent/50'
                            )}
                          >
                            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-xl">
                              JC
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">JazzCash</span>
                          </button>
                        </div>

                        {paymentMethod && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-3xl bg-gray-50 border border-gray-100 space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Merchant Account</span>
                              <span className="text-lg font-serif font-bold text-brand-primary">
                                {paymentMethod === 'easypaisa' ? '03554295028' : '03474336806'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Amount to Pay</span>
                              <span className="text-lg font-serif font-bold text-brand-accent">{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-[10px] text-gray-500 leading-relaxed mb-4">
                                Please send the total amount to the account number above using your {paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} app. Once sent, enter the Transaction ID below.
                              </p>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Transaction ID (TID)</label>
                                <input 
                                  required
                                  type="text" 
                                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                                  placeholder="Enter 11-digit Transaction ID"
                                  value={transactionId}
                                  onChange={e => setTransactionId(e.target.value)}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      {checkoutStep === 'payment' && (
                        <button 
                          type="button"
                          onClick={() => setCheckoutStep('details')}
                          className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                        >
                          Back
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="flex-[2] py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition-all shadow-xl"
                      >
                        {checkoutStep === 'details' ? 'Next: Payment' : 'Complete Purchase'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
