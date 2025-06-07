import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsUrl, Length, Max, Min } from 'class-validator';
import { City, Convenience, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  @Length(10, 100)
  public title: string;

  @Length(20, 1024)
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
  @ArrayMinSize(1)
  @ArrayUnique()
  public conveniences: Convenience[];

  @IsInt()
  @Min(-180)
  @Max(180)
  public latitude: number;

  @IsInt()
  @Min(-180)
  @Max(180)
  public longitude: number;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  public images: string[];

  @IsOptional()
  public userId?: string;
}
