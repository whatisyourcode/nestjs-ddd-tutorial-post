import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import PostNotFoundException from "@/domains/post/application/exceptions/post-not-found-exception";
import GetPostQuery from "@/domains/post/application/queries/get-post.query";
import PostResDto from "@/domains/post/application/dtos/response/post-res.dto";
import PostDto from "@/domains/post/application/dtos/post.dto";
import PostReadRepository, { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";

@QueryHandler(GetPostQuery)
export default class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(@Inject(POST_READ_REPOSITORY) private readonly postReadRepository: PostReadRepository) {}

  @Transactional()
  async execute(query: GetPostQuery): Promise<PostResDto> {
    const { postId } = query;
    const postDto: PostDto | null = await this.postReadRepository.getPostById(postId);
    if (!postDto) {
      throw new PostNotFoundException();
    }

    return new PostResDto(postDto);
  }
}
