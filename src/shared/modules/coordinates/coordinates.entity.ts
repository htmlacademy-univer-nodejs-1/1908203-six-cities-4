import { prop } from '@typegoose/typegoose';
import { Coordinates } from '../../types/coordinates.type.js';

export class CoordinatesEntity implements Coordinates {
  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}
