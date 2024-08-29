import { Test, TestingModule } from '@nestjs/testing';
import { BannerController } from './banner.controller';

xdescribe('BannerController', () => {
  let controller: BannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerController],
    }).compile();

    controller = module.get<BannerController>(BannerController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
