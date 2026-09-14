import { UserRepository } from './../../user/repository/user.repository.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(username: string, password: string): Promise<any> {
    return this.userRepository.findByUsername(username);
  }
}
