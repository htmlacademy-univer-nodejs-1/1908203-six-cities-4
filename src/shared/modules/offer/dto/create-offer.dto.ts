import { CityName, Convenience, Coordinates, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public cityName: CityName;
  public imagePreview: string;
  public rating: number;
  public images: string[];
  public isFavorite: boolean;
  public isPremium: boolean;
  public conveniences: Convenience[];
  public rooms: number;
  public guests: number;
  public price: number;
  public type: OfferType;
  public authorId: string;
  public commentsCount: number;
  public coordinates: Coordinates;
}
