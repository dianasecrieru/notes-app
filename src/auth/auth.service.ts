import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { SignupRequest } from './dtos/signup-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    await this.userService.createUser(signupRequest);
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const userEntity = await this.userService.getUserEntityByUsernameOrEmail(
      loginRequest.username,
    );

    if (
      !userEntity ||
      !bcrypt.compareSync(loginRequest.password, userEntity.passwordHash)
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.getLoginResponse(userEntity);
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const userEntity = await this.userService.getUserEntityById(payload.id);
    if (
      userEntity &&
      userEntity.id === payload.id &&
      userEntity.email === payload.email &&
      userEntity.username === payload.username
    ) {
      return userEntity;
    }
    throw new UnauthorizedException();
  }

  private async getLoginResponse(
    userEntity: UserEntity,
  ): Promise<LoginResponse> {
    const payload: JwtPayload = {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return new LoginResponse(accessToken);
  }
}
