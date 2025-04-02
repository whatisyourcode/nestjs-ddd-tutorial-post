import { IsNotEmpty, IsString } from "class-validator";

export default class UploadImageResDto {
  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;

  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}
