import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  //Repository ici permet de manipuler les entités de type T
  //Repository est une classe de TypeORM qui fournit des méthodes pour interagir avec la base
  //de données, comme find, save, delete, etc.
  //T est un type générique qui étend ObjectLiteral, ce qui signifie qu'il
  //peut être n'importe quel objet littéral, comme une entité TypeORM.
  constructor(protected readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }
}
