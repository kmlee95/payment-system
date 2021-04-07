import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

import { Verification } from './entities/verification.entity';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';

//mock 더미데이터는 테스트 함수만 적어준다.
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

//모듈 만들기
describe('UserService', () => {
  let service: UsersService;

  //모듈 만들기
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
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
