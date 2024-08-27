import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cheerio from "cheerio";
import { map, Observable, retry } from "rxjs";
import { AzaanTimeMap, IqamahTimeMap } from "../constants/timings.const";
import { IAzaanTimings } from "../interfaces/IAzaanTimings.interface";
import { IIqamahTimings } from "../interfaces/IIqamahTimings.interface";
import { IPrayerTimings } from "../interfaces/IPrayerTimings.interface";
import { PrayerTimings } from "../models/PrayerTimings";

@Injectable()
export class TimingsService {
	constructor(
		private configService: ConfigService,
		private readonly httpService: HttpService
	) {}

	getTimings(): Observable<IPrayerTimings> {
		const timingsUrl = this.configService.get<string>("PRAYER_TIMINGS_URL");
		return this.httpService.get(timingsUrl, { responseType: "text" }).pipe(
			retry(3),
			map((res) => this.parseTimings(res?.data))
		);
	}
	private parseTimings(htmlContent: string): IPrayerTimings {
		const htmlParsed = cheerio.load(htmlContent);
		const prayerIqamaDivs = htmlParsed(".prayer_iqama_div");
		const prayerAzaanDiv = htmlParsed(".prayer_azaan_div");
		let result: IPrayerTimings = new PrayerTimings();
		result.Iqamah = this.extractTimes(
			prayerIqamaDivs,
			IqamahTimeMap
		) as unknown as IIqamahTimings;
		result.Azaan = this.extractTimes(
			prayerAzaanDiv,
			AzaanTimeMap
		) as unknown as IAzaanTimings;

		return result;
	}

	private extractTimes(
		elements: any,
		timeMap: { [key: number]: string }
	): { [key: string]: string } {
		const timePattern = /\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/g;
		const result: { [key: string]: string } = {};

		elements.each((i, el) => {
			const text: string = cheerio.load(el).text();
			const matches: Array<string> | null = text.match(timePattern);
			if (matches) {
				const timeKey = timeMap[i];
				if (timeKey) {
					result[timeKey] = matches[0];
				}
			}
		});

		return result;
	}
}
