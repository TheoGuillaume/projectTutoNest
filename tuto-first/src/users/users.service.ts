import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    } 

    async createUser(user: User)  {
        try {
            await this.userRepository.save(user);
            return "User created successfully" + user.userName;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }
}
 