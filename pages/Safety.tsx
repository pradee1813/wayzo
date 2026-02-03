
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, Map, AlertTriangle, ArrowLeft, Hospital, Siren } from 'lucide-react';
import { getSafetyAdvice } from '../services/geminiService';

interface SafetyProps {
  onBack: () => void;
}

const Safety: React.FC<SafetyProps> = ({ onBack }) => {
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      const data = await getSafetyAdvice('India');
      setAdvice(data);
      setLoading(false);
    };
    fetchAdvice();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-rose-500 px-6 pt-16 pb-12 rounded-b-[40px] text-white">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black">Safety Hub</h1>
        </div>
        
        <div className="flex gap-4 items-center p-6 bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20">
          <ShieldCheck className="w-12 h-12 text-rose-100" />
          <div>
            <p className="font-bold text-lg leading-tight">Safety-First Guidance</p>
            <p className="text-rose-100 text-xs mt-1">Real-time alerts & emergency contacts at your fingertips.</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Emergency Contacts */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
              <Siren />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Police</p>
              <p className="text-2xl font-black text-gray-900">100</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <Hospital />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ambulance</p>
              <p className="text-2xl font-black text-gray-900">102</p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            AI Safety Advice
          </h2>
          
          <div className="space-y-4">
            {loading ? (
              <div className="h-40 bg-gray-50 rounded-[32px] animate-pulse"></div>
            ) : (
              advice?.tips?.map((tip: string, i: number) => (
                <div key={i} className="p-5 bg-rose-50 rounded-3xl border border-rose-100 flex gap-4">
                  <div className="w-6 h-6 bg-rose-200 text-rose-600 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-rose-900 leading-snug">{tip}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Safe Zones */}
        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">Safe Zone Map</h2>
          <div className="h-48 bg-gray-100 rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <Map className="w-12 h-12 mb-2" />
            <p className="text-xs font-bold">Interactive safety maps for your current location are loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
