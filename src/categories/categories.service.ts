import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Programación Backend',
      description: 'NodeJS, Python, Go',
      isActive: true,
    },
    {
      id: 2,
      name: 'Bases de Datos',
      description: 'PostgresSQL, MongoDB',
      isActive: true,
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category | undefined {
    return this.categories.find((cat) => cat.id === id);
  }

  create(name: string, description?: string): Category {
    const newCategory: Category = {
      id: this.categories.length + 1,
      name,
      description,
      isActive: true,
    };

    this.categories.push(newCategory);

    return newCategory;
  }
}
