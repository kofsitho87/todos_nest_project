import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoSchema } from './models/m.todo.entity';
import { UserSchema } from './models/m.user.entity';
import { TodoService } from './todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity2';
import { Todo } from './models/todo.entity2';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PW,
      database: process.env.MYSQL_DB_DB,
      entities: [__dirname + '/models/*.entity2{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Todo]),

    MongooseModule.forRoot(process.env.DATABASE_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'todos', schema: TodoSchema }]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodoService],
})
export class AppModule {}
