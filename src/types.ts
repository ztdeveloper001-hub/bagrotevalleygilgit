export type Category = 'mountains' | 'glaciers' | 'culture' | 'festivals' | 'villages' | 'local';

export interface Valley {
  id: string;
  name: string;
  image: string; // Changed from heroImage to image to match usage
  description: string;
  location: string; // Added location
  elevation: number; // Added elevation
  mapLocation: string;
  attractions: string[];
  trekkingRoutes: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  travelTime: string;
  bestSeason: string;
  gallery: string[];
  safetyTips: string[];
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userName: string;
  content: string;
  date: string;
  createdAt: any;
}

export interface DirectoryListing {
  id: string;
  name: string;
  category: 'hotels' | 'guides' | 'jeeps' | 'camping';
  location: string;
  contact: string;
  rating: number;
  image: string;
  desc: string;
  priceRange?: string;
  amenities?: string[];
}

export interface GalleryImage {
  id: string;
  category: Category;
  title: string;
  url: string;
  caption?: string;
  photographer?: string;
  dateAdded?: string;
  description?: string;
}

// FUTURE SCALABILITY: Booking System
export interface Booking {
  id: string;
  userId: string;
  name: string; // Added name
  email: string; // Added email
  phone: string; // Added phone
  checkIn: string; // Added checkIn
  checkOut: string; // Added checkOut
  resourceId: string;
  resourceType: 'hotel' | 'trek' | 'package';
  bookingType?: 'hotel' | 'trek' | 'package'; // Added bookingType
  guests: string | number; // Support both
  type?: string; // Room/Trek type
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: any; // Timestamp
}

// FUTURE SCALABILITY: Tour Packages
export interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  rating: number; // Added rating
  tags: string[]; // Added tags
  itinerary: { day: number; title: string; desc: string }[];
  included: string[];
  excluded: string[];
}

// FUTURE SCALABILITY: Local Ads
export interface LocalAd {
  id: string;
  businessName: string;
  title: string;
  description: string;
  image: string;
  link: string;
  expiryDate: string;
  category: string; // Added category
  position: 'sidebar' | 'banner' | 'inline';
}
