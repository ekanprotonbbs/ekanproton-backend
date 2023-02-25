import { Injectable, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserRequestDto } from "./dto/create-user.dto";
import { UpdateUserRequestDto } from "./dto/update-user.dto";
import { hash, verify } from "argon2";
import { UserResponseDto } from "@common/dto/response-user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(
        createUserRequestDto: CreateUserRequestDto
    ): Promise<UserResponseDto> {
        const { username: reqUsername, password: reqPassword } =
            createUserRequestDto;

        const {
            id,
            username,
            createdAt,
            updatedAt,
            lastlogin,
            lastlogout,
            comment,
        } = await this.prisma.user.create({
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
            updatedAt,
            lastlogin,
            lastlogout,
            comment,
        };
    }

    async findAll(): Promise<UserResponseDto[]> {
        const resultarray = (await this.prisma.user.findMany({})).map((one) => {
            const {
                id,
                username,
                createdAt,
                updatedAt,
                lastlogin,
                lastlogout,
                comment,
            } = one;
            return {
                id,
                username,
                createdAt,
                updatedAt,
                lastlogin,
                lastlogout,
                comment,
            };
        });
        return resultarray;
    }

    async findOne(reqId: number): Promise<UserResponseDto> {
        const {
            id,
            username,
            createdAt,
            updatedAt,
            lastlogin,
            lastlogout,
            comment,
        } = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: reqId,
            },
        });

        return {
            id,
            username,
            createdAt,
            updatedAt,
            lastlogin,
            lastlogout,
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
