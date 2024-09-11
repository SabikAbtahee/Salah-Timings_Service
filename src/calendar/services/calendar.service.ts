import { Injectable, NotFoundException } from "@nestjs/common";
import * as ical from "node-ical";
import * as moment from "moment-timezone";
import { DateTime } from "luxon";
import { CalendarResponse } from "node-ical";

@Injectable()
export class CalendarService {
	ICAL_URL =
		"https://outlook.office365.com/owa/calendar/b0ed013c1bce4917850159974bea0538@ialfm.org/f687939f26394711adecfb0fa055bea914970036588051023950/calendar.ics"; // Replace with your actual iCal URL
	constructor() {}

    async getCalendarEvents(url?: string) {
        const events = await this.getDataFromUrl(this.ICAL_URL);
        let allEvents = [];
    
        for (const key in events) {
            const event = events[key];
            if (event.type === "VEVENT") {
                if (event.rrule) {
                    allEvents = [...allEvents, ...this.processRecurringEvent(event)];
                } else {
                    allEvents.push(this.processSingleEvent(event));
                }
            }
        }
    
        return this.sortAndFilterEventsByDate(allEvents);
    }
    
    private processRecurringEvent(event) {
        const occurrences = this.getOccurrences(event);
        const startDate = DateTime.fromJSDate(event.start).toUTC();
        const endDate = DateTime.fromJSDate(event.end).toUTC();
        const duration = endDate.diff(startDate).as("milliseconds");
    
        return occurrences.map((occurrence) => {
            const occurrenceStart = DateTime.fromJSDate(occurrence).toUTC();
            const occurrenceEnd = occurrenceStart.plus({ milliseconds: duration });
    
            return {
                summary: event.summary,
                startDate: occurrenceStart.toISO(),
                endDate: occurrenceEnd.toISO(),
                isRecurring: true
            };
        });
    }
    
    private processSingleEvent(event) {
        const startDate = DateTime.fromJSDate(event.start).toUTC();
        const endDate = DateTime.fromJSDate(event.end).toUTC();
        return {
            summary: event.summary,
            startDate: startDate.toISO(),
            endDate: endDate.toISO(),
            isRecurring: false
        };
    }
    
    private getOccurrences(event) {
        return event.rrule.all().map((date) =>
            DateTime.fromJSDate(date)
                .toUTC()
                .setZone("local", { keepLocalTime: true })
                .toJSDate()
        );
    }
    
    private sortAndFilterEventsByDate(events) {
        const now = DateTime.now().toUTC();
        return events
            .filter(event => DateTime.fromISO(event.startDate).toUTC() >= now)
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
    
	private async getDataFromUrl(url: string): Promise<CalendarResponse> {
		try {
			const events = await ical.async.fromURL(url);
			return events;
		} catch (error) {
			throw new NotFoundException(`URL invalid`);
		}
	}

}
