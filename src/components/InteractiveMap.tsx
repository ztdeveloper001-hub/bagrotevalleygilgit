import { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow, useMarkerRef } from '@vis.gl/react-google-maps';
import { mapLocations, MapLocation } from '@/data/mapLocations';
import { MapPin, Hotel, Tent, Mountain, Wind, Waves, X } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const isPlaceholder = !API_KEY || API_KEY.length < 20 || API_KEY.includes('YOUR_') || API_KEY.includes('INSERT_');

const getIcon = (type: MapLocation['type']) => {
  switch (type) {
    case 'valley': return <MapPin className="text-brand-primary" size={20} />;
    case 'hotel': return <Hotel className="text-blue-600" size={20} />;
    case 'camping': return <Tent className="text-green-600" size={20} />;
    case 'trek': return <Mountain className="text-orange-600" size={20} />;
    case 'glacier': return <Wind className="text-cyan-400" size={20} />;
    case 'river': return <Waves className="text-blue-400" size={20} />;
    default: return <MapPin size={20} />;
  }
};

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [markerRef, marker] = useMarkerRef();

  if (isPlaceholder) {
    return (
      <div className="w-full h-[600px] bg-gray-50 rounded-3xl flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
          <MapPin size={32} className="text-brand-accent" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">Map Configuration Required</h3>
        <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
          The interactive map requires a valid Google Maps API Key. If you are seeing an <code>InvalidKeyMapError</code>, please check your configuration.
        </p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left w-full max-w-md">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Setup Checklist</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <span>Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in your environment variables.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <span>Enable <strong>Maps JavaScript API</strong> in the Google Cloud Console.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <span>Ensure the key is not restricted to a different domain.</span>
            </li>
          </ul>
        </div>
        
        <a 
          href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors"
        >
          Get an API Key →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat: 35.98, lng: 74.55 }}
          defaultZoom={11}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {mapLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              onClick={() => setSelectedLocation(loc)}
              title={loc.name}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  {getIcon(selectedLocation.type)}
                  <h4 className="font-bold text-brand-primary text-sm">{selectedLocation.name}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedLocation.description}</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-accent mt-2 font-bold">{selectedLocation.type}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Legend Overlay */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-gray-100 hidden md:block">
        <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Map Legend</h5>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-brand-primary" /> Valleys
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-blue-600" /> Hotels
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-green-600" /> Camping
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-orange-600" /> Treks
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-cyan-400" /> Glaciers
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-2 h-2 rounded-full bg-blue-400" /> Rivers
          </div>
        </div>
      </div>
    </div>
  );
}
