import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

//authentication(인증)을 위해 진행
//CanActivate : true : request 진행, false:request멈춤
//context : nestjs의 ExecutionContext이다
//const gqlContext = GqlExecutionContext.create(context).getContext(); => nest의 context를 graphql context로 변경해줌
//const user = gqlContext['user']; => app.module graphql context에서 user정보를 담고 있으므로 가져올 수 있음.

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
