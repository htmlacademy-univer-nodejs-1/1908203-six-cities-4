import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @Matches(/\.(jpg|png)$/i)
  public avatarPath?: string;

  @IsString()
  @Length(1, 15)
  public name: string;

  @IsString()
  @Length(6, 12)
  public password: string;

  @IsEnum(UserType)
  public type!: UserType;
}
