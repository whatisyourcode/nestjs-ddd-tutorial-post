import { ICommand } from "@nestjs/cqrs";

import UploadImageReqDto from "@/domains/image/application/dtos/request/upload-image-req.dto";

export default class UploadImageCommand implements ICommand {
  readonly image: Express.Multer.File;
  readonly uploadImageReqDto: UploadImageReqDto;

  constructor(image: Express.Multer.File, uploadImageReqDto: UploadImageReqDto) {
    this.image = image;
    this.uploadImageReqDto = uploadImageReqDto;
  }
}
