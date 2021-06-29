import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithToken } from 'src/interfaces';
import { User } from 'src/models/user.entity2';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class AuthService {
  constructor(
    private todoService: TodoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('##############');

    const user = await this.todoService.findUser({ email, password });
    if (user) {
      const { ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: User): Promise<UserWithToken> {
    const payload = { id: user.id, email: user.email };
    return {
      user: user,
      token: this.jwtService.sign(payload),
    };
  }
}
