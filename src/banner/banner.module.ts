import { Module } from "@nestjs/common";
import { BannerService } from "./services/banner.service";
import { BannerController } from "./controllers/banner.controller";

@Module({
	controllers: [BannerController],
	providers: [BannerService]
})
export class BannerModule {}
