export interface DateSelection {
  date: string; // YYYY-MM-DD
  time: string; // e.g., "18:30" or preset "Sunset"
  timeCategory: 'sunset' | 'dinner' | 'nightwalk' | 'dessert' | 'custom';
  customTimeStr?: string;
  locationId: string;
  partnerName: string;
}

export interface RomanticLocation {
  id: string;
  nameMm: string;
  nameEn: string;
  taglineMm: string;
  descriptionMm: string;
  imageUrl: string;
  budgetMm: string;
  rating: number; // 1-5
  category: 'rooftop' | 'river' | 'dinner' | 'park' | 'cafe' | 'walk';
  googleMapsUrl: string;
  addressMm: string;
  highlightsMm: string[];
}

export interface MemoryItem {
  id: string;
  dateMm: string;
  titleMm: string;
  descriptionMm: string;
  imageUrl: string;
  tagMm: string;
  locationMm: string;
}

export interface ReasonItem {
  id: string;
  titleMm: string;
  shortMm: string;
  fullMessageMm: string;
  iconName: string;
  bgGradient: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  type: 'synth' | 'audio';
  url?: string;
}
