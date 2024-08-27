import { Test, TestingModule } from "@nestjs/testing";
import { TimingsController } from "./timings.controller";
import { TimingsService } from "../services/timings.service";

const mockTimingsService = {
	getTimings: jest.fn()
};

describe("TimingsController", () => {
	let controller: TimingsController;
    let service: TimingsService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
            controllers: [TimingsController],
            providers: [
                { provide: TimingsService, useValue: mockTimingsService },
              ],
		}).compile();

		controller = module.get<TimingsController>(TimingsController);
        service = module.get<TimingsService>(TimingsService);
    });

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
