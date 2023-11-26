import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateRequstDto {
  @IsEmail({}, { message: '이메일 형식으로 작성해 주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  email: string;

  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  name: string;

  @MinLength(8, { message: '비밀번호가 8자 이상이 되도록 해 주세요.' })
  @IsNotEmpty({ message: '비밀번호가 8자 이상이 되도록 해 주세요.' })
  password: string;
}
