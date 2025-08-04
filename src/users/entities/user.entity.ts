import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Publication } from '../../publications/entities/publication.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Publication, (publication: Publication) => publication.user)
  publications: Publication[];
}

// Entity est l'entité qui représente la table "users" dans la base de données.
// PrimaryGeneratedColumn est utilisé pour la clé primaire auto-incrémentée.
// Column est utilisé pour définir les colonnes de la table.
// Le décorateur @Entity('users') indique que cette classe est une entité TypeORM
// Les propriétés de la classe User correspondent aux colonnes de la table "users" dans la
// base de données. Chaque propriété est décorée avec @Column pour indiquer qu'elle
// correspond à une colonne de la table.
// Le champ id est une clé primaire auto-incrémentée.
// Le champ email est unique et ne peut pas être nul.
// Le champ password est stocké en texte brut, mais dans une application réelle,
