
import React, { useEffect } from 'react';
import AnimatedLogo from '../components/AnimatedLogo';

interface SplashProps {
  onFinish: () => void;
}

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 nature-gradient flex flex-col items-center justify-center z-50">
      <AnimatedLogo />
      <p className="mt-8 text-green-800 font-bold tracking-widest text-xs uppercase animate-pulse opacity-60">
        Smart Tourist Guidance Platform
      </p>
    </div>
  );
};

export default Splash;
