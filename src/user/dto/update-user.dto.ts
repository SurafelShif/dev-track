import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((req) => !req.password || req.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((req) => !req.name || req.password)
  @IsNotEmpty()
  @IsString()
  password: string;
}
