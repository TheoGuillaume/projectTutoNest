import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersInterceptor } from './users.interceptor';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()  
    @UseInterceptors(UsersInterceptor)
    async getUsers() {
        console.log('in controller');
        const data = await this.usersService.getUsers();
        return data;
    }

    @Post()
    async createUser(@Body() user: User) {
         return await this.usersService.createUser(user);
    }
}

