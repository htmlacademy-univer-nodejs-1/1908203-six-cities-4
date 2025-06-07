import { Expose, Type } from 'class-transformer';
import { OfferRdo } from './offer.rdo.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { Convenience } from '../../../types/convenience.enum.js';

export class DetailedOfferRdo extends OfferRdo {
  @Expose()
  public description!: string;

  @Expose()
  public images: string[];

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public conveniences: Convenience[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}
