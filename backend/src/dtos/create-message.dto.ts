import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateMessageDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  username: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}
