import { IsNotEmpty } from "class-validator";

export default class PostRemoveReqDto {
  @IsNotEmpty()
  readonly postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
