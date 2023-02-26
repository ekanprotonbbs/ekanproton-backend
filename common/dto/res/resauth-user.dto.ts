import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class UserAuthResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    lastLogin: Date;

    @ApiProperty()
    lastUpdate: Date

    @ApiProperty()
    comment: string;

    @ApiProperty()
    hiddencomment: string;

    @ApiProperty()
    role: Role
}
