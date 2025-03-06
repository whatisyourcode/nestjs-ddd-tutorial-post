import { IsNotEmpty, IsString } from "class-validator";

export default class UploadImageReqDto {
  @IsNotEmpty()
  @IsString()
  readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }
}
