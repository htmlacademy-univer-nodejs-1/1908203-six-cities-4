import { City } from './city-name.enum.js';
import { Convenience } from './convenience.type.js';
import { Coordinates } from './coordinates.type.js';
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
  coordinates: Coordinates;
};
