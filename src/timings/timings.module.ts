import { Module } from "@nestjs/common";
import { TimingsController } from "./controllers/timings.controller";
import { HttpModule } from "@nestjs/axios";
import { TimingsService } from "./services/timings.service";

@Module({
	imports: [HttpModule],
	controllers: [TimingsController],
	providers: [TimingsService]
})
export class TimingsModule {}
