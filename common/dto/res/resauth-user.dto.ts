import { ApiProperty } from "@nestjs/swagger";

export class UserAuthResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    lastlogin: Date;

    @ApiProperty()
    lastlogout: Date;

    @ApiProperty()
    comment: string;
}
