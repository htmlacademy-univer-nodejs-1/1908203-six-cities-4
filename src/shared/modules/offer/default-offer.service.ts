import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { City, Component, DESCENDING_ORDER } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { FavoriteEntity } from './favorite.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentEntity } from '../comment/comment.entity.js';
import { Types } from 'mongoose';
import { DEFAULT_OFFERS_LIMIT, DEFAULT_PREMIUM_CITY_OFFERS_LIMIT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) { }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const isFavorite = userId !== undefined && await this.favoriteModel.findOne({offerId, userId}) !== null;

    const offer = await this.offerModel
      .findById(offerId)
      .populate('userId');

    if (offer !== null) {
      offer.isFavorite = isFavorite;
    }

    return offer;
  }

  public async editById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndUpdate(offerId, { $set: dto, }, { new: true });

    this.logger.info(`Offer ${offerId} was edited`);

    return result;
  }

  public async deleteById(offerId: string): Promise<null> {
    await this.offerModel.findByIdAndDelete(offerId);
    await this.commentModel.deleteMany({offerId: offerId});

    this.logger.info(`Offer deleted: ${offerId}`);

    return null;
  }

  public async getOffers(limit?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find()
      .limit(limit ?? DEFAULT_OFFERS_LIMIT)
      .sort({ createdAt: DESCENDING_ORDER });
    return this.joinUserFavorites(offers, userId);
  }

  public async getPremiumOffersByCity(city: City, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find({ city, isPremium: true })
      .limit(DEFAULT_PREMIUM_CITY_OFFERS_LIMIT)
      .sort({ createdAt: DESCENDING_ORDER });

    return this.joinUserFavorites(offers, userId);
  }

  public async getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId });
    const offerIds = favorites.map((fav) => fav.offerId as Types.ObjectId);

    return await this.offerModel.find({ _id: { $in: offerIds } });
  }

  public async addToFavorite(offerId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null> {
    const existing = await this.favoriteModel.findOne({ offerId, userId });

    if (existing !== null) {
      return null;
    }

    this.logger.info(`User ${userId} added offer ${offerId} to favorites`);

    return this.favoriteModel.create({ offerId, userId });
  }

  public async removeFromFavorite(offerId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null> {
    const deleted = await this.favoriteModel.findOneAndRemove({ offerId, userId });

    this.logger.info(`User ${userId} removed offer ${offerId} from favorites`);

    return deleted;
  }

  private async joinUserFavorites(offers: DocumentType<OfferEntity>[], userId?: string) : Promise<DocumentType<OfferEntity>[]> {
    let favoriteOfferIds = new Set<string>();

    if (userId) {
      const favorites = await this.favoriteModel.find({ userId: new Types.ObjectId(userId) }).select('offerId');
      favoriteOfferIds = new Set(favorites.map((f) => f.offerId.toString()));
    }

    return offers.map((offer) => {
      offer.isFavorite = favoriteOfferIds.has(offer._id.toString());
      return offer;
    });
  }
}
