import { prop } from '@typegoose/typegoose';
import { Coordinates } from '../../types/coordinates.type.js';

export class CoordinatesEntity implements Coordinates {
  @prop()
  latitude!: number;

  @prop()
  longitude!: number;
}
