
import React, { useState } from 'react';
import { Search, MapPin, Star, ArrowLeft, Filter, Heart, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';
import { STATES, DUMMY_SPOTS } from '../constants';
import { Page, TouristSpot } from '../types';

interface TouristSpotsProps {
  onNavigate: (page: Page, params?: any) => void;
  onBack: () => void;
  savedSpotIds: string[];
  onToggleSave: (id: string) => void;
}

const TouristSpots: React.FC<TouristSpotsProps> = ({ onNavigate, onBack, savedSpotIds, onToggleSave }) => {
  const [selectedState, setSelectedState] = useState(STATES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpots = DUMMY_SPOTS.filter(
    spot => spot.state === selectedState && 
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-32 bg-[#fdfcf8] min-h-screen">
      {/* Header Area */}
      <div className="bg-white px-8 pt-10 pb-6 sticky top-0 z-30 shadow-sm rounded-b-[32px] border-b border-slate-50">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all border border-slate-100 active:scale-90">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-[#0f1c0f] tracking-tighter">Explore India</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder={`Search in ${selectedState}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-200 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium text-slate-700 text-sm shadow-inner"
          />
        </div>

        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar">
          {STATES.map((state) => (
            <button 
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all whitespace-nowrap border ${
                selectedState === state 
                  ? 'bg-green-700 text-white border-green-800 shadow-lg shadow-green-900/10' 
                  : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Spots Grid */}
      <div className="px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
           <h2 className="text-lg font-black text-[#0f1c0f] tracking-tight">{filteredSpots.length} Locations Found</h2>
           <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
             <Filter size={14} /> Filter
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSpots.map((spot) => (
            <div 
              key={spot.id}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all border border-slate-50 group cursor-pointer relative"
            >
              <div onClick={() => onNavigate(Page.SPOT_DETAIL, spot)} className="h-56 relative overflow-hidden bg-slate-100">
                <img 
                  src={spot.images[0]} 
                  alt={spot.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/50">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-slate-800">{spot.rating}</span>
                </div>
                <div className="absolute top-4 right-14 bg-green-700/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                  {spot.category}
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(spot.id);
                }}
                className={`absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all z-10 border shadow-lg ${
                  savedSpotIds.includes(spot.id) 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-rose-200' 
                  : 'bg-white/95 backdrop-blur-md text-slate-400 border-white/50 hover:text-rose-500'
                }`}
              >
                <Heart size={18} className={savedSpotIds.includes(spot.id) ? 'fill-current' : ''} />
              </button>
              
              <div onClick={() => onNavigate(Page.SPOT_DETAIL, spot)} className="p-6">
                <div className="flex items-center gap-1.5 text-green-700 text-[9px] font-black uppercase tracking-[0.15em] mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {spot.state}
                </div>
                <h3 className="text-xl font-black text-[#0f1c0f] mb-2 tracking-tight group-hover:text-green-800 transition-colors">{spot.name}</h3>
                <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">
                  {spot.description}
                </p>

                {/* PRD Addition: Review Snippet */}
                {spot.reviews.length > 0 && (
                  <div className="bg-slate-50/50 p-3 rounded-xl mb-4 border border-slate-100 flex gap-3">
                    <MessageSquare size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-400 italic font-medium line-clamp-1">
                      "{spot.reviews[0].comment}"
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    EST. ROUTE: <span className="text-slate-800 ml-1">{spot.transport[0]?.duration || '2 HRS'}</span>
                  </div>
                  <div className="text-green-700 font-black text-[10px] flex items-center gap-1 uppercase tracking-widest">
                    EXPLORE <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredSpots.length === 0 && (
            <div className="col-span-full py-24 text-center bg-white rounded-[32px] border-2 border-dashed border-slate-100">
              <MapPin size={40} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-lg font-black text-slate-400 tracking-tight">No spots found in {selectedState}</h3>
              <p className="text-slate-300 mt-1 font-medium text-xs">Try a different search term or state.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouristSpots;
