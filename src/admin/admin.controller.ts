import { Controller, UseGuards, Get, Put, Param, Body, Delete } from "@nestjs/common";
import { SessionGuard } from "src/auth/guard/session-auth.guard";
import { RoleGuard } from "src/auth/guard/role-auth.guard";
import { SetRole } from "src/auth/guard/role-auth.decorator";
import { AdminService } from "./admin.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserAuthResponseDto } from "@common/dto/res/resauth-user.dto";
import { UpdateUserAdminRequestDto } from "./dto/update-admin.dto";

@Controller("api/admin")
@UseGuards(SessionGuard, RoleGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @SetRole("ADMIN", "SUBADMIN")
    @ApiOkResponse({ type: [UserAuthResponseDto] })
    @Get("profile/all")
    async findAll() {
        return this.adminService.findAll();
    }

    @SetRole("ADMIN", "SUBADMIN")
    @ApiOkResponse({ type: UserAuthResponseDto })
    @Get("profile/@:username")
    async findOne(@Param("username") username: string) {
        return this.adminService.findOne(username);
    }

    @SetRole("ADMIN", "SUBADMIN")
    @ApiOkResponse({ type: UserAuthResponseDto })
    @Put("profile/@:username")
    async update(
        @Param("username") username: string,
        @Body() updateUserAdminRequestDto: UpdateUserAdminRequestDto
    ) {
        return this.adminService.update(username, updateUserAdminRequestDto);
    }

    @SetRole("ADMIN", "SUBADMIN")
    @ApiOkResponse({ type: UserAuthResponseDto })
    @Delete("profile/@:username")
    async delete(@Param("username") username: string) {
        return this.adminService.delete(username)
    }
}
