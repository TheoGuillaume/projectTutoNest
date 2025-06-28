import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers() {
        const data = await this.usersService.getUsers();
        return data;
    }

    @Post()
    async createUser(@Body() user: User) {
         return await this.usersService.createUser(user);
    }
}

