import { NoteEntity } from '../entities/note.entity';

export class NoteResponse {
  constructor(noteEntity: NoteEntity) {
    this.id = noteEntity.id;
    this.title = noteEntity.title;
    this.content = noteEntity.content;
    this.created = noteEntity.created;
    this.updated = noteEntity.updated;
  }

  id: number;
  title: string;
  content: string;
  created: Date;
  updated: Date;
}
