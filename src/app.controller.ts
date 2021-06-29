import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  Request,
  ValidationPipe,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateTodoDto,
  CreateUserDto,
  UserWithToken,
  LoginDto,
  UpdateTodoDto,
} from './interfaces';

import * as jwt from 'jsonwebtoken';
// import { User } from './models/m.user.entity';
// import { Todo } from './models/m.todo.entity';
import { TodoService } from './todo/todo.service';
import { User } from './models/user.entity2';
import { Todo } from './models/todo.entity2';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  createUser(
    // @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    //this.appService.createUser(createUserDto);
    return this.todoService.createUser(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserWithToken> {
    const user = await this.todoService.findUser(loginDto);
    if (!user) {
      return null;
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('todo')
  async createTodo(
    @Request() req,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const { id } = req.user;
    const user = await this.todoService.findUser({ id: id });
    createTodoDto.user = user;
    return this.todoService.createTodo(createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  findTodos(@Request() req): Promise<Todo[]> {
    return this.todoService.findTodos({ user: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos/:id')
  async todo(@Request() req, @Param('id') todoId: string): Promise<Todo> {
    return this.todoService.findTodo({ id: todoId });
  }

  @UseGuards(JwtAuthGuard)
  @Put('todos/:id')
  async updateTodo(
    @Request() req,
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<boolean> {
    return this.todoService.updateTodo(todoId, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('todo/:id')
  async deleteTodo(
    @Request() req,
    @Param('id') todoId: number,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(todoId, req.user.id);
  }
}
