import { Injectable, NotFoundException } from "@nestjs/common";
import * as ical from "node-ical";
@Injectable()
export class CalendarService {
	constructor() {}

	async getCalendarEvents(url?: string): Promise<any> {
		const ICAL_URL =
			url ??
			"https://outlook.office365.com/owa/calendar/b0ed013c1bce4917850159974bea0538@ialfm.org/f687939f26394711adecfb0fa055bea914970036588051023950/calendar.ics"; // Replace with your actual iCal URL

		const events = await this.getDataFromUrl(ICAL_URL);
		const groupedEvents = {};
		Object.values(events)
			.filter((event) => event.type === "VEVENT")
			.forEach((event) => {
				const date = event.start.toISOString().split("T")[0];
				if (!groupedEvents[date]) {
					groupedEvents[date] = [];
				}
				groupedEvents[date].push({
					summary: event.summary,
					start: event.start.toISOString(),
					end: event.end.toISOString()
				});
			});

		// Sort events within each day
		Object.keys(groupedEvents).forEach((date) => {
			groupedEvents[date].sort(
				(
					a: { start: string | number | Date },
					b: { start: string | number | Date }
				) => {
					return new Date(a.start).getTime() - new Date(b.start).getTime();
				}
			);
		});
		return groupedEvents;
	}

	private async getDataFromUrl(url: string) {
		try {
			const events = await ical.async.fromURL(url);
			return events;
		} catch (error) {
			throw new NotFoundException(`URL invalid`);
		}
	}
}
