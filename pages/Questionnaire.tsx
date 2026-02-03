
import React, { useState } from 'react';
import { 
  Mountain, 
  Heart, 
  Users, 
  Zap, 
  Music, 
  ArrowRight, 
  CloudSun,
  Coins,
  Calendar,
  Check
} from 'lucide-react';
import { Page, UserPreferences } from '../types';

interface QuestionnaireProps {
  onComplete: (prefs: UserPreferences) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<UserPreferences['budget']>('standard');
  const [type, setType] = useState<UserPreferences['travelerType']>('solo');
  const [duration, setDuration] = useState<UserPreferences['duration']>('week');

  const categories = [
    { id: 'Adventure', icon: <Zap />, label: 'Adventure' },
    { id: 'Nature', icon: <Mountain />, label: 'Nature' },
    { id: 'Romantic', icon: <Heart />, label: 'Romantic' },
    { id: 'Family', icon: <Users />, label: 'Family' },
    { id: 'Party', icon: <Music />, label: 'Party' },
    { id: 'Calm', icon: <CloudSun />, label: 'Peaceful' },
  ];

  const handleToggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      onComplete({ interests, budget, travelerType: type, duration });
    }
  };

  return (
    <div className="min-h-screen nature-gradient flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="max-w-2xl w-full glass-card rounded-[48px] p-10 md:p-14 shadow-2xl border border-white/80">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-green-800 uppercase tracking-[0.2em]">Curation Stage {step}/4</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-2 w-10 rounded-full transition-all duration-500 ${step >= s ? 'bg-green-700 w-16' : 'bg-slate-100 w-4'}`} />
              ))}
            </div>
          </div>
          <div className="h-px bg-slate-100 w-full" />
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-[#0f1c0f] mb-3 tracking-tight">Your Vibe?</h2>
            <p className="text-slate-500 mb-10 font-medium">Pick the themes that resonate with your spirit.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleToggleInterest(cat.id)}
                  className={`flex flex-col items-center gap-4 p-8 rounded-[32px] border-2 transition-all active:scale-95 ${
                    interests.includes(cat.id) 
                      ? 'bg-green-700 border-green-700 text-white shadow-xl shadow-green-900/10' 
                      : 'bg-white border-slate-50 text-slate-600 hover:border-green-200 hover:shadow-lg'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${interests.includes(cat.id) ? 'bg-white/20' : 'bg-green-50 text-green-600'}`}>
                    {/* Fix: Cast cat.icon to ReactElement<any> to allow the 'size' prop in cloneElement */}
                    {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <span className="font-extrabold text-sm tracking-tight">{cat.label}</span>
                  {interests.includes(cat.id) && <Check size={16} className="absolute top-4 right-4" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-[#0f1c0f] mb-3 tracking-tight">Travel Group</h2>
            <p className="text-slate-500 mb-10 font-medium">Who's joining this chapter of your life?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['solo', 'couple', 'family', 'friends'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex items-center justify-between p-8 rounded-[32px] border-2 transition-all active:scale-95 ${
                    type === t 
                      ? 'bg-green-700 border-green-700 text-white shadow-xl' 
                      : 'bg-white border-slate-50 text-slate-700 hover:bg-green-50 hover:border-green-100'
                  }`}
                >
                  <span className="font-black text-lg capitalize">{t}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === t ? 'bg-white/20' : 'bg-slate-50'}`}>
                    <ArrowRight size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-[#0f1c0f] mb-3 tracking-tight">Investment</h2>
            <p className="text-slate-500 mb-10 font-medium">Define your spending philosophy for this trip.</p>
            <div className="space-y-4">
              {[
                { id: 'budget', label: 'Conscious', desc: 'Focus on pure experience, smart savings' },
                { id: 'standard', label: 'Balanced', desc: 'Comfort where it counts, local luxury' },
                { id: 'luxury', label: 'Prestige', desc: 'The finest stays, private experiences' },
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setBudget(b.id as any)}
                  className={`w-full text-left p-8 rounded-[32px] border-2 transition-all active:scale-95 group ${
                    budget === b.id 
                      ? 'bg-green-700 border-green-700 text-white shadow-xl' 
                      : 'bg-white border-slate-50 text-slate-700 hover:bg-green-50 hover:border-green-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${budget === b.id ? 'bg-white/20' : 'bg-slate-50 text-slate-400 group-hover:text-green-600'}`}>
                      <Coins size={24} />
                    </div>
                    <div>
                      <span className="font-black text-xl block mb-1">{b.label}</span>
                      <p className={`text-sm font-medium ${budget === b.id ? 'text-green-100' : 'text-slate-400'}`}>{b.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-[#0f1c0f] mb-3 tracking-tight">Timeframe</h2>
            <p className="text-slate-500 mb-10 font-medium">How many sunrises are you looking for?</p>
            <div className="space-y-4">
              {[
                { id: 'weekend', label: 'Quick Break', desc: '2-3 days intense refreshment' },
                { id: 'week', label: 'Classic Stay', desc: '7-9 days deep immersion' },
                { id: 'long', label: 'Odyssey', desc: '14+ days nomadic spirit' },
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id as any)}
                  className={`w-full text-left p-8 rounded-[32px] border-2 transition-all active:scale-95 group ${
                    duration === d.id 
                      ? 'bg-green-700 border-green-700 text-white shadow-xl' 
                      : 'bg-white border-slate-50 text-slate-700 hover:bg-green-50 hover:border-green-100'
                  }`}
                >
                   <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${duration === d.id ? 'bg-white/20' : 'bg-slate-50 text-slate-400 group-hover:text-green-600'}`}>
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span className="font-black text-xl block mb-1">{d.label}</span>
                      <p className={`text-sm font-medium ${duration === d.id ? 'text-green-100' : 'text-slate-400'}`}>{d.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={step === 1 && interests.length === 0}
          className="w-full mt-12 bg-[#2d5a27] hover:bg-[#1a3a16] text-white font-black py-6 rounded-[32px] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-green-950/20 disabled:opacity-30 active:scale-95 group"
        >
          <span className="text-lg uppercase tracking-[0.1em]">{step === 4 ? 'Begin Journey' : 'Next Step'}</span>
          <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
