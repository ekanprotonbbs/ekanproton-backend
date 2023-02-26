import { DeleteUserRequestDto } from "@common/dto/req/delete-user.dto";
import { UpdateUserRequestDto } from "@common/dto/req/update-user.dto";
import { UserAuthResponseDto } from "@common/dto/res/resauth-user.dto";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { PasswordDoesNotMatch } from "@common/exceptions/exceptions";
import { hash, verify } from "argon2";
import { PasswordUserAuthRequestDto } from "./dto/password-dto";

@Injectable()
export class AuthuserService {
    constructor(private prisma: PrismaService) {}

    async profile(request: Request): Promise<UserAuthResponseDto> {
        const nowId = request.session.userid;
        const {
            id,
            username,
            createdAt,
            lastLogin,
            lastUpdate,
            comment,
            hiddencomment,
            role
        } = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: nowId,
            },
        });

        return {
            id,
            username,
            createdAt,
            lastLogin,
            lastUpdate,
            comment,
            hiddencomment,
            role
        };
    }

    async update(
        request: Request,
        updateUserRequestDto: UpdateUserRequestDto
    ): Promise<UserAuthResponseDto> {
        const nowId = request.session.userid;

        const {
            username: reqUsername,
            comment: reqComment,
            hiddencomment: reqHiddencomment,
        } = updateUserRequestDto;

        const {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        } = await this.prisma.user.update({
            where: {
                id: nowId,
            },
            data: {
                username: reqUsername,
                comment: reqComment,
                hiddencomment: reqHiddencomment,
                lastUpdate: new Date(),
            },
        });

        return {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        };
    }

    async password(
        request: Request,
        passwordUserAuthRequestDto: PasswordUserAuthRequestDto
    ): Promise<UserAuthResponseDto> {
        const myId = request.session.userid;
        const {
            currentpassword: reqCurrentPassword,
            newpassword: reqNewPassword,
        } = passwordUserAuthRequestDto;
        const { password: hashed_password } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: myId,
                },
            });

        if (!(await verify(hashed_password, reqCurrentPassword))) {
            throw new PasswordDoesNotMatch();
        }

        const {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        } = await this.prisma.user.update({
            where: {
                id: myId,
            },
            data: {
                password: await hash(reqNewPassword),
            },
        });

        return {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        };
    }

    async delete(
        request: Request,
        deleteUserRequestDto: DeleteUserRequestDto
    ): Promise<UserAuthResponseDto> {
        const myId = request.session.userid;

        const { password: reqPassword } = deleteUserRequestDto;
        const { password: hashed_password } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: myId,
                },
            });

        if (!(await verify(hashed_password, reqPassword))) {
            throw new PasswordDoesNotMatch();
        }

        const {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        } = await this.prisma.user.delete({
            where: {
                id: myId,
            },
        });

        return {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role
        };
    }
}
