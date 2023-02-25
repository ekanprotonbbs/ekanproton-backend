import { Module, UseGuards } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionGuard } from './auth.guard';

@Module({
  providers: [AuthService, SessionGuard],
  imports: [PrismaModule],
  exports: [SessionGuard],
  controllers: [AuthController],
})
export class AuthModule {}
