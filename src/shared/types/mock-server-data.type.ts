import { City } from './city-name.enum.js';
import { Convenience } from './convenience.type.js';
import { OfferType } from './offer-type.enum.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  images: string[];
  types: OfferType[];
  cities: City[];
  conveniences: Convenience[];
  avatarPaths: string[];
  passwords: string[];
  names: string[];
  emails: string[];
};
