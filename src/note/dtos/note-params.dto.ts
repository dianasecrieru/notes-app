import { IsNumberString } from 'class-validator';

export class NoteParams {
  @IsNumberString()
  id: number;
}
