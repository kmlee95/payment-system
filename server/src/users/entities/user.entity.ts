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
  Client,
  Owner,
  Delivery,
}

//graphql enum
registerEnumType(UserRole, { name: 'UserRole' });

//원래는 objectType이지만 inputType도 허용해주겠다는 의미(dto에서 inputType사용)
@InputType({ isAbstract: true })
@ObjectType() //graphql decorator, 자동으로 스키마를 빌드하기 위해 사용하는 graphql decorator
@Entity() //TypeOrm
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail() //validation
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole }) //db에 enum만드는 방식
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  //service에서 create,update 메소드 사용시 적용된다.
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
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
