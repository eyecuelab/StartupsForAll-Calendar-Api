import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '../database/ormconfig';
import { RatingsModule } from './ratings.module';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), RatingsModule],
      providers: [RatingsService],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
