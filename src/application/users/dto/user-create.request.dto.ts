import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCreateRequstDto {
  @IsEmail({}, { message: '이메일 형식으로 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @MaxLength(10, { message: '닉네임은 10자 이하로 작성해주세요.' })
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  @MinLength(8, { message: '비밀번호는 8자 이상 입력해주세요.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
