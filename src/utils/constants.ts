export interface VehicleRate {
  basic: number;
  perKm: number;
  minKm: number;
  runKm: number;
}

export interface RateCard {
  vehicles: Record<string, VehicleRate>;
  roomRent: Record<string, Record<string, number>>;
  freshup: Record<string, Record<string, number>>;
  foodNV: Record<string, Record<string, number>>;
  foodVeg: Record<string, Record<string, number>>;
  entryFee: Record<string, Record<string, number>>;
  entertainment: Record<string, number>;
  extra: Record<string, number>;
  profit: number;
}

export const RATE_CARD: RateCard = {
  vehicles: {
    'BUS 55 Seater': { basic: 10000, perKm: 40, minKm: 100, runKm: 80 },
    'BUS 49 Seater': { basic: 9000, perKm: 40, minKm: 100, runKm: 80 },
    'BUS 42 Seater': { basic: 8000, perKm: 40, minKm: 100, runKm: 80 },
    'BUS 36 Seater': { basic: 7000, perKm: 40, minKm: 100, runKm: 80 },
    'TRAVELLER 30 Seater': { basic: 7500, perKm: 35, minKm: 100, runKm: 80 },
    'TRAVELLER 26 Seater': { basic: 7000, perKm: 35, minKm: 100, runKm: 80 },
    'TRAVELLER 24 Seater': { basic: 6000, perKm: 35, minKm: 100, runKm: 80 },
  },
  roomRent: {
    '5': { KG: 300, LP: 350, UP: 500, HS: 700, HSS: 800, CLG: 1000 },
    '4': { KG: 350, LP: 400, UP: 600, HS: 800, HSS: 900, CLG: 1200 },
    '3': { KG: 400, LP: 450, UP: 700, HS: 900, HSS: 1000, CLG: 1400 },
    '2': { KG: 500, LP: 600, UP: 800, HS: 1000, HSS: 1200, CLG: 1500 },
    '1': { KG: 700, LP: 800, UP: 1000, HS: 1200, HSS: 1500, CLG: 2000 },
  },
  freshup: {
    '5': { KG: 100, LP: 150, UP: 200, HS: 250, HSS: 300, CLG: 400 },
    '4': { KG: 150, LP: 200, UP: 250, HS: 300, HSS: 350, CLG: 500 },
    '3': { KG: 200, LP: 250, UP: 300, HS: 350, HSS: 400, CLG: 600 },
    '2': { KG: 300, LP: 350, UP: 400, HS: 450, HSS: 500, CLG: 700 },
    '1': { KG: 500, LP: 550, UP: 600, HS: 650, HSS: 700, CLG: 800 },
  },
  foodNV: {
    bf: { KG: 100, LP: 125, UP: 150, HS: 175, HSS: 200, CLG: 225 },
    lunch: { KG: 150, LP: 175, UP: 200, HS: 225, HSS: 250, CLG: 275 },
    tea: { KG: 60, LP: 60, UP: 60, HS: 60, HSS: 60, CLG: 60 },
    dinner: { KG: 150, LP: 175, UP: 200, HS: 225, HSS: 250, CLG: 275 },
  },
  foodVeg: {
    bf: { KG: 75, LP: 100, UP: 125, HS: 150, HSS: 175, CLG: 200 },
    lunch: { KG: 150, LP: 175, UP: 200, HS: 225, HSS: 250, CLG: 275 },
    tea: { KG: 50, LP: 50, UP: 50, HS: 50, HSS: 50, CLG: 50 },
    dinner: { KG: 150, LP: 175, UP: 200, HS: 225, HSS: 250, CLG: 275 },
  },
  entryFee: {
    'Tea Museum': { KG: 30, LP: 40, UP: 50, HS: 80, HSS: 100, CLG: 130 },
    'Mattuppetty Dam': { KG: 30, LP: 40, UP: 50, HS: 80, HSS: 100, CLG: 130 },
    'Rose Garden': { KG: 50, LP: 50, UP: 50, HS: 75, HSS: 75, CLG: 100 },
    Rajamala: { KG: 80, LP: 90, UP: 100, HS: 130, HSS: 150, CLG: 200 },
    'Thekkady Lake': { KG: 0, LP: 0, UP: 0, HS: 0, HSS: 0, CLG: 0 },
  },
  entertainment: { Campfire: 3000, 'DJ Party': 4000 },
  extra: { Guide: 7500, Tolls: 2000, Bata: 2000, RTO: 3000 },
  profit: 0.2,
};

export const DESTINATIONS: Record<string, { locations: string[] }> = {
  Munnar: { locations: ['Tea Museum', 'Mattuppetty Dam', 'Rose Garden'] },
  Thekkady: { locations: ['Rajamala', 'Thekkady Lake'] },
};

export const CATEGORY_LABELS: Record<string, string> = {
  KG: 'Kinder Garten',
  LP: 'Lower Primary',
  UP: 'Upper Primary',
  HS: 'High School',
  HSS: 'Higher Secondary',
  CLG: 'College',
};

export const DB_COLORS = ['db-blue', 'db-purple', 'db-green', 'db-amber'];

export const SHARING_OPTIONS = ['5', '4', '3', '2', '1'];

export const MEAL_TYPES = [
  { key: 'bf', label: '🌅 Breakfast' },
  { key: 'lunch', label: '🍱 Lunch' },
  { key: 'tea', label: '☕ Tea & Snacks' },
  { key: 'dinner', label: '🌙 Dinner' },
];

export const FRESHUP_TIMES = ['Morning', 'Afternoon', 'Evening', 'Night'];

export const EXTRA_CHARGES = [
  { key: 'guide', icon: '🧭', label: 'Guide', cost: '₹7,500/day' },
  { key: 'tolls', icon: '🛣️', label: 'Tolls', cost: '₹2,000/day' },
  { key: 'bata', icon: '🤲', label: 'Bata', cost: '₹2,000/day' },
  { key: 'rto', icon: '📋', label: 'RTO', cost: '₹3,000/day' },
];

export const ENTERTAINMENT_ITEMS = [
  { id: 'campfire', icon: '🔥', label: 'Campfire', cost: '₹3,000 per vehicle' },
  { id: 'dj', icon: '🎵', label: 'DJ Party', cost: '₹4,000 per vehicle' },
];
