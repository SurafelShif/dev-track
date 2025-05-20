import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, MinDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;
  @MinDate(new Date())
  @IsDate()
  @Type(() => Date)
  end_date: Date;
  @IsInt()
  projectId: number;
}
