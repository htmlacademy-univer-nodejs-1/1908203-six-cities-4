import { City, Convenience, OfferType } from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100)
  public title: string;

  @IsOptional()
  @Length(20, 1024)
  public description: string;

  @IsOptional()
  @IsDateString()
  public postDate: Date;

  @IsOptional()
  @IsUrl()
  public image: string;

  @IsOptional()
  @IsEnum(OfferType)
  public type: OfferType;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(100_000)
  public price: number;

  @IsOptional()
  @IsEnum(City)
  public city: City;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  public guests: number;

  @IsOptional()
  @IsBoolean()
  public isPremium: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  public rooms: number;

  @IsOptional()
  @IsEnum(Convenience, { each: true })
  @ArrayMinSize(1)
  @ArrayUnique()
  public conveniences: Convenience[];

  @IsOptional()
  @IsInt()
  @Min(-180)
  @Max(180)
  public latitude: number;

  @IsOptional()
  @IsInt()
  @Min(-180)
  @Max(180)
  public longitude: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  public images: string[];
}
