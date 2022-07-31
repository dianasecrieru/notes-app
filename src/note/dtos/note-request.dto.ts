import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NoteRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  content: string;
}
