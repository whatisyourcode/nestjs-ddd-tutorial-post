import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import UpdatePostFormDto from "@/domains/post/application/dtos/update-post-form.dto";

export default class UpdatePostReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdatePostFormDto)
  readonly post: UpdatePostFormDto;

  constructor(post: UpdatePostFormDto) {
    this.post = post;
  }
}
