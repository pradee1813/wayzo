
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ChevronRight,
  Zap,
  Mountain,
  Heart,
  Users,
  Music,
  CloudSun,
  Languages,
  Bookmark
} from 'lucide-react';
import { STATES, DUMMY_SPOTS } from '../constants';
import { getAIRecommendations } from '../services/geminiService';
import { Page, UserPreferences } from '../types';

interface DashboardProps {
  onNavigate: (page: Page, params?: any) => void;
  userPrefs?: UserPreferences;
  savedSpotIds: string[];
  onToggleSave: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userPrefs, savedSpotIds, onToggleSave }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Nature');

  useEffect(() => {
    const fetchAI = async () => {
      const interests = userPrefs?.interests || ['Nature'];
      const type = userPrefs?.travelerType || 'solo';
      const res = await getAIRecommendations(interests, type);
      setRecommendations(res);
      setLoading(false);
    };
    fetchAI();
  }, [userPrefs]);

  const categories = [
    { id: 'Adventure', icon: <Zap />, label: 'Adventure' },
    { id: 'Nature', icon: <Mountain />, label: 'Nature' },
    { id: 'Romantic', icon: <Heart />, label: 'Romantic' },
    { id: 'Family', icon: <Users />, label: 'Family' },
    { id: 'Party', icon: <Music />, label: 'Party' },
    { id: 'Calm', icon: <CloudSun />, label: 'Peaceful' },
  ];

  const catSpots = DUMMY_SPOTS.filter(s => s.category === activeCategory).slice(0, 4);

  return (
    <div className="pb-32">
      {/* Search Header - Refined to be more compact and centered */}
      <div className="bg-white px-8 pt-6 pb-4 rounded-b-[32px] shadow-sm border-b border-slate-50 relative z-20">
        <div className="flex justify-between items-center mb-5">
          <button 
            title="Language"
            className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-green-700 hover:bg-green-100 transition-all border border-green-100"
          >
            <Languages size={16} />
          </button>
          <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-lg ring-1 ring-slate-100">
            <img src="https://picsum.photos/seed/wayzo-explorer/150" alt="Explorer" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mb-5">
          <h1 className="text-2xl font-black text-[#0f1c0f] tracking-tight leading-none mb-1.5">Namaste, Explorer</h1>
          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider">Plan your dream trip</p>
        </div>

        {/* Compact Search Bar with reduced breadth (width/height) */}
        <div className="relative max-w-sm">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search vibes..."
            className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-green-200 focus:ring-4 focus:ring-green-50/50 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 text-xs shadow-inner"
          />
        </div>
      </div>

      {/* Category Selection - Now has clear separation from header */}
      <div className="px-8 mt-6">
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-4">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all shadow-sm active:scale-95 border ${
                activeCategory === cat.id 
                ? 'bg-[#2d5a27] text-white border-green-800 shadow-green-900/10' 
                : 'bg-white text-slate-600 border-slate-50 hover:bg-slate-50'
              }`}
            >
              {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 16 })}
              <span className="text-[11px] font-black tracking-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spots Grid */}
      <div className="px-8 pt-4">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-xl font-black text-[#0f1c0f] tracking-tighter">Discover {activeCategory}</h2>
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">Top picks for you</p>
          </div>
          <button onClick={() => onNavigate(Page.SPOTS)} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-black text-[9px] hover:bg-green-100 transition-all uppercase tracking-wider">See More</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {catSpots.map(spot => (
            <div 
              key={spot.id} 
              className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl hover:shadow-green-900/5 transition-all relative"
            >
              <div onClick={() => onNavigate(Page.SPOT_DETAIL, spot)} className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={spot.images[0]} 
                  alt={spot.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg border border-white/50">
                  <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black text-slate-800">{spot.rating}</span>
                </div>
              </div>

              {/* Explicit Save Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(spot.id);
                }}
                className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-lg flex items-center justify-center transition-all z-10 border shadow-lg ${
                  savedSpotIds.includes(spot.id) 
                  ? 'bg-rose-500 text-white border-rose-400' 
                  : 'bg-white/90 backdrop-blur-md text-slate-400 border-white/50 hover:text-rose-500'
                }`}
              >
                <Heart size={18} className={savedSpotIds.includes(spot.id) ? 'fill-current' : ''} />
              </button>

              <div onClick={() => onNavigate(Page.SPOT_DETAIL, spot)} className="p-5">
                <div className="flex items-center gap-1.5 text-green-700 text-[9px] font-black uppercase tracking-[0.15em] mb-1.5">
                  <MapPin size={10} />
                  {spot.state}
                </div>
                <h3 className="text-lg font-black text-[#0f1c0f] mb-1.5 tracking-tight group-hover:text-green-800 transition-colors">{spot.name}</h3>
                <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed font-medium mb-0">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="px-8 mt-8">
        <div className="bg-[#0f1c0f] rounded-[28px] p-6 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                <Sparkles className="text-green-400 w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight">AI Curated Picks</h2>
                <p className="text-green-100/50 text-[9px] font-bold uppercase tracking-widest mt-0.5">Custom for you</p>
              </div>
            </div>
            
            <div className="space-y-2.5">
              {loading ? (
                <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
              ) : (
                recommendations.slice(0, 2).map((rec, i) => (
                  <div 
                    key={i}
                    className="bg-white/5 p-3.5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all flex justify-between items-center"
                    onClick={() => onNavigate(Page.SPOTS)}
                  >
                    <div className="flex-1 pr-3">
                      <h3 className="font-black text-base text-white mb-0.5 group-hover:text-green-400 transition-colors">{rec.name}</h3>
                      <p className="text-[10px] text-green-100/60 line-clamp-2 font-medium">{rec.reason}</p>
                    </div>
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-green-500/10 blur-[60px]" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-500/10 blur-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
