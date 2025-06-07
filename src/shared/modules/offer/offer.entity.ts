import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({
    type: () => String,
    required: true,
    enum: City
  })
  public city!: City;

  @prop({ required: true })
  public image!: string;

  // TODO
  @prop({
    type: [String],
    required: true
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({
    type: () => String,
    required: true,
    enum: OfferType
  })
  public type!: OfferType;

  @prop({ required: true })
  public rooms!: number;

  @prop({ required: true })
  public guests!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({
    required: true,
    default: 0,
  })
  public totalRating: number;

  @prop({
    type: [String],
    required: true
  })
  public conveniences!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;

  public isFavorite?: boolean;

  public get rating(): number {
    if (this.commentsCount === 0) {
      return 0;
    }

    return this.totalRating / this.commentsCount;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
