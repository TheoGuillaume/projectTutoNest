import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    } 

    async getUser(userName: string): Promise<User | null> {
        return await this.userRepository.findOneBy({['userName']: userName});
    } 

    async createUser(user: User)  {
        const userHashedPassword = await this.hashPassword(user.userPassword);
        try {
            await this.userRepository.save({...user, userPassword: userHashedPassword});
            return "User created successfully" + user.userName;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    private async hashPassword(password: string){
        const hashedPassword = await hash(password, 10);
        return hashedPassword; 
    }
}
 