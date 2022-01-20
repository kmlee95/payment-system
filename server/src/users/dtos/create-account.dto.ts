import { CoreOutput } from 'src/commo/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType() // args으로 넣는 값을 정의한 것이 InputType or ArgsType
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType() //실제로 값을 내보내는 정의만 해 둔것이 objecttype
export class CreateAccountOutput extends CoreOutput {}
