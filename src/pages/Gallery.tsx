import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '@/components/Hero';
import { Camera, Maximize2, X, Filter, Loader2, Search, Upload, Calendar, User, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/firebase';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { GalleryImage, Category } from '@/types';

const categories: { id: Category | 'all', name: string }[] = [
  { id: 'all', name: 'All' },
  { id: 'mountains', name: 'Mountains' },
  { id: 'glaciers', name: 'Glaciers' },
  { id: 'culture', name: 'Culture' },
  { id: 'festivals', name: 'Festivals' },
  { id: 'villages', name: 'Villages' },
  { id: 'local', name: 'Local' },
];

const publicImages: GalleryImage[] = [
  { id: 'p1', url: '/1732384298808.jpg', title: 'Mountain View', category: 'mountains', photographer: 'Local Guide', dateAdded: '2024-01-15', description: 'A breathtaking view of the Bagrote peaks.' },
  { id: 'p2', url: '/About1.jpeg', title: 'About Bagrote', category: 'local', photographer: 'Tourism Office', dateAdded: '2024-01-10', description: 'General overview of the valley.' },
  { id: 'p3', url: '/Agriculture.jpg', title: 'Local Agriculture', category: 'culture', photographer: 'Community Member', dateAdded: '2024-02-01', description: 'Traditional farming methods in Bagrote.' },
  { id: 'p4', url: '/Culture.jpeg', title: 'Cultural Heritage', category: 'culture', photographer: 'Heritage Trust', dateAdded: '2024-01-20', description: 'Preserving the unique Shina culture.' },
  { id: 'p5', url: '/Essential1.jpg', title: 'Essential Bagrote', category: 'local', photographer: 'Traveler', dateAdded: '2024-02-05', description: 'Key landmarks of the valley.' },
  { id: 'p6', url: '/Essential2.jpg', title: 'Travel Essentials', category: 'local', photographer: 'Admin', dateAdded: '2024-02-10', description: 'What you need for your trip.' },
  { id: 'p7', url: '/Explore1.jpg', title: 'Explore the Valley', category: 'villages', photographer: 'Explorer', dateAdded: '2024-02-15', description: 'Hidden gems in the villages.' },
  { id: 'p8', url: '/Geography.jpeg', title: 'Valley Geography', category: 'mountains', photographer: 'Geologist', dateAdded: '2024-01-05', description: 'The unique terrain of Bagrote.' },
  { id: 'p9', url: '/History.jpeg', title: 'Historical Sites', category: 'culture', photographer: 'Historian', dateAdded: '2024-01-12', description: 'Tracing the roots of the valley.' },
  { id: 'p10', url: '/Investor1.jpg', title: 'Investment Opportunities', category: 'local', photographer: 'Dev Team', dateAdded: '2024-03-01', description: 'Potential for sustainable tourism.' },
  { id: 'p11', url: '/Investor2.jpg', title: 'Future Projects', category: 'local', photographer: 'Dev Team', dateAdded: '2024-03-05', description: 'Upcoming infrastructure developments.' },
  { id: 'p12', url: '/Local1.jpg', title: 'Local Life', category: 'villages', photographer: 'Resident', dateAdded: '2024-02-20', description: 'Daily life in the high mountains.' },
  { id: 'p13', url: '/Tourism.jpg', title: 'Tourism Hub', category: 'local', photographer: 'Govt GB', dateAdded: '2024-03-10', description: 'The central tourism information center.' },
  { id: 'p14', url: '/bagrote1.jpg', title: 'Bagrote Panorama', category: 'mountains', photographer: 'Pro Photographer', dateAdded: '2024-01-25', description: 'Wide angle view of the entire valley.' },
  { id: 'p15', url: '/bagrote2.jpg', title: 'Valley Landscape', category: 'mountains', photographer: 'Nature Lover', dateAdded: '2024-01-28', description: 'Lush greenery against snow peaks.' },
  { id: 'p16', url: '/bagrote3.jpg', title: 'Glacial Peaks', category: 'glaciers', photographer: 'Mountaineer', dateAdded: '2024-02-25', description: 'The majestic glaciers of Bagrote.' },
  { id: 'p17', url: '/chirra.jpg', title: 'Chiraah Valley', category: 'villages', photographer: 'Local', dateAdded: '2024-03-15', description: 'One of the beautiful sub-valleys.' },
  { id: 'p18', url: '/darjia.jpg', title: 'Darr Valley', category: 'villages', photographer: 'Local', dateAdded: '2024-03-18', description: 'Remote and pristine Darr valley.' },
  { id: 'p19', url: '/datucha1.jpg', title: 'Datuche Village', category: 'villages', photographer: 'Traveler', dateAdded: '2024-03-20', description: 'A traditional stone village.' },
  { id: 'p20', url: '/developer1.jpeg', title: 'Development Progress', category: 'local', photographer: 'Project Manager', dateAdded: '2024-03-22', description: 'Ongoing road improvements.' },
  { id: 'p21', url: '/developer2.jpeg', title: 'Infrastructure', category: 'local', photographer: 'Project Manager', dateAdded: '2024-03-24', description: 'Bridges and pathways.' },
  { id: 'p22', url: '/farfooh1.jpg', title: 'Farfooh Village', category: 'villages', photographer: 'Resident', dateAdded: '2024-03-25', description: 'The heart of Bagrote.' },
  { id: 'p23', url: '/gosnar.jpg', title: 'Gasunar Valley', category: 'villages', photographer: 'Local', dateAdded: '2024-03-25', description: 'Lush pastures of Gasunar.' },
  { id: 'p24', url: '/hopay.jpg', title: 'Hopey Village', category: 'villages', photographer: 'Local', dateAdded: '2024-03-25', description: 'Quiet village life.' },
  { id: 'p25', url: '/language1.jpeg', title: 'Local Language', category: 'culture', photographer: 'Linguist', dateAdded: '2024-03-25', description: 'The Shina language heritage.' },
  { id: 'p26', url: '/naslo2.jpg', title: 'Naslo Valley', category: 'villages', photographer: 'Local', dateAdded: '2024-03-25', description: 'Beautiful Naslo landscapes.' },
  { id: 'p27', url: '/satt.jpg', title: 'Satt Valley', category: 'villages', photographer: 'Local', dateAdded: '2024-03-25', description: 'Majestic views from Satt.' },
  { id: 'p28', url: '/sinaker1.jpg', title: 'Sinakar Village', category: 'villages', photographer: 'Local', dateAdded: '2024-03-25', description: 'The gateway village.' },
];

export default function Gallery() {
  const [activeCategories, setActiveCategories] = useState<string[]>(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  
  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'villages' as Category,
    photographer: '',
    description: '',
    imageFile: null as File | null,
    imageUrl: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'gallery'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbImages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as GalleryImage));
      setGalleryImages([...publicImages, ...dbImages]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setActiveCategories(['all']);
      return;
    }

    setActiveCategories(prev => {
      const newCategories = prev.filter(c => c !== 'all');
      if (newCategories.includes(categoryId)) {
        const filtered = newCategories.filter(c => c !== categoryId);
        return filtered.length === 0 ? ['all'] : filtered;
      } else {
        return [...newCategories, categoryId];
      }
    });
  };

  const filteredImages = useMemo(() => {
    return galleryImages.filter(img => {
      const matchesCategory = activeCategories.includes('all') || activeCategories.includes(img.category);
      const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (img.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
                           (img.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [galleryImages, activeCategories, searchQuery]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      let finalUrl = uploadData.imageUrl;

      if (uploadData.imageFile) {
        // Convert to base64 for storage in Firestore (simulating upload)
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(uploadData.imageFile!);
        });
        finalUrl = await base64Promise;
      }

      if (!finalUrl) throw new Error('Please provide an image URL or file');

      await addDoc(collection(db, 'gallery'), {
        title: uploadData.title,
        category: uploadData.category,
        url: finalUrl,
        photographer: uploadData.photographer || 'Anonymous',
        description: uploadData.description,
        dateAdded: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      });

      setUploadStatus({ type: 'success', message: 'Image uploaded successfully!' });
      
      // Close modal after a short delay
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadData({
          title: '',
          category: 'villages',
          photographer: '',
          description: '',
          imageFile: null,
          imageUrl: ''
        });
        setUploadStatus({ type: null, message: '' });
      }, 1500);

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus({ type: 'error', message: error instanceof Error ? error.message : 'Failed to upload image. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

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
        title="Valley Gallery"
        subtitle="A visual journey through the peaks, glaciers, and vibrant culture of Bagrote."
        image="/bagrote1.jpg"
        showScroll={false}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by title, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl"
            >
              <Upload size={18} />
              Upload Image
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={cn(
                "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeCategories.includes(cat.id) 
                  ? "bg-brand-primary text-white shadow-lg scale-105" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              )}
            >
              {activeCategories.includes(cat.id) && <Filter size={12} />}
              {cat.name}
            </button>
          ))}
          
          {(activeCategories.length > 1 || !activeCategories.includes('all') || searchQuery) && (
            <button 
              onClick={() => {
                setActiveCategories(['all']);
                setSearchQuery('');
              }}
              className="px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <X size={12} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Image Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group overflow-hidden rounded-[2rem] cursor-pointer shadow-sm hover:shadow-2xl transition-all"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-8 text-center">
                  <Maximize2 size={32} className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                  <h3 className="text-xl font-serif font-bold">{img.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest mt-2 opacity-80 font-bold">{img.category}</p>
                  {img.photographer && (
                    <p className="text-[9px] mt-4 opacity-60 italic">By {img.photographer}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Camera className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">No images found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </section>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-serif font-bold text-brand-primary">Upload to Gallery</h3>
                  <button onClick={() => setIsUploadModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image Title</label>
                      <input 
                        required 
                        type="text" 
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        placeholder="e.g. Sunset over Rakaposhi"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                      <select 
                        value={uploadData.category}
                        onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value as Category }))}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      >
                        {categories.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Photographer Name</label>
                    <input 
                      type="text" 
                      value={uploadData.photographer}
                      onChange={(e) => setUploadData(prev => ({ ...prev, photographer: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      placeholder="Your name or organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                    <textarea 
                      rows={3}
                      value={uploadData.description}
                      onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none"
                      placeholder="Tell us about this photo..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image Source</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-brand-accent cursor-pointer transition-colors">
                        <Upload size={24} className="text-gray-400 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Choose File</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        {uploadData.imageFile && <span className="text-[8px] mt-2 text-brand-accent truncate max-w-full">{uploadData.imageFile.name}</span>}
                      </label>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 text-center">OR</span>
                        <input 
                          type="url" 
                          placeholder="Image URL"
                          value={uploadData.imageUrl}
                          onChange={(e) => setUploadData(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {uploadStatus.type && (
                    <div className={cn(
                      "p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center",
                      uploadStatus.type === 'success' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {uploadStatus.message}
                    </div>
                  )}

                  <button 
                    disabled={uploading || uploadStatus.type === 'success'}
                    className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                    {uploading ? 'Uploading...' : uploadStatus.type === 'success' ? 'Success!' : 'Publish to Gallery'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-7xl w-full h-full flex flex-col lg:flex-row items-stretch justify-center bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white lg:text-brand-primary lg:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Section */}
              <div className="w-full lg:w-[400px] bg-white p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                  <span className="px-4 py-1.5 bg-brand-accent/10 text-brand-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-brand-primary leading-tight">{selectedImage.title}</h3>
                </div>

                <div className="space-y-8 flex-1">
                  {selectedImage.description && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Info size={14} />
                        Description
                      </div>
                      <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <User size={14} />
                        Photographer
                      </div>
                      <p className="font-bold text-brand-primary">{selectedImage.photographer || 'Anonymous'}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Calendar size={14} />
                        Date Added
                      </div>
                      <p className="font-bold text-brand-primary">{selectedImage.dateAdded || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 italic">
                    All images are property of their respective owners and are used for tourism promotion of Bagrote Valley.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
