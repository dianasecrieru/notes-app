import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NoteService } from './note.service';
import { NoteRequest } from './dtos/note-request.dto';
import { UserEntity } from '../user/entities/user.entity';
import { NoteParams } from './dtos/note-params.dto';
import { UpdateNote } from './dtos/update-note.dto';
import { NoteResponse } from './dtos/note-response.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(AuthGuard())
  @Post()
  async createNote(
    @Req() req: Request,
    @Body() noteRequest: NoteRequest,
  ): Promise<NoteResponse> {
    return this.noteService.create((req.user as UserEntity).id, noteRequest);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAllUserNotes(@Req() req: Request): Promise<NoteResponse[]> {
    return this.noteService.findAll((req.user as UserEntity).id);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async findNote(
    @Req() req: Request,
    @Param() params: NoteParams,
  ): Promise<NoteResponse> {
    return this.noteService.findById((req.user as UserEntity).id, params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  @Patch(':id')
  async updateNote(
    @Req() req: Request,
    @Param() params: NoteParams,
    @Body() updateNoteDto: UpdateNote,
  ): Promise<void> {
    await this.noteService.update(
      (req.user as UserEntity).id,
      params.id,
      updateNoteDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  @Delete(':id')
  async removeNote(
    @Req() req: Request,
    @Param() params: NoteParams,
  ): Promise<void> {
    return this.noteService.remove((req.user as UserEntity).id, params.id);
  }
}
