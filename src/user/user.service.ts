import { Injectable, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserRequestDto } from "@common/dto/req/create-user.dto";
import { UpdateUserRequestDto } from "@common/dto/req/update-user.dto";
import { hash } from "argon2";
import { UserResponseDto } from "@common/dto/res/res-user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(
        createUserRequestDto: CreateUserRequestDto
    ): Promise<UserResponseDto> {
        const { username: reqUsername, password: reqPassword } =
            createUserRequestDto;

        const { id, username, createdAt, lastLogin, comment } =
            await this.prisma.user.create({
                data: {
                    username: reqUsername,
                    password: await hash(reqPassword),
                    lastLogin: new Date(),
                    lastUpdate: new Date(),
                },
            });

        return {
            id,
            username,
            createdAt,
            lastLogin,
            comment,
        };
    }

    async findAll(): Promise<UserResponseDto[]> {
        const resultarray = (await this.prisma.user.findMany({
            orderBy: {
                id: "asc"
            }
        })).map((one) => {
            const { id, username, createdAt, lastLogin, comment } = one;
            return {
                id,
                username,
                createdAt,
                lastLogin,
                comment,
            };
        });
        return resultarray;
    }

    async findOne(reqUsername: string): Promise<UserResponseDto> {
        const { id, username, createdAt, lastLogin, comment } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    username: reqUsername,
                },
            });

        return {
            id,
            username,
            createdAt,
            lastLogin,
            comment,
        };
    }

}
