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

        const { id, username, createdAt, lastlogin, comment } =
            await this.prisma.user.create({
                data: {
                    username: reqUsername,
                    password: await hash(reqPassword),
                    lastlogin: new Date(),
                    lastlogout: new Date(),
                },
            });

        return {
            id,
            username,
            createdAt,
            lastlogin,
            comment,
        };
    }

    async findAll(): Promise<UserResponseDto[]> {
        const resultarray = (await this.prisma.user.findMany({})).map((one) => {
            const { id, username, createdAt, lastlogin, comment } = one;
            return {
                id,
                username,
                createdAt,
                lastlogin,
                comment,
            };
        });
        return resultarray;
    }

    async findOne(reqId: number): Promise<UserResponseDto> {
        const { id, username, createdAt, lastlogin, comment } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: reqId,
                },
            });

        return {
            id,
            username,
            createdAt,
            lastlogin,
            comment,
        };
    }

    async update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
