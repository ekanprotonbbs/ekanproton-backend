import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserRequestDto } from "./dto/login-user.dto";
import { verify } from "argon2";
import { PasswordDoesNotMatch } from "@common/exceptions/exceptions";
import { UserResponseDto } from "@common/dto/response-user.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(
        loginUserRequestDto: LoginUserRequestDto,
        request: Request
    ): Promise<UserResponseDto> {
        const { username, password } = loginUserRequestDto;
        const { password: hashed_password, ...result } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    username: username,
                },
            });

        if (!(await verify(hashed_password, password))) {
            throw new PasswordDoesNotMatch();
        }

        const regeneratePromise = new Promise((resolve) => {
            request.session.regenerate(resolve);
        });

        await regeneratePromise;
        request.session.userid = result.id;

        return result;
    }

    async logout(request: Request) {
        request.session.cookie.maxAge = -1;
        request.session.destroy(null);

        return { statusCode: "200", message: "Logged out successfully." };
    }

    islogin() {
        return true;
    }
}
