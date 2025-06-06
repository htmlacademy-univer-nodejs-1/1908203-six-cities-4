import { IsNumber, Min, Max } from 'class-validator';

export class CoordinatesDto {

  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude!: number;
}
