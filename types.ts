
export enum Page {
  SPLASH = 'splash',
  LOGIN = 'login',
  QUESTIONNAIRE = 'questionnaire',
  DASHBOARD = 'dashboard',
  SPOTS = 'spots',
  SPOT_DETAIL = 'spot_detail',
  SAFETY = 'safety',
  PROFILE = 'profile'
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface TransportOption {
  type: 'bus' | 'train' | 'car' | 'bike';
  duration: string;
  cost: string;
}

export type SpotCategory = 'Adventure' | 'Nature' | 'Romantic' | 'Family' | 'Party' | 'Calm';

export interface TouristSpot {
  id: string;
  name: string;
  state: string;
  category: SpotCategory;
  description: string;
  longDescription: string;
  rating: number;
  images: string[];
  reviews: Review[];
  transport: TransportOption[];
  nearbyHotels: string[];
  nearbyFood: string[];
  safetyAlerts?: string[];
}

export interface UserPreferences {
  interests: string[];
  budget: 'budget' | 'standard' | 'luxury';
  travelerType: 'solo' | 'couple' | 'family' | 'friends';
  duration: 'weekend' | 'week' | 'long';
}
