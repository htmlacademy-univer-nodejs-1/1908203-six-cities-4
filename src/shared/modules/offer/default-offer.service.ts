import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { CityName, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { FavoriteEntity } from '../favorite/favorite.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId);
  }

  public async editById(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = this.offerModel.findByIdAndUpdate(offerId, { $set: dto, }, { new: true });

    this.logger.info(`Offer ${offerId} was edited`);

    return result;
  }

  public async deleteById(offerId: string): Promise<null> {
    await this.offerModel.findByIdAndDelete(offerId);

    this.logger.info(`Offer deleted: ${offerId}`);

    return null;
  }

  public async getOffers(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(60)
      .sort({ postDate: -1 })
      .populate('authorId');
  }

  public async getPremiumOffersByCity(cityName: CityName): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ cityName, isPremium: true })
      .limit(3)
      .sort({ postDate: -1 })
      .populate('authorId');
  }

  public async getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.favoriteModel
      .find({ userId, })
      .populate('offerId');
  }

  public async addToFavorite(offerId: string, userId: string): Promise<null> {
    await this.favoriteModel.create({ offerId, userId });

    this.logger.info(`User ${userId} added offer ${offerId} to favorites`);

    return null;
  }

  public async removeFromFavorite(offerId: string, userId: string): Promise<null> {
    await this.favoriteModel.findOneAndRemove({ offerId, userId });

    this.logger.info(`User ${userId} removed offer ${offerId} from favorites`);

    return null;
  }
}
