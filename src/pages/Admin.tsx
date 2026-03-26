import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon, 
  FileText, 
  User, 
  Calendar, 
  Tag, 
  Mountain, 
  Hotel, 
  MapPin, 
  Search,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  PlusCircle,
  Camera,
  Package as PackageIcon,
  CreditCard,
  Megaphone,
  Loader2,
  Lock,
  Globe
} from 'lucide-react';
import Hero from '@/components/Hero';
import { db, auth } from '@/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { BlogPost, Valley, DirectoryListing, GalleryImage, Booking, TourPackage, LocalAd } from '@/types';

type AdminTab = 'blog' | 'valleys' | 'directory' | 'gallery' | 'bookings' | 'packages' | 'ads';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [valleys, setValleys] = useState<Valley[]>([]);
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [ads, setAds] = useState<LocalAd[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditType, setCurrentEditType] = useState<AdminTab | null>(null);
  const [currentData, setCurrentData] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    const unsubBlog = onSnapshot(collection(db, 'blog'), (snapshot) => {
      setBlogPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'blog'));

    const unsubValleys = onSnapshot(collection(db, 'valleys'), (snapshot) => {
      setValleys(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Valley)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'valleys'));

    const unsubDirectory = onSnapshot(collection(db, 'directory'), (snapshot) => {
      setListings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as DirectoryListing)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'directory'));

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as GalleryImage)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'gallery'));

    const unsubBookings = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Booking)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'bookings'));

    const unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as TourPackage)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'packages'));

    const unsubAds = onSnapshot(collection(db, 'ads'), (snapshot) => {
      setAds(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LocalAd)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'ads'));

    return () => {
      unsubBlog();
      unsubValleys();
      unsubDirectory();
      unsubGallery();
      unsubBookings();
      unsubPackages();
      unsubAds();
    };
  }, [isAdmin]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-primary mb-4">Admin Access</h2>
          <p className="text-gray-600 mb-8">
            {user 
              ? "You do not have permission to access the admin dashboard. Please log in with an administrator account."
              : "Please log in with your administrator account to access the dashboard."}
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <Globe size={18} />
              Login with Google
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleEdit = (type: AdminTab, item: any) => {
    setCurrentEditType(type);
    setCurrentData({ ...item });
    setIsEditing(true);
    setIsNew(false);
  };

  const handleAddNew = (type: AdminTab) => {
    setCurrentEditType(type);
    setIsNew(true);
    setIsEditing(true);
    
    if (type === 'blog') {
      setCurrentData({
        id: '', title: '', excerpt: '', content: '', author: 'Admin',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: 'Travel Tips', image: '', readTime: '5 min read'
      });
    } else if (type === 'valleys') {
      setCurrentData({
        id: '', name: '', heroImage: '', description: '', mapLocation: '',
        attractions: [], trekkingRoutes: [], difficulty: 'Moderate',
        travelTime: '', bestSeason: '', gallery: [], safetyTips: []
      });
    } else if (type === 'directory') {
      setCurrentData({
        id: Date.now(), name: '', category: 'hotels', location: '',
        contact: '', rating: 5.0, image: '', desc: ''
      });
    } else if (type === 'gallery') {
      setCurrentData({
        id: Date.now(), title: '', category: 'mountains', url: '', photographer: '', description: '', dateAdded: new Date().toISOString().split('T')[0]
      });
    } else if (type === 'bookings') {
      setCurrentData({
        id: `BK-${Date.now()}`, user: '', resource: '', date: '', status: 'pending', amount: 0
      });
    } else if (type === 'packages') {
      setCurrentData({
        id: `PKG-${Date.now()}`, title: '', duration: '', price: 0
      });
    } else if (type === 'ads') {
      setCurrentData({
        id: `AD-${Date.now()}`, business: '', title: '', expiry: ''
      });
    }
  };

  const handleDelete = async (type: AdminTab, id: string | number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const collectionName = type === 'blog' ? 'blog' : type === 'valleys' ? 'valleys' : type === 'directory' ? 'directory' : type === 'gallery' ? 'gallery' : type === 'bookings' ? 'bookings' : type === 'packages' ? 'packages' : 'ads';
      try {
        await deleteDoc(doc(db, collectionName, id.toString()));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, collectionName);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const collectionName = currentEditType === 'blog' ? 'blog' : currentEditType === 'valleys' ? 'valleys' : currentEditType === 'directory' ? 'directory' : currentEditType === 'gallery' ? 'gallery' : currentEditType === 'bookings' ? 'bookings' : currentEditType === 'packages' ? 'packages' : 'ads';
    
    try {
      if (isNew) {
        await addDoc(collection(db, collectionName), currentData);
      } else {
        const { id, ...data } = currentData;
        await updateDoc(doc(db, collectionName, id), data);
      }
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, collectionName);
    }
  };

  const tabs = [
    { id: 'blog', name: 'Blog Posts', icon: FileText },
    { id: 'valleys', name: 'Valleys', icon: Mountain },
    { id: 'directory', name: 'Directory', icon: Hotel },
    { id: 'gallery', name: 'Gallery', icon: Camera },
    { id: 'bookings', name: 'Bookings', icon: CreditCard },
    { id: 'packages', name: 'Packages', icon: PackageIcon },
    { id: 'ads', name: 'Local Ads', icon: Megaphone },
  ];

  const filteredData = {
    blog: blogPosts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())),
    valleys: valleys.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase())),
    directory: listings.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.category.toLowerCase().includes(searchQuery.toLowerCase())),
    gallery: gallery.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.category.toLowerCase().includes(searchQuery.toLowerCase())),
    bookings: bookings.filter(b => b.name?.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase())),
    packages: packages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())),
    ads: ads.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.businessName.toLowerCase().includes(searchQuery.toLowerCase()))
  };

  return (
    <main className="bg-[#f8f9fa] min-h-screen pb-24 font-sans">
      {/* Sidebar Navigation (Desktop) */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-brand-primary text-white hidden lg:flex flex-col p-8 z-50">
        <div className="mb-12">
          <h1 className="text-2xl font-serif font-bold tracking-tight">Bagrote Admin</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Management Suite</p>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest group",
                activeTab === tab.id 
                  ? "bg-white text-brand-primary shadow-xl" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon size={18} className={cn(activeTab === tab.id ? "text-brand-accent" : "text-white/40 group-hover:text-white")} />
              {tab.name}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10 space-y-4">
          <button className="w-full flex items-center gap-4 px-6 py-4 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <Settings size={18} />
            Settings
          </button>
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-300 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-brand-primary text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-serif font-bold">Admin Suite</h1>
        <button 
          onClick={() => signOut(auth)}
          className="p-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-[60px] z-40 bg-white border-b border-gray-100 p-4 flex gap-2 overflow-x-auto no-scrollbar shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
              activeTab === tab.id 
                ? "bg-brand-primary text-white shadow-md" 
                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
            )}
          >
            <tab.icon size={14} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64 p-6 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-brand-primary">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-gray-400 mt-2">Manage your {activeTab} content and listings.</p>
          </div>
          <button 
            onClick={() => handleAddNew(activeTab)}
            className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl hover:-translate-y-1"
          >
            <PlusCircle size={20} />
            Add New {
              activeTab === 'blog' ? 'Post' : 
              activeTab === 'valleys' ? 'Valley' : 
              activeTab === 'gallery' ? 'Image' : 
              activeTab === 'bookings' ? 'Booking' :
              activeTab === 'packages' ? 'Package' :
              activeTab === 'ads' ? 'Ad' :
              'Listing'
            }
          </button>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {[
            { label: 'Posts', value: blogPosts.length, icon: FileText, color: 'text-blue-500' },
            { label: 'Valleys', value: valleys.length, icon: Mountain, color: 'text-green-500' },
            { label: 'Directory', value: listings.length, icon: Hotel, color: 'text-orange-500' },
            { label: 'Gallery', value: gallery.length, icon: Camera, color: 'text-purple-500' },
            { label: 'Bookings', value: bookings.length, icon: CreditCard, color: 'text-red-500' },
            { label: 'Packages', value: packages.length, icon: PackageIcon, color: 'text-indigo-500' },
            { label: 'Ads', value: ads.length, icon: Megaphone, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className={cn("p-2 rounded-xl bg-gray-50 mb-2", stat.color)}>
                <stat.icon size={18} />
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              <p className="text-xl font-serif font-bold text-brand-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Data List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Quick search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all text-sm"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {activeTab === 'blog' && filteredData.blog.map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <img src={post.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('blog', post)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('blog', post.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'valleys' && filteredData.valleys.map((valley) => (
              <div key={valley.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <img src={valley.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{valley.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{valley.difficulty}</span>
                      <span>•</span>
                      <span>{valley.bestSeason}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('valleys', valley)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('valleys', valley.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'directory' && filteredData.directory.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('directory', item)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('directory', item.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'gallery' && filteredData.gallery.map((img) => (
              <div key={img.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <img src={img.url} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{img.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{img.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('gallery', img)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('gallery', img.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'bookings' && filteredData.bookings.map((b) => (
              <div key={b.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-brand-primary">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{b.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{b.resourceId}</span>
                      <span>•</span>
                      <span>{b.checkIn}</span>
                      <span>•</span>
                      <span className={cn(b.status === 'confirmed' ? "text-green-500" : "text-orange-500")}>{b.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="mr-4 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Amount</p>
                    <p className="font-serif font-bold text-brand-primary">${b.totalPrice}</p>
                  </div>
                  <button onClick={() => handleEdit('bookings', b)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('bookings', b.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'packages' && filteredData.packages.map((p) => (
              <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-brand-primary">
                    <PackageIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{p.duration}</span>
                      <span>•</span>
                      <span>${p.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('packages', p)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('packages', p.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'ads' && filteredData.ads.map((a) => (
              <div key={a.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-brand-primary">
                    <Megaphone size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{a.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      <span>{a.businessName}</span>
                      <span>•</span>
                      <span>Expires: {a.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit('ads', a)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-brand-primary"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete('ads', a.id)} className="p-3 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {((activeTab === 'blog' && filteredData.blog.length === 0) ||
              (activeTab === 'valleys' && filteredData.valleys.length === 0) ||
              (activeTab === 'directory' && filteredData.directory.length === 0) ||
              (activeTab === 'gallery' && filteredData.gallery.length === 0) ||
              (activeTab === 'bookings' && filteredData.bookings.length === 0) ||
              (activeTab === 'packages' && filteredData.packages.length === 0) ||
              (activeTab === 'ads' && filteredData.ads.length === 0)) && (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <PlusCircle className="text-gray-300" size={40} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">No {activeTab} found</h3>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">Get started by adding your first {activeTab} entry to the platform.</p>
                <button 
                  onClick={() => handleAddNew(activeTab)}
                  className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent transition-all"
                >
                  Create First {activeTab}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-serif font-bold text-brand-primary">
                    {isNew ? 'Create New' : 'Edit'} {currentEditType}
                  </h3>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                  {currentEditType === 'blog' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Post Title</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.title} onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                          <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.category} onChange={(e) => setCurrentData({ ...currentData, category: e.target.value })}>
                            <option>Travel Tips</option><option>Guide</option><option>Adventure</option><option>Culture</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                          <input required type="url" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.image} onChange={(e) => setCurrentData({ ...currentData, image: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Excerpt</label>
                          <textarea required rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" value={currentData.excerpt} onChange={(e) => setCurrentData({ ...currentData, excerpt: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Content</label>
                          <textarea required rows={6} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none font-mono text-sm" value={currentData.content} onChange={(e) => setCurrentData({ ...currentData, content: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentEditType === 'valleys' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Valley Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.name} onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hero Image URL</label>
                          <input required type="url" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.heroImage} onChange={(e) => setCurrentData({ ...currentData, heroImage: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Map Location</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.mapLocation} onChange={(e) => setCurrentData({ ...currentData, mapLocation: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                          <textarea required rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" value={currentData.description} onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Difficulty</label>
                            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.difficulty} onChange={(e) => setCurrentData({ ...currentData, difficulty: e.target.value })}>
                              <option>Easy</option><option>Moderate</option><option>Challenging</option><option>Expert</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Best Season</label>
                            <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.bestSeason} onChange={(e) => setCurrentData({ ...currentData, bestSeason: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentEditType === 'directory' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Business Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.name} onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                          <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.category} onChange={(e) => setCurrentData({ ...currentData, category: e.target.value })}>
                            <option value="hotels">Hotels & Guest Houses</option>
                            <option value="guides">Tour Guides</option>
                            <option value="jeeps">Jeep Services</option>
                            <option value="camping">Camping Services</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                          <input required type="url" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.image} onChange={(e) => setCurrentData({ ...currentData, image: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.location} onChange={(e) => setCurrentData({ ...currentData, location: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact Number</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.contact} onChange={(e) => setCurrentData({ ...currentData, contact: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                          <textarea required rows={3} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" value={currentData.desc} onChange={(e) => setCurrentData({ ...currentData, desc: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentEditType === 'gallery' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image Title</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.title} onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                          <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.category} onChange={(e) => setCurrentData({ ...currentData, category: e.target.value })}>
                            <option value="mountains">Mountains</option>
                            <option value="glaciers">Glaciers</option>
                            <option value="culture">Culture</option>
                            <option value="festivals">Festivals</option>
                            <option value="villages">Villages</option>
                            <option value="local">Local</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Photographer</label>
                          <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.photographer} onChange={(e) => setCurrentData({ ...currentData, photographer: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                          <input required type="url" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.url} onChange={(e) => setCurrentData({ ...currentData, url: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                          <textarea rows={3} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" value={currentData.description} onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })} />
                        </div>
                        {currentData.url && (
                          <div className="mt-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Preview</p>
                            <img src={currentData.url} className="w-full h-48 object-cover rounded-2xl shadow-md" alt="Preview" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentEditType === 'bookings' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.user} onChange={(e) => setCurrentData({ ...currentData, user: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Resource (Hotel/Trek)</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.resource} onChange={(e) => setCurrentData({ ...currentData, resource: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</label>
                            <input required type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.date} onChange={(e) => setCurrentData({ ...currentData, date: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Amount ($)</label>
                            <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.amount} onChange={(e) => setCurrentData({ ...currentData, amount: Number(e.target.value) })} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</label>
                          <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.status} onChange={(e) => setCurrentData({ ...currentData, status: e.target.value })}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentEditType === 'packages' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Package Title</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.title} onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Duration</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.duration} onChange={(e) => setCurrentData({ ...currentData, duration: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Price ($)</label>
                          <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.price} onChange={(e) => setCurrentData({ ...currentData, price: Number(e.target.value) })} />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentEditType === 'ads' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Business Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.business} onChange={(e) => setCurrentData({ ...currentData, business: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ad Title</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.title} onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                          <input required type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent" value={currentData.expiry} onChange={(e) => setCurrentData({ ...currentData, expiry: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-4 pt-8">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
                    <button type="submit" className="flex items-center gap-2 px-12 py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-lg"><Save size={16} /> Save Changes</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
