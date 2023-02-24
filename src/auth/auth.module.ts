import { Module, UseGuards } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
//import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { SessionGuard } from './auth.guard';

@Module({
  providers: [AuthService, SessionGuard],
  imports: [PrismaModule],
  controllers: [AuthController],
})
export class AuthModule {}
