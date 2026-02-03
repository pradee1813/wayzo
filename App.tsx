
import React, { useState, useEffect } from 'react';
import { Page, TouristSpot, UserPreferences } from './types';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Questionnaire from './pages/Questionnaire';
import Dashboard from './pages/Dashboard';
import TouristSpots from './pages/TouristSpots';
import SpotDetail from './pages/SpotDetail';
import Safety from './pages/Safety';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  Home as HomeIcon, 
  Compass as MapIcon, 
  Shield as ShieldIcon, 
  User as UserIcon,
  Heart as HeartIcon,
  Bookmark,
  LogOut,
  Loader2
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.SPLASH);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userPrefs, setUserPrefs] = useState<UserPreferences | undefined>(undefined);
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      
      // If user logs in while on SPLASH or LOGIN, move them forward
      if (currentUser && (currentPage === Page.LOGIN || currentPage === Page.SPLASH)) {
        // Logic: if they have prefs go to dashboard, else questionnaire
        // For now, we'll assume they need to do questionnaire if it's their first time in the session
        setCurrentPage(Page.QUESTIONNAIRE);
      }
    });
    return () => unsubscribe();
  }, [currentPage]);

  const toggleSaveSpot = (id: string) => {
    setSavedSpotIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const navigate = (page: Page, params?: any) => {
    // Auth Guard: if not logged in and trying to go anywhere but login/splash
    if (!user && ![Page.LOGIN, Page.SPLASH].includes(page)) {
      setCurrentPage(Page.LOGIN);
      return;
    }

    if (page === Page.SPOT_DETAIL && params) {
      setSelectedSpot(params);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentPage(Page.LOGIN);
  };

  const handlePrefsComplete = (prefs: UserPreferences) => {
    setUserPrefs(prefs);
    navigate(Page.DASHBOARD);
  };

  const renderPage = () => {
    if (authLoading && currentPage !== Page.SPLASH) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
        </div>
      );
    }

    switch (currentPage) {
      case Page.SPLASH:
        return <Splash onFinish={() => navigate(user ? Page.DASHBOARD : Page.LOGIN)} />;
      case Page.LOGIN:
        return <Login onSuccess={() => navigate(Page.QUESTIONNAIRE)} />;
      case Page.QUESTIONNAIRE:
        return <Questionnaire onComplete={handlePrefsComplete} />;
      case Page.DASHBOARD:
        return (
          <Dashboard 
            onNavigate={navigate} 
            userPrefs={userPrefs} 
            savedSpotIds={savedSpotIds}
            onToggleSave={toggleSaveSpot}
          />
        );
      case Page.SPOTS:
        return (
          <TouristSpots 
            onNavigate={navigate} 
            onBack={() => navigate(Page.DASHBOARD)} 
            savedSpotIds={savedSpotIds}
            onToggleSave={toggleSaveSpot}
          />
        );
      case Page.SPOT_DETAIL:
        return selectedSpot ? (
          <SpotDetail 
            spot={selectedSpot} 
            onBack={() => navigate(Page.SPOTS)} 
            isSaved={savedSpotIds.includes(selectedSpot.id)}
            onToggleSave={() => toggleSaveSpot(selectedSpot.id)}
          />
        ) : null;
      case Page.SAFETY:
        return <Safety onBack={() => navigate(Page.DASHBOARD)} />;
      default:
        return <Dashboard onNavigate={navigate} userPrefs={userPrefs} savedSpotIds={savedSpotIds} onToggleSave={toggleSaveSpot} />;
    }
  };

  const showNavbar = ![Page.SPLASH, Page.LOGIN, Page.QUESTIONNAIRE].includes(currentPage);

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen relative overflow-hidden bg-[#fdfcf8]">
      <div className="fixed inset-0 nature-gradient -z-10 pointer-events-none opacity-50" />
      
      <main className="relative z-10 w-full">
        {renderPage()}
      </main>
      
      {showNavbar && (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-lg bg-white/90 backdrop-blur-2xl border border-white/40 px-8 py-4 flex justify-between items-center z-50 rounded-[32px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          <button 
            onClick={() => navigate(Page.DASHBOARD)}
            className={`flex flex-col items-center gap-1 transition-all group ${currentPage === Page.DASHBOARD ? 'text-green-700' : 'text-slate-400'}`}
          >
            <HomeIcon className={`w-6 h-6 ${currentPage === Page.DASHBOARD ? 'fill-green-100' : ''}`} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          
          <button 
            onClick={() => navigate(Page.SPOTS)}
            className={`flex flex-col items-center gap-1 transition-all group ${currentPage === Page.SPOTS || currentPage === Page.SPOT_DETAIL ? 'text-green-700' : 'text-slate-400'}`}
          >
            <MapIcon className={`w-6 h-6 ${currentPage === Page.SPOTS ? 'fill-green-100' : ''}`} />
            <span className="text-[10px] font-bold">Explore</span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-slate-400 group hover:text-rose-500 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-bold">Logout</span>
          </button>

          <button 
            onClick={() => navigate(Page.SAFETY)}
            className={`flex flex-col items-center gap-1 transition-all group ${currentPage === Page.SAFETY ? 'text-green-700' : 'text-slate-400'}`}
          >
            <ShieldIcon className={`w-6 h-6 ${currentPage === Page.SAFETY ? 'fill-green-100' : ''}`} />
            <span className="text-[10px] font-bold">Safety</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-slate-400 group hover:text-green-700 transition-colors">
            <UserIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
