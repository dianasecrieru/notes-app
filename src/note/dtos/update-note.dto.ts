import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNote {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string;
}
