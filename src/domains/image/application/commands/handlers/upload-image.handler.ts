import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import UploadImageCommand from "@/domains/image/application/commands/upload-image.command";
import ImageEntity from "@/domains/image/domain/entities/image.entity";
import IImageUploadRepository, {
  IMAGE_UPLOAD_REPOSITORY,
} from "@/domains/image/domain/repositories/image-upload-repository.interface";

@CommandHandler(UploadImageCommand)
export default class UploadImageHandler implements ICommandHandler<UploadImageCommand> {
  constructor(
    @Inject(IMAGE_UPLOAD_REPOSITORY)
    private readonly imageUploadRepository: IImageUploadRepository,
  ) {}

  async execute(command: UploadImageCommand): Promise<string> {
    const { image, uploadImageReqDto } = command;
    const { dir } = uploadImageReqDto;

    const entity: ImageEntity = ImageEntity.create({ image });
    const imageUrl: string = await this.imageUploadRepository.upload(entity, dir);

    return imageUrl;
  }
}
