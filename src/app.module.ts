import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TimingsModule } from "./timings/timings.module";
import { ConfigModule } from "@nestjs/config";
import { BannerModule } from "./banner/banner.module";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TimingsModule,
		BannerModule,
		ConfigModule.forRoot({ envFilePath:`.env`,isGlobal: true }),
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
