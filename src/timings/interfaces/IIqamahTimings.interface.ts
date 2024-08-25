import { PrayerTexts } from "../enums/PrayerTexts.enum";

export interface IIqamahTimings {
	[PrayerTexts.Fazr]: string;
	[PrayerTexts.Dhuhr]: string;
	[PrayerTexts.Asr]: string;
	[PrayerTexts.Maghrib]: string;
	[PrayerTexts.Isha]: string;
	[PrayerTexts.Jummah_One]: string;
	[PrayerTexts.Jummah_Two]: string;
	[PrayerTexts.Khutbah_One]: string;
	[PrayerTexts.Khutbah_Two]: string;
}