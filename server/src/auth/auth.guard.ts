import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

//CanActivate : true : request 진행, false:request멈춤
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    console.log(user);
    if (!user) {
      return false;
    }
    return true;
  }
}
