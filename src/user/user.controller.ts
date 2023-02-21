import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserRequestDto } from "./dto/create-user.dto";
import { UpdateUserRequestDto } from "./dto/update-user.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserResponseDto } from "@common/dto/response-user.dto";
import { LoginUserRequestDto } from "./dto/login-user.dto";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";


@Controller("api/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserResponseDto })
    @Post("signup")
    async create(@Body() createUserRequestDto: CreateUserRequestDto) {
        return this.userService.create(createUserRequestDto);
    }

    @ApiOkResponse({ type: [UserResponseDto] })
    //@UseGuards(AuthGuard("local"))
    @Get("all")
    async findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number) {
        return this.userService.findOne(id);
    }

    @Patch(":id")
    async update(
        @Param("id") id: number,
        @Body() updateUserRequestDto: UpdateUserRequestDto
    ) {
        return this.userService.update(id, updateUserRequestDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: number) {
        return this.userService.remove(id);
    }


}
