import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Length(8, 500)
  @IsString()
  @IsNotEmpty()
  password: string;
}
