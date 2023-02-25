import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    lastlogin: Date;

    @ApiProperty()
    comment: string;
}
