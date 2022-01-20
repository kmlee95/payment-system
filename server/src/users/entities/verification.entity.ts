import { v4 as uuidv4 } from 'uuid';
import { CoreEntity } from 'src/commo/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, BeforeInsert } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(() => String)
  code: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn() //OneToOne을 사용하면 필수(Verification 에서 User에 접근)
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
