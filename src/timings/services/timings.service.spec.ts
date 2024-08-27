import { Test, TestingModule } from "@nestjs/testing";
import { TimingsService } from "./timings.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";

const mockConfigService = {
    get: jest.fn().mockReturnValue('http://fake-url.com'),
  };
  
  const mockHttpService = {
    get: jest.fn(),
  };
  
describe("TimingsService", () => {
	let service: TimingsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TimingsService,
				{ provide: ConfigService, useValue: mockConfigService },
				{ provide: HttpService, useValue: mockHttpService }
			]
		}).compile();

		service = module.get<TimingsService>(TimingsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
