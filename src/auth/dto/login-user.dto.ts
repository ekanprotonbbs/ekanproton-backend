import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsAlphanumeric,
    MaxLength,
    MinLength,
    IsStrongPassword,
} from "class-validator";

export class LoginUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string;
}
