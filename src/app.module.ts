import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { baseConfig } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...baseConfig,
      synchronize: false,
    }),
    ConfigModule.forRoot(),
    NoteModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
