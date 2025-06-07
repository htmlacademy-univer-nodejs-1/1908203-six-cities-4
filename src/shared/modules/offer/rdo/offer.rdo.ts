import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/city.enum.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public image: string;

  @Expose({ name: 'createdAt' })
  public postDate: string;

  @Expose()
  public price: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public commentsCount: number;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public city: City;

  @Expose()
  public rating: number;
}
