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
    return jwt.sign({ id: userId }, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey); //payload 값을 가져온다.
  }
}
