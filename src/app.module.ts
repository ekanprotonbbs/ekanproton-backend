import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AuthuserController } from "./authuser/authuser.controller";
import { AuthuserService } from "./authuser/authuser.service";
import { AuthuserModule } from "./authuser/authuser.module";

@Module({
    imports: [PrismaModule, AuthModule, AuthuserModule, UserModule],
})
export class AppModule {}
