import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;
}
