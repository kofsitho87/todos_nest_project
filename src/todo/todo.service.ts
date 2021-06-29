import { Injectable } from '@nestjs/common';
import { CreateTodoDto, CreateUserDto, UpdateTodoDto } from 'src/interfaces';
import { Todo } from 'src/models/todo.entity2';
import { User } from 'src/models/user.entity2';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  private userRepository: Repository<User>;
  private todoRepository: Repository<Todo>;

  constructor(private connection: Connection) {
    this.userRepository = connection.getRepository(User);
    this.todoRepository = connection.getRepository(Todo);
  }

  async createUser({ email, name, password }: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    return this.userRepository.save(user);
  }

  async findUser(filter: any): Promise<User> {
    return this.userRepository.findOne(filter);
  }

  async createTodo({ user, title, memo }: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.user = user;
    todo.title = title;
    todo.memo = memo;
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<boolean> {
    const { affected } = await this.todoRepository.update(
      todoId,
      updateTodoDto,
    );
    return affected > 0;
  }

  async findTodos(filter: any): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  async findTodo(filter: any): Promise<Todo> {
    return this.todoRepository.findOne(filter);
  }

  async deleteTodo(todoId: number, userId: number): Promise<boolean> {
    const { affected } = await this.todoRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id && user = :user', { id: todoId, user: userId })
      .execute();
    return affected > 0;
  }
}
