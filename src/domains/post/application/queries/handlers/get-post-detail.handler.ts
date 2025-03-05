import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import PostNotFoundException from "@/domains/post/application/exceptions/post-not-found-exception";
import GetPostDetailQuery from "@/domains/post/application/queries/get-post-detail.query";
import PostDetailResDto from "@/domains/post/application/dtos/response/post-detail-res.dto";
import PostDetailDto from "@/domains/post/application/dtos/post-detail.dto";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";

@QueryHandler(GetPostDetailQuery)
export default class GetPostHandler implements IQueryHandler<GetPostDetailQuery> {
  constructor(
    @Inject(POST_READ_REPOSITORY)
    private readonly postReadRepository: IPostReadRepository,
  ) {}

  @Transactional()
  async execute(query: GetPostDetailQuery): Promise<PostDetailResDto> {
    const { postId } = query;
    const postDetailDto: PostDetailDto | null = await this.postReadRepository.getPostDetailById(postId);
    if (!postDetailDto) {
      throw new PostNotFoundException();
    }

    return new PostDetailResDto(postDetailDto);
  }
}
