export interface MapLocation {
  id: string;
  name: string;
  type: 'valley' | 'hotel' | 'camping' | 'trek' | 'glacier' | 'river';
  position: { lat: number; lng: number };
  description: string;
}

export const mapLocations: MapLocation[] = [
  // Valleys
  { id: 'v1', name: 'Sinakar Valley', type: 'valley', position: { lat: 35.9522, lng: 74.5234 }, description: 'The agricultural heart of Bagrote.' },
  { id: 'v2', name: 'Farfooh Valley', type: 'valley', position: { lat: 35.9812, lng: 74.5567 }, description: 'Highest permanent settlement.' },
  { id: 'v3', name: 'Hamaran Valley', type: 'valley', position: { lat: 35.9654, lng: 74.5432 }, description: 'Pristine alpine meadows.' },
  
  // Hotels/Guesthouses
  { id: 'h1', name: 'Bagrote Serai Guesthouse', type: 'hotel', position: { lat: 35.9456, lng: 74.5123 }, description: 'Traditional stay with mountain views.' },
  { id: 'h2', name: 'Sinakar Tourist Lodge', type: 'hotel', position: { lat: 35.9510, lng: 74.5210 }, description: 'Comfortable lodging in the heart of the valley.' },
  
  // Camping Sites
  { id: 'c1', name: 'Rakaposhi Base Camp', type: 'camping', position: { lat: 36.1412, lng: 74.4890 }, description: 'Iconic camping spot at the foot of Rakaposhi.' },
  { id: 'c2', name: 'Hinarchi Glacier Camp', type: 'camping', position: { lat: 36.0123, lng: 74.5890 }, description: 'Rugged camping near the glacier.' },
  
  // Glaciers & Rivers
  { id: 'g1', name: 'Hinarchi Glacier', type: 'glacier', position: { lat: 36.0234, lng: 74.6123 }, description: 'One of the longest glaciers in the region.' },
  { id: 'r1', name: 'Bagrote River', type: 'river', position: { lat: 35.9345, lng: 74.5012 }, description: 'The lifeblood of the valley.' },
  
  // Trekking Routes (Markers for start/key points)
  { id: 't1', name: 'Rakaposhi Trek Start', type: 'trek', position: { lat: 35.9876, lng: 74.5678 }, description: 'Starting point for the Rakaposhi Base Camp trek.' }
];
