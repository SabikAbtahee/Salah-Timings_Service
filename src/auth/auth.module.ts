import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtSecretKey } from "./constants/auth.const";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>(JwtSecretKey),
				signOptions: { expiresIn: "1h" }
			})
		})
	],
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}
