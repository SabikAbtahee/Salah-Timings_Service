import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from "@nestjs/common";
import { SignInDto } from "../dto/signIn.dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	async signIn(@Body() loginDto: SignInDto) {
		return await this.authService.signIn(loginDto.password);
	}
}
