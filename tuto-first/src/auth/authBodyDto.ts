import { IsNotEmpty, IsString } from "class-validator";

export class AuthBodyDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    userPassword: string;
}