import { City } from './city.type.js';
import { Convenience } from './convenience.type.js';
import { Coordinates } from './coordinates.type.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  imagePreview: string;
  rating: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  conveniences: Convenience[];
  rooms: number;
  guests: number;
  price: number;
  type: OfferType;
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
};
