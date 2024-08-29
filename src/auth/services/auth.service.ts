import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SecretPasswordKey } from "../constants/auth.const";
import { JwtService } from "@nestjs/jwt";
import { SignInDtoResponse } from "../dto/signIn.dto";

@Injectable()
export class AuthService {
	private readonly secretPassword: string;
	constructor(
		private readonly jwtService: JwtService,
		private configService: ConfigService
	) {
		this.secretPassword = this.configService.get<string>(SecretPasswordKey);
	}

	validateSecretKey(secretKey: string): boolean {
		return secretKey === this.secretPassword;
	}

	async generateToken(): Promise<string> {
		return await this.jwtService.signAsync({
			sub: "sdf",
			username: "sad"
		});
	}

	async signIn(pass: string): Promise<SignInDtoResponse> {
		if (this.secretPassword !== pass) {
			throw new UnauthorizedException();
		}
		const payload = { sub: "SalahTimes", username: "SalahTimes" };
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}

	validateToken(token: string): any {
		try {
			const secretKey = this.configService.get<string>("SECRET_KEY");
			return this.jwtService.verify(token, { secret: secretKey });
		} catch (error) {
			throw new UnauthorizedException("Invalid token");
		}
	}
}
