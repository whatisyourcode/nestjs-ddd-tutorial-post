import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import GetPostDetailQuery from "@/domains/post/application/queries/get-post-detail.query";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";
import PostDetailResDto from "@/domains/post/application/dtos/response/post-detail-res.dto";
import PostNotFoundException from "@/domains/post/application/exceptions/post-not-found-exception";
import PostDetailDto from "@/domains/post/application/dtos/post-detail.dto";

@QueryHandler(GetPostDetailQuery)
export default class GetPostDetailHandlerForTest implements IQueryHandler<GetPostDetailQuery> {
  constructor(
    @Inject(POST_READ_REPOSITORY)
    private readonly postReadRepository: IPostReadRepository,
  ) {}

  async execute(query: GetPostDetailQuery): Promise<PostDetailResDto> {
    const postId = query.postId;
    const postDetailDto: PostDetailDto | null = await this.postReadRepository.getPostDetailById(postId);
    if (!postDetailDto) {
      throw new PostNotFoundException();
    }
    return new PostDetailResDto(postDetailDto);
  }
}
