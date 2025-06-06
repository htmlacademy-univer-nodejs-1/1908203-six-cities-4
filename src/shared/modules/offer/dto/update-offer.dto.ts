import { OfferType } from '../../../types/index.js';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  public title?: string;

  @IsOptional()
  @MinLength(20)
  @MaxLength(1024)
  public description?: string;

  @IsOptional()
  @IsDateString()
  public postDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  public image?: string;

  @IsOptional()
  @IsEnum(OfferType)
  public type?: OfferType;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(20000)
  public price?: number;
}
