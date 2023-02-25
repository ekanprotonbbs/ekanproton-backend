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
    ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserRequestDto } from "@common/dto/req/create-user.dto";
import { UpdateUserRequestDto } from "@common/dto/req/update-user.dto";
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
    @Get("all")
    async findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
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
