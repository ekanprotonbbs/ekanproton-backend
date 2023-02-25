import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserRequestDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false })
    username?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    comment?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    hiddencomment?: string
}
