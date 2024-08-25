import { Controller, Get } from "@nestjs/common";
import { TimingsService } from "../services/timings.service";

@Controller("timings")
export class TimingsController {
	constructor(private timingsService: TimingsService) {}
	@Get()
    async getSalahTimings() {
        return await this.timingsService.getTimings();
    }
}
