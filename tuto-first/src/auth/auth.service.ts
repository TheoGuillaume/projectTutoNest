import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './authBodyDto';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, // Assuming JwtService is imported and injected
    ) {}

    async login(authBody: AuthBodyDto) {
        const { userName, userPassword } = authBody;
        const existingUser = await this.usersService.getUser(userName);
        if (!existingUser) throw new UnauthorizedException({error: "Mot de passe ou nom d'utilisateur incorrect"});
        const isPasswordValid = await this.isPasswordValid(userPassword, existingUser.userPassword);
        if(!isPasswordValid) throw new UnauthorizedException({error: "Mot de passe ou nom d'utilisateur incorrect"});
        return await this.authenticateUser({userId: existingUser.userId});
    }

    async getProfile(userName: string) {
        const user = await this.usersService.getUser(userName);
        if (!user) throw new NotFoundException({error: "Utilisateur non trouvé"});
        return {userName : user.userName, userId: user.userId};
    }

    private async isPasswordValid(userPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(userPassword, hashedPassword)
    }

    private async authenticateUser({userId} : {userId: string})  {
       const payload = {userId};
       return { access_token : await this.jwtService.sign(payload) }
    }
}
