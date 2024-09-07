import { Test, TestingModule } from "@nestjs/testing";
import { CalendarController } from "./calendar.controller";
import { CalendarService } from "../services/calendar.service";

const mockCalendarService = {
	getCalendarEvents: jest.fn()
};

describe("CalendarController", () => {
	let controller: CalendarController;
	let service: CalendarService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CalendarController],
			providers: [{ provide: CalendarService, useValue: mockCalendarService }]
		}).compile();

		controller = module.get<CalendarController>(CalendarController);
		service = module.get<CalendarService>(CalendarService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
