import { Injectable, NotFoundException } from "@nestjs/common";
import * as ical from "node-ical";
import * as moment from "moment-timezone";

@Injectable()
export class CalendarService {
	ICAL_URL =
		"https://outlook.office365.com/owa/calendar/b0ed013c1bce4917850159974bea0538@ialfm.org/f687939f26394711adecfb0fa055bea914970036588051023950/calendar.ics"; // Replace with your actual iCal URL
	constructor() {}

	async getCalendarEvents(url?: string): Promise<any> {
		const events = await this.getDataFromUrl(this.ICAL_URL);
		const groupedEvents = {};
		const now = moment().tz("America/Chicago").startOf("day");

		Object.values(events)
			.filter((event) => event.type === "VEVENT")
			.forEach((event) => {
				let eventStart = moment(event.start).tz("America/Chicago", true);
				let eventEnd = moment(event.end).tz("America/Chicago", true);

				if (
					event.start &&
					event.end &&
					event.start["dateOnly"] &&
					event.end["dateOnly"]
				) {
					eventStart = moment(event.start).tz("America/Chicago").startOf("day");
					eventEnd = moment(event.end).tz("America/Chicago").endOf("day");
				}
				if (event.rrule) {
					const ruleOccurrences = event.rrule.between(
						now.toDate(),
						moment().add(6, "months").toDate()
					);
					ruleOccurrences.forEach((occurrence) => {
						const occurrenceStart = moment(occurrence)
							.tz("America/Chicago")
							.add(5, "hours");
						const occurrenceEnd = moment(occurrenceStart).add(
							moment.duration(event["duration"])
						);

						const adjustedDate = occurrenceStart
							.clone()
							.add(1, "day")
							.format("YYYY-MM-DD");

						if (occurrenceStart.isSameOrAfter(now)) {
							if (!groupedEvents[adjustedDate]) {
								groupedEvents[adjustedDate] = [];
							}
							groupedEvents[adjustedDate].push({
								summary: event.summary || "No Title",
								start: occurrenceStart.toISOString(),
								end: occurrenceEnd.toISOString(),
								location: event.location || "No Location"
							});
						}
					});
				} else {
					if (eventStart.isSameOrAfter(now)) {
						const adjustedDate = eventStart
							.clone()
							.add(1, "day")
							.format("YYYY-MM-DD");

						if (!groupedEvents[adjustedDate]) {
							groupedEvents[adjustedDate] = [];
						}

						groupedEvents[adjustedDate].push({
							summary: event.summary || "No Title",
							start: eventStart.toISOString(),
							end: eventEnd.toISOString(),
							location: event.location || "No Location"
						});
					}
				}
			});
		Object.keys(groupedEvents).forEach((date) => {
			groupedEvents[date].sort(
				(a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
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
