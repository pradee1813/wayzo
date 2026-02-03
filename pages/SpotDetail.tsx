
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Car, 
  Bus, 
  Train, 
  ShieldAlert, 
  Info,
  Heart,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { TouristSpot } from '../types';

interface SpotDetailProps {
  spot: TouristSpot;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const SpotDetail: React.FC<SpotDetailProps> = ({ spot, onBack, isSaved, onToggleSave }) => {
  const [activeImage, setActiveImage] = useState(spot.images[0]);

  return (
    <div className="bg-white min-h-screen pb-40">
      {/* Hero Header */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src={activeImage} 
          alt={spot.name} 
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c0f]/95 via-[#0f1c0f]/30 to-transparent"></div>
        
        <div className="absolute top-10 left-8 right-8 flex justify-between items-center z-20">
          <button onClick={onBack} className="w-12 h-12 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 text-white hover:bg-white/30 transition-all flex items-center justify-center shadow-2xl active:scale-90">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 text-white hover:bg-white/30 transition-all flex items-center justify-center shadow-2xl">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onToggleSave}
              className={`w-12 h-12 backdrop-blur-2xl rounded-2xl border transition-all flex items-center justify-center shadow-2xl active:scale-90 ${
                isSaved 
                ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30' 
                : 'bg-white/10 text-white border-white/20 hover:bg-white/30'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 right-8 text-white z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="bg-green-600/90 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-xl border border-green-500/50 backdrop-blur-sm">
              {spot.category}
            </span>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-xl text-white text-[11px] font-black border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {spot.rating} <span className="text-white/50 font-bold ml-1">({spot.reviews.length})</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 leading-tight drop-shadow-2xl">{spot.name}</h1>
          <div className="flex items-center gap-1.5 text-white/60 font-bold uppercase tracking-widest text-[10px]">
            <MapPin className="w-4 h-4 text-green-400" />
            {spot.state}, INDIA
          </div>
        </div>
      </div>

      {/* Gallery Thumbs - Floating over Hero */}
      <div className="px-8 -mt-8 relative z-30 mb-10">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          {spot.images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                activeImage === img ? 'border-green-600 ring-4 ring-green-600/20 scale-105 shadow-xl' : 'border-white shadow-lg opacity-80'
              }`}
            >
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 bg-[#fdfcf8] pt-4">
        <div className="flex gap-8 border-b border-slate-100 pb-4 overflow-x-auto hide-scrollbar mb-10">
          <button className="font-black text-[11px] text-green-800 border-b-2 border-green-700 pb-4 whitespace-nowrap uppercase tracking-[0.2em]">Story</button>
          <button className="font-bold text-[11px] text-slate-300 pb-4 whitespace-nowrap uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Routes</button>
          <button className="font-bold text-[11px] text-slate-300 pb-4 whitespace-nowrap uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Safety</button>
          <button className="font-bold text-[11px] text-slate-300 pb-4 whitespace-nowrap uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Stay & Food</button>
        </div>

        {/* Description */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-1 bg-green-700 rounded-full" />
            <h2 className="text-xl font-black text-[#0f1c0f] tracking-tight">The Experience</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-base">
            {spot.longDescription}
          </p>
        </section>

        {/* Transport Options */}
        <section className="mb-12">
           <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1 bg-green-700 rounded-full" />
            <h2 className="text-xl font-black text-[#0f1c0f] tracking-tight">How to Reach</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spot.transport.map((t, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
                    {t.type === 'car' ? <Car size={22}/> : <Bus size={22}/>}
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.type} travel</span>
                    <span className="block text-base font-black text-slate-800">{t.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Cost</span>
                  <span className="text-base font-black text-green-700">{t.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section - Additional Images */}
        <section className="mb-12">
           <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1 bg-green-700 rounded-full" />
            <h2 className="text-xl font-black text-[#0f1c0f] tracking-tight">Photo Gallery</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
             {spot.images.map((img, idx) => (
               <div key={idx} className="h-40 rounded-3xl overflow-hidden shadow-sm group">
                  <img 
                    src={img} 
                    alt={`Spot View ${idx}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
               </div>
             ))}
          </div>
        </section>

        {/* Safety Alert (AI Driven) */}
        <section className="mb-12">
          <div className="p-8 bg-[#0f1c0f] rounded-[32px] text-white flex flex-col md:flex-row gap-6 items-center shadow-xl">
            <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30 flex-shrink-0">
              <ShieldAlert className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-black mb-2">Safety Guidance by AI</h3>
              <div className="flex flex-wrap gap-4">
                {spot.safetyAlerts?.map((alert, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#0f1c0f] tracking-tight">Explorer Feedback</h2>
            <button className="text-[10px] font-black text-green-700 uppercase tracking-widest">Read All</button>
          </div>
          <div className="space-y-4">
            {spot.reviews.map((r, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-400 border border-slate-100 uppercase text-sm">
                      {r.user.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-black text-slate-800 text-sm">{r.user}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-2.5 h-2.5 ${idx < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-100'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 font-medium italic leading-relaxed text-xs">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <div className="fixed bottom-10 left-8 right-8 z-50">
          <button className="w-full bg-[#2d5a27] hover:bg-green-900 text-white font-black py-5 rounded-[24px] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 group overflow-hidden relative">
            <span className="relative z-10 text-sm uppercase tracking-[0.2em]">Start Guidance</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
