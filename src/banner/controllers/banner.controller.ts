import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {
    FileFieldsInterceptor
} from "@nestjs/platform-express";
import { BannerService } from "../services/banner.service";

@Controller("banner")
export class BannerController {
	constructor(private readonly BannerService: BannerService) {}

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
		const imageUrls = await this.BannerService.listImages();
		return { urls: imageUrls };
	}

	@Delete("delete/:blobName")
	async deleteImage(@Param("blobName") blobName: string) {
		await this.BannerService.deleteImage(blobName);
		return { message: `Blob ${blobName} deleted successfully.` };
	}
}
