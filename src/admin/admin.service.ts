import { UserAuthResponseDto } from "@common/dto/res/resauth-user.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserAdminRequestDto } from "./dto/update-admin.dto";
import { hash } from "argon2";

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<UserAuthResponseDto[]> {
        const resultarray = (
            await this.prisma.user.findMany({
                orderBy: {
                    id: "asc",
                },
            })
        ).map((one) => {
            const {
                id,
                username,
                createdAt,
                lastLogin,
                lastUpdate,
                comment,
                hiddencomment,
                role,
            } = one;
            return {
                id,
                username,
                createdAt,
                lastLogin,
                lastUpdate,
                comment,
                hiddencomment,
                role,
            };
        });
        return resultarray;
    }

    async findOne(reqUsername: string): Promise<UserAuthResponseDto> {
        const {
            id,
            username,
            createdAt,
            lastLogin,
            lastUpdate,
            comment,
            hiddencomment,
            role,
        } = await this.prisma.user.findUniqueOrThrow({
            where: {
                username: reqUsername,
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
            role,
        };
    }
    async update(
        reqCurrentUsername,
        updateUserAdminRequestDto: UpdateUserAdminRequestDto
    ): Promise<UserAuthResponseDto> {
        const {
            username: reqNewUsername,
            comment: reqComment,
            hiddencomment: reqHiddencomment,
            role: reqRole,
            password: reqNewPassword
        } = updateUserAdminRequestDto;

        const {
            id,
            username,
            comment,
            createdAt,
            lastLogin,
            lastUpdate,
            hiddencomment,
            role,
        } = await this.prisma.user.update({
            where: {
                username: reqCurrentUsername,
            },
            data: {
                username: reqNewUsername,
                password: await hash(reqNewPassword),
                comment: reqComment,
                hiddencomment: reqHiddencomment,
                role: reqRole,
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
            role,
        };

    }

    async delete(reqUsername: string): Promise<UserAuthResponseDto> {
    
        const {
            id,
            username,
            createdAt,
            lastLogin,
            lastUpdate,
            comment,
            hiddencomment,
            role,
        } = await this.prisma.user.delete({
            where: {
                username: reqUsername,
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
            role,
        };
    }
}
