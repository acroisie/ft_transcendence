import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  room: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}
