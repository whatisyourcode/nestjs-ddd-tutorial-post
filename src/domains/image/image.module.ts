import { Module } from "@nestjs/common";

import AWSConfig from "@/shared/configs/aws.config";

import ImageController from "@/domains/image/presentation/controllers/image.controller";
import UploadImageHandler from "@/domains/image/application/commands/handlers/upload-image.handler";
import { IMAGE_UPLOAD_REPOSITORY } from "@/domains/image/domain/repositories/image-upload-repository.interface";
import ImageUploadRepository from "@/domains/image/infrastructure/repositories/image-upload.repository";

@Module({
  providers: [AWSConfig, UploadImageHandler, { provide: IMAGE_UPLOAD_REPOSITORY, useClass: ImageUploadRepository }],
  controllers: [ImageController],
})
export default class ImageModule {}
