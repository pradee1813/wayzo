
import React from 'react';
import { Compass, MapPin } from 'lucide-react';

const AnimatedLogo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const letters = ['W', 'A', 'Y', 'Z', 'O'];
  const sizeClasses = size === 'lg' ? 'text-6xl md:text-8xl' : 'text-3xl';
  const iconSize = size === 'lg' ? 64 : 28;

  return (
    <div className={`flex items-center gap-1 font-black tracking-tighter text-green-700 ${sizeClasses}`}>
      {letters.map((letter, index) => (
        <span 
          key={index} 
          className={`letter-jump delay-${index} flex items-center justify-center relative`}
        >
          {letter === 'W' ? (
            <div className="relative flex items-center justify-center">
              {/* Stylized W background as Pin + Compass */}
              <div className="absolute opacity-20">
                <MapPin size={iconSize + 10} className="text-green-600 fill-green-100" />
              </div>
              <div className="absolute opacity-10">
                 <Compass size={iconSize / 2} className="text-blue-600 animate-spin-slow" style={{animationDuration: '8s'}} />
              </div>
              <span className="relative z-10">{letter}</span>
            </div>
          ) : (
            letter
          )}
        </span>
      ))}
    </div>
  );
};

export default AnimatedLogo;
