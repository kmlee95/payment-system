import { EditProfileOutput, EditProfileInput } from './dtos/edit-profile';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { AuthGuard } from './../auth/auth.guard';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return await this.userService.createAccount(createAccountInput);
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return await this.userService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.userService.findById(userProfileInput.userId);
      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        error: 'User Not Found',
        ok: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      await this.userService.editProfile(authUser.id, editProfileInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
