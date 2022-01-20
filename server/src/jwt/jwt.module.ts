import { CONFIG_OPTIONS } from 'src/commo/commo.constants';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS, //inject시 이 값으로 해준다.
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
