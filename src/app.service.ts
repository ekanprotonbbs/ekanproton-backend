import { UserAuthResponseDto } from '@common/dto/res/resauth-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {}


}
