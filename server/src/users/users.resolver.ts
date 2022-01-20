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
import { VerifyEmailOutput, VerifyEmailInput } from './dtos/verify-email.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  // 회원 생성
  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  // 로그인
  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation(() => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.userService.verifyEmail(code);
  }
}
