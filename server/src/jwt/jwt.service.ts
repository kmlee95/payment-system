import { JwtModuleOptions } from './jwt.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/commo/commo.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(userId: string): string {
    //사용자는 토큰안에 뭐가 들어있는지 확인가능하다. 대신 privatekey를 이용하므로 사용자카 토큰을 수정했는지 알수있다.
    return jwt.sign({ id: userId }, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey); //payload 값을 가져온다.
  }
}
