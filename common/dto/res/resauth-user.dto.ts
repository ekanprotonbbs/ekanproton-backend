import { ApiProperty } from "@nestjs/swagger";

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
}
