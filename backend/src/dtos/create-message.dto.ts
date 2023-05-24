import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateMessageDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  username: string;
  
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  room: string;
  
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}
