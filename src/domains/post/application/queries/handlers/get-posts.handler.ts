import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import GetPostsQuery from "@/domains/post/application/queries/get-posts.query";
import PostListResDto from "@/domains/post/application/dtos/response/post-list-res.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostReadRepository, { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";

@QueryHandler(GetPostsQuery)
export default class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(@Inject(POST_READ_REPOSITORY) private readonly postReadRepository: PostReadRepository) {}

  @Transactional()
  async execute(): Promise<PostListResDto> {
    const postPreviewDtos: PostPreviewDto[] = await this.postReadRepository.getPosts();

    return new PostListResDto(postPreviewDtos);
  }
}
