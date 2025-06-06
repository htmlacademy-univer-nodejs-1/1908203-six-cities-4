import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Convenience, Coordinates, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  @MinLength(10)
  @MaxLength(100)
  public title: string;

  @MinLength(20)
  @MaxLength(1024)
  public description: string;

  @IsDateString()
  public postDate: Date;

  @IsUrl()
  public image: string;

  @IsEnum(OfferType)
  public type: OfferType;

  @IsInt()
  @Min(100)
  @Max(100_000)
  public price: number;

  @IsEnum(City)
  public city: City;

  @IsInt()
  @Min(1)
  @Max(10)
  public guests: number;

  @IsBoolean()
  public isPremium: boolean;

  @IsInt()
  @Min(1)
  @Max(8)
  public rooms: number;

  @IsEnum(Convenience, { each: true })
  public conveniences: Convenience[];


  public coordinates: Coordinates;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  public images: string[];

  @IsMongoId()
  public userId: string;
}
