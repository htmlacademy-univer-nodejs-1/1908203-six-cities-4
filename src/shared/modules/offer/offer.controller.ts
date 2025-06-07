import {
  BaseController, DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { City, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offer-id.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { DetailedOfferRdo } from './rdo/detailed-offer.rdo.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getList });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });

    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumCityOffers,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async getById({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId, tokenPayload?.id);
    this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async getList({ query, tokenPayload }: Request, res: Response) {
    const { limit } = query;
    let limitParsed: number | undefined;

    if (limit !== undefined) {
      if (typeof limit !== 'string') {
        return this.badRequest(res, 'Limit should be a number');
      }

      if (isNaN(Number(limit)) || limit.trim() === '') {
        return this.badRequest(res, 'Limit should be a number');
      }

      limitParsed = parseInt(limit, 10);

      if (limitParsed <= 0) {
        return this.badRequest(res, 'Limit must be positive');
      }
    }

    const offers = await this.offerService.getOffers(limitParsed, tokenPayload?.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({...body, userId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    const offer = await this.offerService.findById(offerId);
    console.log(`payload = ${tokenPayload.id}`);
    console.log(`offer?.userId._id = ${offer?.userId._id}`);

    if (offer?.userId._id.toString() !== tokenPayload.id) {
      return this.forbidden(res, 'You don\'t have rights to delete this offer');
    }

    await this.offerService.deleteById(offerId);

    this.ok(res, `Successfully deleted offer ${offerId}`);
  }

  public async update({ body, params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;

    const offer = await this.offerService.findById(offerId);

    if (offer?.userId._id.toString() !== tokenPayload.id) {
      return this.forbidden(res, 'You don\'t have rights to update this offer');
    }

    const updatedOffer = await this.offerService.editById(offerId, body);
    this.ok(res, fillDTO(DetailedOfferRdo, updatedOffer));
  }

  public async getFavorites({ tokenPayload }: Request, res: Response) {
    const offers = await this.offerService.getFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;

    const result = await this.offerService.addToFavorite(offerId, tokenPayload.id);

    if (result !== null) {
      this.ok(res, `Successfully added ${offerId} to favorites`);
    } else {
      this.badRequest(res, `Offer ${offerId} already added`);
    }
  }

  public async deleteFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;

    const result = await this.offerService.removeFromFavorite(offerId, tokenPayload.id);

    if (result !== null) {
      this.ok(res, `Successfully removed ${offerId} from favorites`);
    } else {
      this.badRequest(res, `Offer ${offerId} is not in your favorites`);
    }
  }

  public async getPremiumCityOffers({query, tokenPayload}: Request, res: Response) {
    const { city } = query;
    const offers = await this.offerService.getPremiumOffersByCity(city as City, tokenPayload?.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
