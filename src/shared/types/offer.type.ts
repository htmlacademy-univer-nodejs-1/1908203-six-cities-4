import { City } from './city.enum.js';
import { Convenience } from './convenience.enum.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  image: string;
  rating: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  conveniences: Convenience[];
  rooms: number;
  guests: number;
  price: number;
  type: OfferType;
  user: User;
  commentsCount: number;
  latitude: number;
  longitude: number;
};
