import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTodoDto,
  CreateUserDto,
  LoginDto,
  UpdateTodoDto,
} from './interfaces';
import { Todo, TodoDocument } from './models/m.todo.entity';
import { User, UserDocument } from './models/m.user.entity';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectModel('users') private userModel: Model<UserDocument>,
  //   @InjectModel('todos') private todoModel: Model<TodoDocument>,
  // ) {}
  getHello(): string {
    return 'Hello World!';
  }
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const payload = createUserDto;
  //   const user = new this.userModel(payload);
  //   return await user.save();
  // }
  // async findUser(filter: LoginDto): Promise<User> {
  //   const user = await this.userModel.findOne(filter);
  //   return user;
  // }
  // async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  //   return new this.todoModel(createTodoDto).save();
  // }
  // async updateTodo(
  //   todoId: string,
  //   updateTodoDto: UpdateTodoDto,
  // ): Promise<boolean> {
  //   const { nModified } = await this.todoModel.updateOne(
  //     { _id: todoId },
  //     updateTodoDto,
  //   );
  //   return nModified > 0;
  // }
  // async findTodos(filter): Promise<Todo[]> {
  //   return this.todoModel.find(filter);
  // }
  // async findTodo(filter): Promise<Todo> {
  //   return this.todoModel.findOne(filter);
  // }
  // async deleteTodo(todoId: string): Promise<boolean> {
  //   const { deletedCount } = await this.todoModel.deleteOne({ _id: todoId });
  //   return deletedCount > 0;
  // }
}
