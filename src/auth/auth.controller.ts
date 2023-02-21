import { UserResponseDto } from '@common/dto/response-user.dto';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dto/login-user.dto';

@Controller('api/auth')
export class AuthController {

    constructor (private readonly authservice: AuthService) {}

    @ApiOkResponse({type: UserResponseDto})
    @Post("login")
    async login(@Body() loginUserRequestDto:LoginUserRequestDto, @Req() request: Request) {
        return this.authservice.login(loginUserRequestDto, request)
    }
}
