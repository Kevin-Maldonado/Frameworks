import { Injectable } from '@nestjs/common';
import { Role, User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Juan Alumno',
      email: 'juan@email.com',
      role: 'STUDENT',
      isActive: true,
    },
    {
      id: 2,
      name: 'Maria Mentora',
      email: 'maria@email.com',
      role: 'MENTOR',
      isActive: true,
    },
  ];

  findAll(): User[] {
    return this.users.filter((u) => u.isActive);
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id && u.isActive);
  }

  create(name: string, email: string, role: Role): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      role,
      isActive: true,
    };

    this.users.push(newUser);
    return newUser;
  }
}
