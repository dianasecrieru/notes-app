import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteRequest } from './dtos/note-request.dto';
import { NoteResponse } from './dtos/note-response.dto';
import { UpdateNote } from './dtos/update-note.dto';
import { NoteEntity } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  async create(
    userId: number,
    createNoteDto: NoteRequest,
  ): Promise<NoteResponse> {
    const note = new NoteEntity();
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.userId = userId;
    await this.noteRepository.save(note);

    return new NoteResponse(note);
  }

  async findAll(userId: number): Promise<NoteResponse[]> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
    });
    return notes.map((note) => {
      return new NoteResponse(note);
    });
  }

  async findById(userId: number, id: number): Promise<NoteResponse> {
    const note = await this.getUserNote(userId, id);
    return new NoteResponse(note);
  }

  async update(
    userId: number,
    id: number,
    updateNote: UpdateNote,
  ): Promise<void> {
    const userNote = await this.getUserNote(userId, id);
    if (
      userNote.title !== updateNote.title ||
      userNote.content !== updateNote.content
    ) {
      await this.noteRepository.update({ id }, updateNote);
    } else {
      Logger.log('Note is already up-to-date!');
    }
  }

  async remove(userId: number, id: number): Promise<void> {
    await this.getUserNote(userId, id);
    await this.noteRepository.delete(id);
  }

  private async getUserNote(userId: number, id: number): Promise<NoteEntity> {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException('Note not found');
    } else if (userId !== note.userId) {
      throw new UnauthorizedException('User not authorized');
    } else {
      return note;
    }
  }
}
