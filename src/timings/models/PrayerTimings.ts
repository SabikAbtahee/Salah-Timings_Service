import { PrayerTexts } from "../enums/PrayerTexts.enum";
import { IAzaanTimings } from "../interfaces/IAzaanTimings.interface";
import { IIqamahTimings } from "../interfaces/IIqamahTimings.interface";
import { IPrayerTimings } from "../interfaces/IPrayerTimings.interface";

export class PrayerTimings implements IPrayerTimings {
	Iqamah: IIqamahTimings;
	Azaan: IAzaanTimings;

	constructor() {
		this.Iqamah = {
			[PrayerTexts.Fazr]: "",
			[PrayerTexts.Dhuhr]: "",
			[PrayerTexts.Asr]: "",
			[PrayerTexts.Maghrib]: "",
			[PrayerTexts.Isha]: "",
			[PrayerTexts.Jummah_One]: "",
			[PrayerTexts.Jummah_Two]: "",
			[PrayerTexts.Khutbah_One]: "",
			[PrayerTexts.Khutbah_Two]: ""
		};
		this.Azaan = {
			[PrayerTexts.Fazr]: "",
			[PrayerTexts.Dhuhr]: "",
			[PrayerTexts.Asr]: "",
			[PrayerTexts.Maghrib]: "",
			[PrayerTexts.Isha]: ""
		};
	}
}
