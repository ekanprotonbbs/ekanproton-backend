import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsAlphanumeric,
    MaxLength,
    MinLength,
    IsStrongPassword,
} from "class-validator";

export class CreateUserRequestDto {
    @IsAlphanumeric()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: true })
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty({ required: true })
    password: string;
}
