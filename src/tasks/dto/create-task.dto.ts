import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;
  @IsDate()
  @Type(() => Date)
  end_date: Date;
  @IsInt()
  project_id: number;
}
