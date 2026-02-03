
import React, { useState } from 'react';
import { Mail, Lock, Chrome as Google, Facebook, ArrowRight, User, Loader2, AlertCircle } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Google Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="max-w-md w-full glass-card rounded-[32px] shadow-2xl overflow-hidden border border-white/80 transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <AnimatedLogo size="sm" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#1a2e1a] mb-2 tracking-tight">
              {isSignUp ? 'Join the Tribe' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              {isSignUp ? 'Start your Indian odyssey today.' : 'Experience the soul of India with WAYZO.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 text-rose-600 text-xs font-bold items-center animate-in fade-in zoom-in">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-700 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-green-100 focus:bg-white focus:border-green-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Secret</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-700 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-green-100 focus:bg-white focus:border-green-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm px-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-500 font-semibold hover:text-green-800 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                  Remember
                </label>
                <a href="#" className="text-green-700 font-bold hover:text-green-900 transition-colors">Recovery?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2d5a27] hover:bg-[#1a3a16] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/10 active:scale-95 group mt-4 overflow-hidden relative disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="px-4 bg-white text-slate-400 font-black uppercase tracking-widest">Connect with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex justify-center items-center py-4 bg-white rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Google className="w-5 h-5 text-red-500" />
              <span className="ml-2 font-bold text-slate-700 text-xs">Google</span>
            </button>
            <button 
              disabled={loading}
              className="flex justify-center items-center py-4 bg-white rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="ml-2 font-bold text-slate-700 text-xs">Facebook</span>
            </button>
          </div>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            {isSignUp ? 'Already a member?' : 'New here?'} 
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-700 font-black hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Join the tribe'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
