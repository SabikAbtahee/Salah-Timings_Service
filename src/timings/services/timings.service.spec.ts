import { Test, TestingModule } from '@nestjs/testing';
import { TimingsService } from './timings.service';

describe('TimingsService', () => {
  let service: TimingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimingsService],
    }).compile();

    service = module.get<TimingsService>(TimingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
