import { ICommand } from "@nestjs/cqrs";

export default class TogglePostLikeCommand implements ICommand {
  readonly postId: number;
  readonly memberId: number;

  constructor(postId: number, memberId: number) {
    this.postId = postId;
    this.memberId = memberId;
  }
}
