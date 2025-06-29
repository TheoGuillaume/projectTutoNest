import { Body, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseInterceptors(AuthInterceptor)
    async login(@Body() authBody: AuthBodyDto) {
        return this.authService.login(authBody);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.authService.getProfile(req.user.userName);
    }
}
