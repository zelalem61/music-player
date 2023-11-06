import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { 
        // sub: user.userId, // Assuming user has a unique identifier like userId
        username: user.name
    };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string, name: string, email: string): Promise<any> {
    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      throw new UnauthorizedException('Username already taken');
    }

    const newUser = await this.usersService.create({ name, email, username, password: pass, musicId: [] });

    const payload = { 
        // sub: newUser.userId, // Assuming user has a unique identifier like userId
        username: newUser.name
    };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }
}
