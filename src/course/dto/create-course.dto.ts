import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  level!: string;

  @IsString()
  @IsNotEmpty()
  price!: string;
}
