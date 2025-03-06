import { ICommand } from "@nestjs/cqrs";

import CreatePostReqDto from "@/domains/post/application/dtos/request/create-post-req.dto";

export default class CreatePostCommand implements ICommand {
  readonly createPostReqDto: CreatePostReqDto;
  readonly authorId: number;

  constructor(createPostReqDto: CreatePostReqDto, authorId: number) {
    this.createPostReqDto = createPostReqDto;
    this.authorId = authorId;
  }
}
