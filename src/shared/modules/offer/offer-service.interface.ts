import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { City, DocumentExists } from '../../types/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  editById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<null>
  getOffers(): Promise<DocumentType<OfferEntity>[]>;
  getPremiumOffersByCity(city: City) : Promise<DocumentType<OfferEntity>[]>;
  addToFavorite(offerId: string, userId: string) : Promise<null>
  removeFromFavorite(offerId: string, userId: string): Promise<null>
  getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
}
