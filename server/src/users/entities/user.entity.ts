import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/commo/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';

enum UserRole {
  Client, //0
  Owner, //1
  Delivery, //2
}

//graphql enum
registerEnumType(UserRole, { name: 'UserRole' });

//원래는 objectType이지만 inputType도 허용해주겠다는 의미(dto에서 inputType사용)
@InputType({ isAbstract: true })
@ObjectType() //graphql decorator, 자동으로 스키마를 빌드하기 위해 사용하는 graphql decorator
@Entity() //TypeOrm
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail() //validation
  email: string;

  @Column({ select: false }) //entity를 가져올 때 password는 가져오지 않음
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole }) //db에 enum만드는 방식
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field(() => Boolean)
  verified: boolean;

  //service에서 create,update 메소드 사용시 적용된다.(typeORM)
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  //password hash check
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
