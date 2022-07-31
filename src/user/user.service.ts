import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupRequest } from '../auth/dtos/signup-request.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUserEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<UserEntity> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.userRepository.findOne({
      where: [
        { username: normalizedIdentifier },
        { email: normalizedIdentifier },
      ],
    });
  }

  public async getUserEntityById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  public async createUser(signupRequest: SignupRequest): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.username = signupRequest.username;
    newUser.email = signupRequest.email;
    newUser.password = signupRequest.password;
    newUser.active = true;
    newUser.name = signupRequest.name;
    try {
      await this.userRepository.insert(newUser);
      return newUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      if (err.code === '23505') {
        throw new BadRequestException('User already exists');
      }
      throw new UnprocessableEntityException();
    }
  }
}
