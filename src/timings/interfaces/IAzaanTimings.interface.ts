import { PrayerTexts } from "../enums/PrayerTexts.enum";

export interface IAzaanTimings {
	[PrayerTexts.Fazr]: string;
	[PrayerTexts.Dhuhr]: string;
	[PrayerTexts.Asr]: string;
	[PrayerTexts.Maghrib]: string;
	[PrayerTexts.Isha]: string;
}


