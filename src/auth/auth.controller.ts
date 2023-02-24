import { UserResponseDto } from "@common/dto/response-user.dto";
import {
    Controller,
    Get,
    Post,
    Body,
    Req,
    UseGuards,
    Res,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse } from "@nestjs/swagger";
import { Request, Response } from "express";
import { SessionGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginUserRequestDto } from "./dto/login-user.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @ApiOkResponse({ type: UserResponseDto })
    @Post("login")
    async login(
        @Body() loginUserRequestDto: LoginUserRequestDto,
        @Req() request: Request
    ) {
        return this.authservice.login(loginUserRequestDto, request);
    }

    @ApiOkResponse({ type: Boolean })
    @Get("islogin")
    @UseGuards(SessionGuard)
    async islogin() {
        return this.authservice.islogin();
    }

    @ApiOkResponse({ type: null })
    @Post("logout")
    @UseGuards(SessionGuard)
    async logout(@Req() request: Request) {
        return this.authservice.logout(request);
    }
}
