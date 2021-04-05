import { MailModuleOptions } from './mail.interface';
import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/commo/commo.constants';

@Module({})
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
