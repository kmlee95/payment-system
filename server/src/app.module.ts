import { Verification } from './users/entities/verification.entity';
import { JwtMiddleware } from './jwt/jwt.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

//전체 모듈을 의미(각 모듈에서 불러다 쓸 수 있다)
//static module : UsersModule처럼 아무설정이 없는것, dynamic module: forRoot쓴 모듈들 => 이때 동적인모듈은 결과적으로 정적인 모듈이된다.
@Module({
  imports: [
    // nest js 방식으로 dotenv 보다 최상위에서 사용할 수 있다.
    // joi 환경변수 유효성 검사
    ConfigModule.forRoot({
      isGlobal: true, //어떤 서비스에서든지 그냥 가져다 쓸 수 있다(module 등록 안하고)
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),

    /* Typeorm module */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.NODE_ENV !== 'prod', //db구성을 entity 등록한대로 자동적으로 적용되게 해줌(보통은 db설계하고 들어가서 prod는 동작 안되게)
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User, Verification],
    }),

    /* graphql module */
    GraphQLModule.forRoot({
      autoSchemaFile: true, // 스키마 파일을 직접 가지고 있지 않고 자동생성되게
      context: ({ req }) => ({ user: req['user'] }),
    }),

    /* jwt module */
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),

    /* mail module */
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),

    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})

//전체 app에 middleware 적용
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //JwtMiddleware를 path api제외하고  POST방식만 적용
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
