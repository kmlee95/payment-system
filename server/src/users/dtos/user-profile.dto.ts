import { CoreOutput } from 'src/commo/dtos/output.dto';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => String)
  userId: string;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
