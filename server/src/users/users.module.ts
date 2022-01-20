import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Verification } from './entities/verification.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

//import에 넣는 모듈은 constructor 에서 불러다 쓸 수 있다.(service - Repository<User> = TypeOrm)
//외부모듈에서 UserServices를 사용하기위해 exports해준다.
@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
