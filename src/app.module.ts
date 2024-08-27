import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TimingsModule } from "./timings/timings.module";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		TimingsModule,
		FileUploadModule,
		ConfigModule.forRoot({ envFilePath:`.env`,isGlobal: true })
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
