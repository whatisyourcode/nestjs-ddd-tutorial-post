import { Controller, Post, Body, HttpCode, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CommandBus } from "@nestjs/cqrs";

import UploadImageCommand from "@/domains/image/application/commands/upload-image.command";
import UploadImageReqDto from "@/domains/image/application/dtos/request/upload-image-req.dto";

@Controller({ path: "image", version: "1" })
export default class ImageController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("upload")
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() uploadImageReqDto: UploadImageReqDto,
  ): Promise<string> {
    return await this.commandBus.execute(new UploadImageCommand(image, uploadImageReqDto));
  }
}
