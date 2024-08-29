import { Test, TestingModule } from '@nestjs/testing';
import { BannerService } from './banner.service';

xdescribe('BannerService', () => {
  let service: BannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerService],
    }).compile();

    service = module.get<BannerService>(BannerService);
  });

  xit('should be defined', () => {
    expect(service).toBeDefined();
  });
});
