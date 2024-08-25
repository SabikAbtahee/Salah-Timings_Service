import { IslamicMonthsEnum } from "../enums/IslamicMonths.enum";
import { PrayerTexts } from "../enums/PrayerTexts.enum";

export const IslamicMonths = {
	[IslamicMonthsEnum.Muharram]: "Muharram",
	[IslamicMonthsEnum.Safar]: "Safar",
	[IslamicMonthsEnum["Rabi Al-Awwal"]]: "Rabi Al-Awwal",
	[IslamicMonthsEnum["Rabi Al-Thani"]]: "Rabi Al-Thani",
	[IslamicMonthsEnum["Jumada Al-Awwal"]]: "Jumada Al-Awwal",
	[IslamicMonthsEnum["Jumada Al-Thani"]]: "Jumada Al-Thani",
	[IslamicMonthsEnum.Rajab]: "Rajab",
	[IslamicMonthsEnum.Shaban]: "Shaban",
	[IslamicMonthsEnum.Ramadan]: "Ramadan",
	[IslamicMonthsEnum.Shawwal]: "Shawwal",
	[IslamicMonthsEnum["Dhul Qadah"]]: "Dhul Qadah",
	[IslamicMonthsEnum["Dhu al-Hijjah"]]: "Dhu al-Hijjah"
};

export const IqamahTimeMap = {
	1: PrayerTexts.Fazr,
	2: PrayerTexts.Dhuhr,
	3: PrayerTexts.Asr,
	4: PrayerTexts.Maghrib,
	5: PrayerTexts.Isha,
    6: PrayerTexts.Khutbah_One,
	7: PrayerTexts.Jummah_One,
	8: PrayerTexts.Khutbah_Two,
	9: PrayerTexts.Jummah_Two,
};

export const AzaanTimeMap = {
	1: PrayerTexts.Fazr,
	2: PrayerTexts.Dhuhr,
	3: PrayerTexts.Asr,
	4: PrayerTexts.Maghrib,
	5: PrayerTexts.Isha,
};
