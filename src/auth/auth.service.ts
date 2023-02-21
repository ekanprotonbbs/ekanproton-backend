import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserRequestDto } from "./dto/login-user.dto";
import { verify } from "argon2";
import { PasswordDoesNotMatch } from "@common/exceptions/exceptions";
import { UserResponseDto } from "@common/dto/response-user.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(loginUserRequestDto:LoginUserRequestDto, request: Request): Promise<UserResponseDto> {

        const {username, password} = loginUserRequestDto
        const { password: hashed_password, ...result } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    username: username,
                },
            });

        if (!(await verify(hashed_password, password))) {
            throw new PasswordDoesNotMatch
        }

        request.session.userid = result.id

        return result;
    }
}
