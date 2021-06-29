import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TodoService } from 'src/todo/todo.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'private',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, TodoService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtModule],
})
export class AuthModule {}
