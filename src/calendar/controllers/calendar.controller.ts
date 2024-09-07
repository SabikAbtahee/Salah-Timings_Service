import { Controller, Get, Param } from "@nestjs/common";
import { CalendarService } from "../services/calendar.service";

@Controller("calendar")
export class CalendarController {
	constructor(private readonly calendarService: CalendarService) {}

	@Get("events")
	async getCalendarEvents() {
		return await this.calendarService.getCalendarEvents();
	}

	@Get("events/:url")
	async getCalendarEventsWithUrl(@Param("url") url: string) {
		return await this.calendarService.getCalendarEvents(url);
	}
}
