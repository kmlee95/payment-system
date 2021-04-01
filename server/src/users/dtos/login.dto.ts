import { Field, ObjectType, InputType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/commo/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
