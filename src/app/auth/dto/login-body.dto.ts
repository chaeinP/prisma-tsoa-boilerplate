import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsEmail({}, { message: '이메일 형식으로 작성해 주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  email: string;

  @IsString({ message: '비밀번호는 입력해 주세요.' })
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  password: string;
}
