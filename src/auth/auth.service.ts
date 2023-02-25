import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginAuthRequestDto } from "./dto/login-auth.dto";
import { verify } from "argon2";
import { PasswordDoesNotMatch } from "@common/exceptions/exceptions";
import { LoginAuthResponseDto } from "./dto/response-auth.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(
        loginAuthRequestDto: LoginAuthRequestDto,
        request: Request
    ): Promise<LoginAuthResponseDto> {
        const { username: reqUsername, password: reqPassword } =
            loginAuthRequestDto;
        const {
            id,
            username,
            password: hashed_password,
        } = await this.prisma.user.findUniqueOrThrow({
            where: {
                username: reqUsername,
            },
        });

        if (!(await verify(hashed_password, reqPassword))) {
            throw new PasswordDoesNotMatch();
        }

        const regeneratePromise = new Promise((resolve) => {
            request.session.regenerate(resolve);
        });

        await regeneratePromise;
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                lastlogin: new Date(),
            },
        });
        request.session.userid = id;

        return { id };
    }

    async logout(request: Request): Promise<LoginAuthResponseDto> {
        const id = request.session.userid;
        request.session.destroy(null);

        return { id };
    }

    islogin() {
        return true;
    }
}
