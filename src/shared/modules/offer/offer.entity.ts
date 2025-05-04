import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { CityName, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { CoordinatesEntity } from '../coordinates/coordinates.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({
    type: () => String,
    required: true,
    enum: CityName
  })
  public cityName!: CityName;

  @prop({ required: true })
  public imagePreview!: string;

  // TODO
  @prop({
    type: [String],
    required: true
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

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

  @prop({
    type: [String],
    required: true
  })
  public conveniences!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    _id: false,
    required: true
  })
  public coordinates!: CoordinatesEntity;
}

export const OfferModel = getModelForClass(OfferEntity);
