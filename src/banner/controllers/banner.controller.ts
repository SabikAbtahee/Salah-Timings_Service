import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {
    FileFieldsInterceptor
} from "@nestjs/platform-express";
import { BannerService } from "../services/banner.service";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("banner")
export class BannerController {
    constructor(private readonly BannerService: BannerService) { }
    
    @UseGuards(AuthGuard)
	@Post("upload")
	@UseInterceptors(FileFieldsInterceptor([{ name: "images", maxCount: 10 }]))
	async uploadImage(
		@UploadedFiles() files: { images?: Express.Multer.File[] }
	): Promise<string[]> {
		const imageUrls = await this.BannerService.uploadImage(files.images || []);
		return imageUrls;
	}

	@Get()
	async getImages() {
		const banners = await this.BannerService.listImages();
		return { banners };
    }
    
    @UseGuards(AuthGuard)
	@Delete("delete/:blobName")
	async deleteImage(@Param("blobName") blobName: string) {
		await this.BannerService.deleteImage(blobName);
		return { message: `Blob ${blobName} deleted successfully.` };
	}
}
