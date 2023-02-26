import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseFilters,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserRequestDto } from "@common/dto/req/create-user.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserResponseDto } from "@common/dto/res/res-user.dto";


@Controller("api/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserResponseDto })
    @Post("signup")
    async create(@Body() createUserRequestDto: CreateUserRequestDto) {
        return this.userService.create(createUserRequestDto);
    }

    @ApiOkResponse({ type: [UserResponseDto] })
    @Get("profile/all")
    async findAll() {
        return this.userService.findAll();
    }

    @Get("profile/@:username")
    async findOne(@Param("username") username: string) {
        return this.userService.findOne(username);
    }

}
