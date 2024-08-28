import {
	BlobClient,
	BlobServiceClient,
	BlockBlobClient,
	ContainerClient
} from "@azure/storage-blob";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	BannerContainerName,
	StorageConnectionString
} from "../constants/banner.const";
import { IBanner } from "../interfaces/IBanner.interface";

@Injectable()
export class BannerService {
	private containerClient: ContainerClient;

	constructor(private configService: ConfigService) {
		this.initializeStorage();
	}

	async uploadImage(files: Express.Multer.File[]): Promise<string[]> {
		const uploadedUrls: string[] = [];
		for (const file of files) {
			const blobName = `${file.originalname}`;
			const blockBlobClient: BlockBlobClient =
				this.containerClient.getBlockBlobClient(blobName);
			await blockBlobClient.uploadData(file.buffer);
			uploadedUrls.push(blockBlobClient.url);
		}
		return uploadedUrls;
	}

	async listImages(): Promise<IBanner[]> {
		const blobUrls: IBanner[] = [];
		for await (const blob of this.containerClient.listBlobsFlat()) {
			const blobClient = this.containerClient.getBlobClient(blob.name);
			blobUrls.push({
				name: blobClient.name,
				url: blobClient.url
			});
		}
		return blobUrls;
	}

	async deleteImage(blobName: string): Promise<void> {
		const blobClient: BlobClient = this.containerClient.getBlobClient(blobName);

		const exists = await blobClient.exists();
		if (!exists) {
			throw new NotFoundException(`Blob with name ${blobName} not found.`);
		}

		await blobClient.delete();
	}

	private initializeStorage(): void {
		const connectionString = this.configService.get<string>(
			StorageConnectionString
		);
		const containerName = this.configService.get<string>(BannerContainerName);
		const blobServiceClient =
			BlobServiceClient.fromConnectionString(connectionString);
		this.containerClient = blobServiceClient.getContainerClient(containerName);
	}
}
