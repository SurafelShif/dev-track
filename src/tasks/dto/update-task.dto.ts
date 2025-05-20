import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ValidateIf((req) => !req.end_date || req.name)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((req) => !req.name || req.end_date)
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
