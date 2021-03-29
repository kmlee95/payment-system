#### 1일차

- npm i @nestjs/graphql graphql-tools graphql apollo-server-express

- nest g mo 모듈명 => 이후 모듈명.resolver.ts

- apollo-server

- TypeOrm

#### 2일차 (TypeOrm and nest)

- TypeOrmModule에 Restaurant entity 가진다. => db가 됨

- module.ts 에서 TypeOrmModule 을 import, forFeture은 TypeOrmModule이 특정 feature을 import할 수 있게 해준다.

- resolver에 service를 추가한다.(constructor) 이때 service는 providers(module.ts)에 추가 되어야 한다. 그래야만 class에 inject 가능

- service 부분에서 @injectRepository에 대해 작성한다. entity로 작성한 것이 repository가 된다.( ex) Repository<Restaurant> )
  @InjectRepository를 통해 service에서 db 접근이 가능하다

```javascript
//entity 부분
@Field((type) => Boolean, { defaultValue: true }) //graphql
@Column({ default: true })  //database(typeorm)
@IsOptional() //dto(필드를 보내거나 안보내겠다는 여부, 변수가 필수가 아니다.)
@IsBoolean()  //dto
isVegan: boolean;
```
