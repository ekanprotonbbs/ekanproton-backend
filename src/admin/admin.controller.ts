import { Controller, UseGuards, Get } from "@nestjs/common";
import { SessionGuard } from "src/auth/guard/session-auth.guard";
import { RoleGuard } from "src/auth/guard/role-auth.guard";
import { SetRole } from "src/auth/guard/role-auth.decorator";
import { AdminService } from "./admin.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserAuthResponseDto } from "@common/dto/res/resauth-user.dto";

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
}
