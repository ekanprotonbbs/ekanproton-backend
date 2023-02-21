import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';


export class DeleteUserRequestDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string
}
