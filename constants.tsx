
import React from 'react';
import { TouristSpot, TransportOption, SpotCategory } from './types';
import { 
  Zap,
  Mountain,
  Heart, 
  Users,
  Music,
  CloudSun
} from 'lucide-react';

export const STATES = [
  "Rajasthan",
  "Kerala",
  "Goa",
  "Himachal Pradesh",
  "Uttarakhand",
  "Tamil Nadu"
];

export const CATEGORIES = [
  { id: 'Adventure', label: 'Adventure', icon: <Zap size={20} /> },
  { id: 'Nature', label: 'Nature', icon: <Mountain size={20} /> },
  { id: 'Romantic', label: 'Romantic', icon: <Heart size={20} /> },
  { id: 'Family', label: 'Family', icon: <Users size={20} /> },
  { id: 'Party', label: 'Party', icon: <Music size={20} /> },
  { id: 'Calm', label: 'Peaceful', icon: <CloudSun size={20} /> },
];

const createSpot = (
  id: string,
  name: string,
  state: string,
  category: SpotCategory,
  desc: string,
  longDesc: string,
  rating: number,
  imageUrls: string[]
): TouristSpot => ({
  id,
  name,
  state,
  category,
  description: desc,
  longDescription: longDesc,
  rating,
  images: imageUrls,
  reviews: [
    { user: 'Arjun V.', rating: 5, comment: 'Breathtaking views and seamless guidance from Wayzo.' },
    { user: 'Priya S.', rating: 4, comment: 'A must-visit location. The history is fascinating.' }
  ],
  transport: [
    { type: 'car', duration: '1-2 hours from city', cost: '₹1500' },
    { type: 'bus', duration: '3 hours', cost: '₹250' }
  ],
  nearbyHotels: ['The Heritage Inn', 'Grand Palace Resort'],
  nearbyFood: ['Royal Tiffin', 'Lakeside Cafe'],
  safetyAlerts: ['Stay hydrated', 'Follow local guidelines', 'Keep belongings safe']
});

export const DUMMY_SPOTS: TouristSpot[] = [
  // RAJASTHAN (10 spots)
  createSpot('raj-1', 'Amber Fort', 'Rajasthan', 'Nature', 'A majestic fort overlooking Maota Lake.', 'Built in the 16th century, Amber Fort is a masterpiece of Rajput architecture featuring intricate carvings and marble work.', 4.8, [
    'https://images.unsplash.com/photo-1590050752117-23a9d7fc2140?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599388339890-e50a990a424a?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-2', 'Hawa Mahal', 'Rajasthan', 'Romantic', 'The iconic Palace of Winds.', 'A stunning pink sandstone structure with 953 windows designed for royal women to watch festivals.', 4.7, [
    'https://images.unsplash.com/photo-1599661046289-e318977467cc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-3', 'Mehrangarh Fort', 'Rajasthan', 'Adventure', 'One of India\'s largest forts.', 'Rising 400 feet above Jodhpur, this fort offers panoramic views of the Blue City.', 4.9, [
    'https://images.unsplash.com/photo-1524230572894-3403a230574f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1597405260170-4f0525d82054?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-4', 'Lake Pichola', 'Rajasthan', 'Romantic', 'Udaipur\'s most beautiful lake.', 'An artificial lake created in 1362, home to the famous Lake Palace and Jag Mandir.', 4.8, [
    'https://images.unsplash.com/photo-1605649439074-f2038740c042?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615874959474-0607e77ca8e6?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-5', 'City Palace', 'Rajasthan', 'Family', 'A massive palace complex in Jaipur.', 'A blend of Rajasthani and Mughal architecture, housing museums and royal residences.', 4.6, [
    'https://images.unsplash.com/photo-1590050752117-23a9d7fc2140?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599388339890-e50a990a424a?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-6', 'Pushkar Lake', 'Rajasthan', 'Calm', 'Sacred lake with 52 ghats.', 'A major Hindu pilgrimage site known for the Brahma Temple and annual camel fair.', 4.5, [
    'https://images.unsplash.com/photo-1595821016733-41a4a4f86d63?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596402184320-417d717867cd?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-7', 'Jaisalmer Fort', 'Rajasthan', 'Adventure', 'The Golden Fort of Thar Desert.', 'One of the few "living forts" in the world, built using yellow sandstone.', 4.7, [
    'https://images.unsplash.com/photo-1542401886-65d6c60db275?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504128117196-93297a7d9f5d?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-8', 'Mount Abu', 'Rajasthan', 'Nature', 'The only hill station in Rajasthan.', 'Home to Nakki Lake and Dilwara Temples, a cool retreat from the desert heat.', 4.5, [
    'https://images.unsplash.com/photo-1615874959474-0607e77ca8e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544605522-8bd23ec05ede?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-9', 'Ranthambore', 'Rajasthan', 'Adventure', 'Premier tiger spotting destination.', 'National park known for its wild tigers, crocodiles, and historic fort.', 4.8, [
    'https://images.unsplash.com/photo-1581012733671-912f2c83d61a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1624446921345-316886e8869c?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('raj-10', 'Bikaner Camel Farm', 'Rajasthan', 'Family', 'Large camel breeding farm.', 'Learn about desert survival and enjoy camel milk products.', 4.4, [
    'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596402184320-417d717867cd?auto=format&fit=crop&w=800&q=80'
  ]),

  // KERALA (10 spots)
  createSpot('ker-1', 'Munnar Hills', 'Kerala', 'Nature', 'Rolling hills of lush tea.', 'Experience mist-covered valleys and fresh mountain air of the Western Ghats.', 4.9, [
    'https://images.unsplash.com/photo-1591946614421-46a396b0d547?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593693397636-3ef5a64608c5?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-2', 'Alleppey Backwaters', 'Kerala', 'Romantic', 'Cruises in traditional houseboats.', 'Serene palm-fringed canals in "Venice of the East".', 4.8, [
    'https://images.unsplash.com/photo-1593693397636-3ef5a64608c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-3', 'Varkala Cliff', 'Kerala', 'Calm', 'Unique cliff-side beach.', 'Known for natural springs and spiritual vibes overlooking Arabian Sea.', 4.7, [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-4', 'Wayanad Forest', 'Kerala', 'Adventure', 'Pristine forests and waterfalls.', 'Perfect for trekking and spotting wild elephants.', 4.8, [
    'https://images.unsplash.com/photo-1581442149028-095583b281f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544605522-8bd23ec05ede?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-5', 'Kochi Port', 'Kerala', 'Family', 'Historic city with colonial charm.', 'Explore Chinese fishing nets and Dutch architecture.', 4.6, [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591946614421-46a396b0d547?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-6', 'Athirappilly Falls', 'Kerala', 'Nature', 'Majestic 80-foot waterfalls.', 'Known as the "Niagara of India", located in Thrissur.', 4.9, [
    'https://images.unsplash.com/photo-1544605522-8bd23ec05ede?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605141011326-10b2da96078e?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-7', 'Thekkady Reserve', 'Kerala', 'Family', 'Tiger reserve and spice tours.', 'Enjoy boat safaris on Periyar Lake.', 4.7, [
    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581012733671-912f2c83d61a?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-8', 'Kumarakom', 'Kerala', 'Calm', 'Bird sanctuary and lake views.', 'Haven for migratory birds on Vembanad Lake.', 4.5, [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591946614421-46a396b0d547?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-9', 'Kovalam Beach', 'Kerala', 'Nature', 'Iconic lighthouse beaches.', 'Popular beach destination with crescent-shaped bays.', 4.6, [
    'https://images.unsplash.com/photo-1593693397636-3ef5a64608c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605141011326-10b2da96078e?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('ker-10', 'Silent Valley', 'Kerala', 'Adventure', 'Rare flora and fauna.', 'One of the most ecologically diverse tropical forests.', 4.8, [
    'https://images.unsplash.com/photo-1581442149028-095583b281f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544605522-8bd23ec05ede?auto=format&fit=crop&w=800&q=80'
  ]),

  // GOA (10 spots)
  createSpot('goa-1', 'Calangute', 'Goa', 'Party', 'The Queen of Beaches.', 'Famous for water sports, shacks, and vibrant night life.', 4.5, [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605141011326-10b2da96078e?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-2', 'Baga Beach', 'Goa', 'Party', 'Party central of North Goa.', 'Home to famous clubs and energetic beach vibes.', 4.6, [
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-3', 'Dudhsagar Falls', 'Goa', 'Adventure', 'The Sea of Milk.', 'Stunning four-tiered waterfall inside Mollem National Park.', 4.9, [
    'https://images.unsplash.com/photo-1605141011326-10b2da96078e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593693397636-3ef5a64608c5?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-4', 'Fort Aguada', 'Goa', 'Family', '17th-century Portuguese fort.', 'Offers spectacular views and houses a unique lighthouse.', 4.5, [
    'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-5', 'Basilica of Bom Jesus', 'Goa', 'Calm', 'World Heritage Site.', 'Houses the sacred remains of St. Francis Xavier.', 4.7, [
    'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-6', 'Palolem Beach', 'Goa', 'Romantic', 'Scenic crescent beach.', 'Known for calm waters and cozy huts in South Goa.', 4.8, [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-7', 'Anjuna Market', 'Goa', 'Family', 'Ultimate shopping destination.', 'Vibrant colors, local crafts, and hippie culture.', 4.4, [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605141011326-10b2da96078e?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-8', 'Chapora Fort', 'Goa', 'Adventure', 'Hilltop views.', 'Overlooks Vagator Beach, made famous by local cinema.', 4.6, [
    'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-9', 'Grand Island', 'Goa', 'Adventure', 'Scuba and snorkeling.', 'Crystal clear waters and diverse marine life.', 4.8, [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  ]),
  createSpot('goa-10', 'Dona Paula', 'Goa', 'Romantic', 'Vantage point.', 'Vistas of Zuari and Mandovi rivers merging into sea.', 4.5, [
    'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  ])
];
