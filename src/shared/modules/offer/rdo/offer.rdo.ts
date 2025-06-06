import { Expose, Type } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/city-name.enum.js';
import { Convenience } from '../../../types/convenience.type.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { CoordinatesRdo } from './coordinates.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public image: string;

  @Expose()
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
  public city: City;

  @Expose()
  public rating: number;

  @Expose({ groups: ['detailed'] })
  public isFavorite: boolean;

  @Expose({ groups: ['detailed'] })
  public description!: string;

  @Expose({ groups: ['detailed'] })
  public images: string[];

  @Expose({ groups: ['detailed'] })
  public rooms: number;

  @Expose({ groups: ['detailed'] })
  public guests: number;

  @Expose({ groups: ['detailed'] })
  public conveniences: Convenience[];

  @Expose({ name: 'userId', groups: ['detailed'] })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose({ groups: ['detailed'] })
  @Type(() => CoordinatesRdo)
  public coordinates: CoordinatesRdo;
}
