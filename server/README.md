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

#### 3일차

user Module제작

- id, createAt, updateAt, email, password, role(client|owner|delivery)
- CRUD(CreateAccount, LogIn, See Profile, Edit Profile, Verify Email)

#### 4일차

user Authentication
npm install --save @nestjs/jwt passport-jwt

- Injection 의 원리 : module -> provider
- jwt 구현(middleware적용)

#### 5일차

req['user']값을 graphql에서 가져오기

```javascript
GraphQLModule.forRoot({
  autoSchemaFile: true,
  context: ({ req }) => ({ user: req['user'] }),
}),
```

2. auth 생성  
   (1) Authentication : 누가 자원을 요청하는지 확인하는 과정(입증,증명 인증)  
   auth.guard 는 함수인데 request를 다음단계로 진행할지 결정
   graphql에서 authentication 을 위해 @UseGuards 어노테이션을 사용한다.

   (1-1) auth-user.decorator.ts 에서 처럼 decorator을 생성해줄 수 있다.

   (2) Authorization :user가 어떤일을 하기 전에 permission을 가지고 있는 지 확인, 허가[인가]

<!-- {
  "x-jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE3Mjg4NTY5fQ.53yXqQRQRyNrWdxYILPE-ruNb3frGv6ZUKUK66HSL8E"
} -->

#### 6일차

1. db 관계 맺을 시
   @OneToOne(type => Profile)
   @JoinColumn //접근하는 곳에서 작성

- 항상 entity를 생성하면 app.module의 entities에 추가한다.

- verifiation 추가

2. db관계 맺은거에서 불러오고 싶을 시 아래와 같이 작성

```javascript
const verification = await this.verifications.findOne(
  { code },
  { loadRelationIds: true }, //id만 불러온다
  { relations: ['user'] }, // user정보를 전체 불러온다.
);
```

3. user 선택 시 password는 빼고 가져오기

```javascript
const user = await this.users.findOne(userId); //라고 했을 때 엔티티에 아래와 같이 주면 된다.

@Column({ select: false })  //select:false 를 준다.
@Field((type) => String)
@IsString()
password: string;

```

- 프론트에선 api호출시 axios, fetch를 사용하지만 노드에는 없다. 대신 `request` 나 `got` 패키지를 설치해서 호출
- mailgun api 를 사용하여 email 전송기능 구현

#### 7일차

1. unit testing (jest, mock 이용)

실행 : npm run test:watch

```javascript
//user.service.spec.ts
describe('UserService', () => {
  let service: UsersService;

  //모듈 만들기
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get < UsersService > UsersService;
  });

  it('should be define', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
```

2. 문제
   (1) 경로

```javascript
"moduleNameMapper":{
  "^src/(.*)$":"<rootDir>/$1"
},
```

3.  npm run test:cov

4.  expect(jwt.verify).toHaveBeenCalledTimes(1);
    expect(jwt.verify).toHaveBeenCalledWith(TOKEN, TEST_KEY);

    expect(나올 값).toHabeBeenCalledWith(기대 값);
