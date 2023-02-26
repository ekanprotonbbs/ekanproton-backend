import { UserAuthResponseDto } from '@common/dto/res/resauth-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {

    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<UserAuthResponseDto[]> {
        const resultarray = (await this.prisma.user.findMany({
            orderBy: {
                id: "asc"
            }
        })).map((one) => {
            const { id, username, createdAt, lastLogin, lastUpdate,comment,hiddencomment,role } = one;
            return {
                id,
                username,
                createdAt,
                lastLogin,
                lastUpdate,                
                comment,
                hiddencomment,
                role
            };
        });
        return resultarray;
    }
}
