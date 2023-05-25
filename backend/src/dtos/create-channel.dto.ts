import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateChannelDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  password: string;

  @Expose()
  @IsNotEmpty()
  ownerId: number;
}
