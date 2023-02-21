import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserRequestDto } from "./dto/create-user.dto";
import { UpdateUserRequestDto } from "./dto/update-user.dto";
import { hash, verify } from "argon2";
import { UserResponseDto } from "./dto/response-user.dto";
import { LoginUserRequestDto } from "./dto/login-user.dto";
import { PasswordDoesNotMatch } from "./exceptions/exceptions";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(
        createUserRequestDto: CreateUserRequestDto
    ): Promise<UserResponseDto> {
        const { username, password } = createUserRequestDto;

        const { password: _, ...result } = await this.prisma.user.create({
            data: {
                username: username,
                password: await hash(password),
            },
        });

        return result;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const resultarray = (await this.prisma.user.findMany({})).map((one) => {
            const { password: _, ...result } = one;
            return result;
        });
        return resultarray;
    }

    async findOne(id: number): Promise<UserResponseDto> {
        const { password: _, ...result } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: id,
                },
            });

        return result;
    }

    async update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        return `This action removes a #${id} user`;
    }

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

        request.session.userid = result.id;

        return result;
    }
}
