import { ICommand } from "@nestjs/cqrs";

import CreatePostReqDto from "@/domains/post/application/dtos/request/create-post-req.dto";

export default class CreatePostCommand implements ICommand {
  readonly createPostReqDto: CreatePostReqDto;

  constructor(createPostReqDto: CreatePostReqDto) {
    this.createPostReqDto = createPostReqDto;
  }
}
