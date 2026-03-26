export interface Valley {
  id: string;
  name: string;
  heroImage: string;
  description: string;
  mapLocation: string;
  attractions: string[];
  trekkingRoutes: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  travelTime: string;
  bestSeason: string;
  gallery: string[];
  safetyTips: string[];
}

export const valleys: Valley[] = [
  {
    id: 'hamaran',
    name: 'Hamaran Valley',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000',
    description: 'Hamaran is a hidden gem within Bagrote, known for its pristine alpine meadows and crystal-clear streams. It offers a peaceful retreat for those looking to escape the more frequented paths.',
    mapLocation: 'Upper Bagrote Region, Gilgit-Baltistan',
    attractions: ['Alpine Meadows', 'Crystal Streams', 'Ancient Shepherd Huts'],
    trekkingRoutes: ['Hamaran to Gutumi Glacier (4 hours)', 'Hamaran Loop Trail (2 hours)'],
    difficulty: 'Moderate',
    travelTime: '1.5 hours from Gilgit',
    bestSeason: 'June to September',
    gallery: [
      'https://picsum.photos/seed/ham1/800/600',
      'https://picsum.photos/seed/ham2/800/600',
      'https://picsum.photos/seed/ham3/800/600'
    ],
    safetyTips: ['Carry sufficient water', 'Watch for sudden weather changes', 'Stay on marked trails']
  },
  {
    id: 'girche',
    name: 'Girche Valley',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000',
    description: 'Girche is famous for its dramatic rock formations and its strategic location as a base for high-altitude expeditions. The landscape is rugged and awe-inspiring.',
    mapLocation: 'Eastern Bagrote, Gilgit-Baltistan',
    attractions: ['Rock Formations', 'Expedition Base Camps', 'Rare Flora'],
    trekkingRoutes: ['Girche to Diran Base Camp (6 hours)', 'Ridge Walk (3 hours)'],
    difficulty: 'Challenging',
    travelTime: '2 hours from Gilgit',
    bestSeason: 'July to August',
    gallery: [
      'https://picsum.photos/seed/gir1/800/600',
      'https://picsum.photos/seed/gir2/800/600',
      'https://picsum.photos/seed/gir3/800/600'
    ],
    safetyTips: ['Professional guide recommended', 'Check for rockfall warnings', 'High-altitude gear required']
  },
  {
    id: 'sinakar',
    name: 'Sinakar Valley',
    heroImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2000',
    description: 'Sinakar is the agricultural heart of Bagrote. Its terraced fields and fruit orchards create a vibrant green contrast against the snowy peaks.',
    mapLocation: 'Lower Bagrote, Gilgit-Baltistan',
    attractions: ['Fruit Orchards', 'Terraced Fields', 'Traditional Irrigation Channels'],
    trekkingRoutes: ['Village Walk (1 hour)', 'Sinakar to Farfooh Trek (3 hours)'],
    difficulty: 'Easy',
    travelTime: '1 hour from Gilgit',
    bestSeason: 'April to October',
    gallery: [
      'https://picsum.photos/seed/sin1/800/600',
      'https://picsum.photos/seed/sin2/800/600',
      'https://picsum.photos/seed/sin3/800/600'
    ],
    safetyTips: ['Respect private property', 'Avoid picking fruit without permission', 'Be mindful of local customs']
  },
  {
    id: 'hopay',
    name: 'Hopay Valley',
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000',
    description: 'Hopay is known for its panoramic views of the entire Bagrote Valley. It is a photographer\'s paradise, especially during sunrise and sunset.',
    mapLocation: 'Central Bagrote, Gilgit-Baltistan',
    attractions: ['Panoramic Viewpoints', 'Sunset Ridge', 'Local Handicrafts'],
    trekkingRoutes: ['Hopay Viewpoint Trail (1.5 hours)', 'Hopay to Datucha (2 hours)'],
    difficulty: 'Moderate',
    travelTime: '1.25 hours from Gilgit',
    bestSeason: 'May to September',
    gallery: [
      'https://picsum.photos/seed/hop1/800/600',
      'https://picsum.photos/seed/hop2/800/600',
      'https://picsum.photos/seed/hop3/800/600'
    ],
    safetyTips: ['Bring a camera with extra batteries', 'Wear sturdy hiking boots', 'Inform locals of your route']
  },
  {
    id: 'datucha',
    name: 'Datucha Valley',
    heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000',
    description: 'Datucha is a serene valley characterized by its dense juniper forests and rich wildlife. It is one of the best places for nature walks and bird watching.',
    mapLocation: 'Mid-Bagrote Region, Gilgit-Baltistan',
    attractions: ['Juniper Forests', 'Wildlife Spotting', 'Natural Springs'],
    trekkingRoutes: ['Forest Trail (2 hours)', 'Datucha to Bulche (4 hours)'],
    difficulty: 'Moderate',
    travelTime: '1.5 hours from Gilgit',
    bestSeason: 'June to August',
    gallery: [
      'https://picsum.photos/seed/dat1/800/600',
      'https://picsum.photos/seed/dat2/800/600',
      'https://picsum.photos/seed/dat3/800/600'
    ],
    safetyTips: ['Do not disturb wildlife', 'No campfires in the forest', 'Carry a first-aid kit']
  },
  {
    id: 'farfooh',
    name: 'Farfooh Valley',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000',
    description: 'Farfooh is the highest permanent settlement in Bagrote. It offers a unique glimpse into high-altitude living and serves as the gateway to the Hinarchi Glacier.',
    mapLocation: 'Upper Bagrote, Gilgit-Baltistan',
    attractions: ['Hinarchi Glacier Gateway', 'Ancient Stone Houses', 'High-Altitude Meadows'],
    trekkingRoutes: ['Farfooh to Hinarchi Glacier (2 hours)', 'Farfooh to Rakaposhi Base Camp (5 hours)'],
    difficulty: 'Challenging',
    travelTime: '2 hours from Gilgit',
    bestSeason: 'July to September',
    gallery: [
      'https://picsum.photos/seed/far1/800/600',
      'https://picsum.photos/seed/far2/800/600',
      'https://picsum.photos/seed/far3/800/600'
    ],
    safetyTips: ['Acclimatization is key', 'Warm clothing essential', 'Glacier travel requires experience']
  },
  {
    id: 'bulche',
    name: 'Bulche Valley',
    heroImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=2000',
    description: 'Bulche is a picturesque valley known for its vibrant wildflowers during the summer months. It is a favorite spot for camping and family picnics.',
    mapLocation: 'Lower-Mid Bagrote, Gilgit-Baltistan',
    attractions: ['Wildflower Meadows', 'Picnic Spots', 'Bulche Stream'],
    trekkingRoutes: ['Stream Side Walk (1 hour)', 'Bulche to Chirrah (3 hours)'],
    difficulty: 'Easy',
    travelTime: '1.25 hours from Gilgit',
    bestSeason: 'June to July',
    gallery: [
      'https://picsum.photos/seed/bul1/800/600',
      'https://picsum.photos/seed/bul2/800/600',
      'https://picsum.photos/seed/bul3/800/600'
    ],
    safetyTips: ['Dispose of waste properly', 'Be careful near the stream', 'Sun protection recommended']
  },
  {
    id: 'chirrah',
    name: 'Chirrah Valley',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000',
    description: 'Chirrah is a rugged valley that offers some of the most challenging trekking routes in the region. It is ideal for experienced adventurers seeking solitude.',
    mapLocation: 'Northern Bagrote, Gilgit-Baltistan',
    attractions: ['Rugged Peaks', 'Remote Canyons', 'Starlit Skies'],
    trekkingRoutes: ['Chirrah Canyon Trek (5 hours)', 'Chirrah to Saat (6 hours)'],
    difficulty: 'Expert',
    travelTime: '2.5 hours from Gilgit',
    bestSeason: 'August to September',
    gallery: [
      'https://picsum.photos/seed/chi1/800/600',
      'https://picsum.photos/seed/chi2/800/600',
      'https://picsum.photos/seed/chi3/800/600'
    ],
    safetyTips: ['Satellite phone recommended', 'Full expedition gear needed', 'Travel in groups']
  },
  {
    id: 'saat',
    name: 'Saat Valley',
    heroImage: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&q=80&w=2000',
    description: 'Saat is a small, peaceful valley known for its traditional hospitality and ancient folklore. It is a great place to experience the authentic Shina lifestyle.',
    mapLocation: 'Western Bagrote, Gilgit-Baltistan',
    attractions: ['Traditional Guesthouses', 'Folklore Evenings', 'Local Cuisine'],
    trekkingRoutes: ['Village Heritage Trail (2 hours)', 'Saat to Gousonar (4 hours)'],
    difficulty: 'Moderate',
    travelTime: '1.75 hours from Gilgit',
    bestSeason: 'May to October',
    gallery: [
      'https://picsum.photos/seed/saa1/800/600',
      'https://picsum.photos/seed/saa2/800/600',
      'https://picsum.photos/seed/saa3/800/600'
    ],
    safetyTips: ['Learn basic Shina phrases', 'Ask before taking photos of people', 'Try local food with caution']
  },
  {
    id: 'gousonar',
    name: 'Gousonar Valley',
    heroImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2000',
    description: 'Gousonar is famous for its high-altitude pastures where locals bring their livestock during the summer. It offers stunning views of the surrounding glaciers.',
    mapLocation: 'Upper Western Bagrote, Gilgit-Baltistan',
    attractions: ['High Pastures', 'Glacier Views', 'Yak Sightings'],
    trekkingRoutes: ['Pasture Trek (3 hours)', 'Gousonar to Daar (5 hours)'],
    difficulty: 'Challenging',
    travelTime: '2.25 hours from Gilgit',
    bestSeason: 'July to August',
    gallery: [
      'https://picsum.photos/seed/gou1/800/600',
      'https://picsum.photos/seed/gou2/800/600',
      'https://picsum.photos/seed/gou3/800/600'
    ],
    safetyTips: ['Be aware of yak movements', 'High-altitude sickness risk', 'Carry emergency supplies']
  },
  {
    id: 'daar',
    name: 'Daar Valley',
    heroImage: 'https://images.unsplash.com/photo-1533319417894-6fbb331e5513?auto=format&fit=crop&q=80&w=2000',
    description: 'Daar is the most remote valley in the Bagrote region. It is a pristine wilderness that remains largely untouched by modern influence.',
    mapLocation: 'Far Northern Bagrote, Gilgit-Baltistan',
    attractions: ['Untouched Wilderness', 'Remote Glaciers', 'Ultimate Solitude'],
    trekkingRoutes: ['Daar Wilderness Trek (7 hours)', 'Daar to Gilgit (2 days)'],
    difficulty: 'Expert',
    travelTime: '3 hours from Gilgit (partially by foot)',
    bestSeason: 'August',
    gallery: [
      'https://picsum.photos/seed/daa1/800/600',
      'https://picsum.photos/seed/daa2/800/600',
      'https://picsum.photos/seed/daa3/800/600'
    ],
    safetyTips: ['Experienced trekkers only', 'Self-sufficient camping required', 'No mobile signal']
  }
];
