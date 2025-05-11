import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CityName } from '../../types/city-name.enum.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  editById(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<null>
  getOffers(): Promise<DocumentType<OfferEntity>[]>;
  getPremiumOffersByCity(cityName: CityName) : Promise<DocumentType<OfferEntity>[]>;
  addToFavorite(offerId: string, userId: string) : Promise<null>
  removeFromFavorite(offerId: string, userId: string): Promise<null>
  getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
}
