import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from 'src/models/user.entity2';
// import { User } from 'src/models/m.user.entity';
export interface UserWithToken {
  user: User;
  token: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class CreateTodoDto {
  // userId: string;
  user: User;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEmpty()
  memo: string;
}

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  memo: string;
}
