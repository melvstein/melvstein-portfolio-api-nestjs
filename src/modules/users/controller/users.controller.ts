import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service.js';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }
}
