import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<types.DocumentType<CommentEntity>> {
    const result = (await this.commentModel.create(dto)).populate('userId');
    this.logger.info(`New comment created: ${dto.text}`);

    await this.offerModel.findByIdAndUpdate(dto.offerId, {
      $inc: { commentsCount: 1, totalRating: dto.rating, }
    });

    return result;
  }

  public async getCommentsByOfferId(offerId: string): Promise<types.DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .limit(50)
      .populate('userId');
  }
}
