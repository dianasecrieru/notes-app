import { NoteEntity } from 'src/note/entities/note.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const typePostgres = 'postgres';

export const baseConfig = {
  type: typePostgres as 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [NoteEntity, UserEntity],
};

const dataSource = new DataSource({
  ...baseConfig,
  migrations: ['db/migrations/*.{js,ts}'],
});

export default dataSource;
