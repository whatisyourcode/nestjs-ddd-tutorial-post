import { IsNotEmpty } from "class-validator";

export default class DeletePostReqDto {
  @IsNotEmpty()
  readonly postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
