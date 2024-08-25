import { IAzaanTimings } from "./IAzaanTimings.interface";
import { IIqamahTimings } from "./IIqamahTimings.interface";

export interface IPrayerTimings {
	Iqamah: IIqamahTimings;
	Azaan: IAzaanTimings;
}
