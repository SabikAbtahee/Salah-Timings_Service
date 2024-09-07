import { Module } from "@nestjs/common";
import { CalendarService } from "./services/calendar.service";
import { CalendarController } from "./controllers/calendar.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [HttpModule],
	providers: [CalendarService],
	controllers: [CalendarController]
})
export class CalendarModule {}
