import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  //Repository ici permet de manipuler les entités de type T
  //Repository est une classe de TypeORM qui fournit des méthodes pour interagir avec la base
  //de données, comme find, save, delete, etc.
  //T est un type générique qui étend ObjectLiteral, ce qui signifie qu'il
  //peut être n'importe quel objet littéral, comme une entité TypeORM.
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }
  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    return this.repository.save({ ...entity, id } as unknown as T);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
