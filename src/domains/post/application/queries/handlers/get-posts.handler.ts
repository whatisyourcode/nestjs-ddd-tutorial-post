import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import GetPostsQuery from "@/domains/post/application/queries/get-posts.query";
import PostService, { POST_SERVICE } from "@/domains/post/application/services/post.service";
import PostListResDto from "@/domains/post/application/dtos/response/post-list-res.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import { RECENT_PAGE_LENGTH } from "@/domains/post/domain/constants/post.constant";
import PostReadRepository, { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";
import PostPreviewCacheRepository, {
  POST_PREVIEW_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/post-preview-cache.repository";

@QueryHandler(GetPostsQuery)
export default class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @Inject(POST_SERVICE) private readonly postService: PostService,
    @Inject(POST_READ_REPOSITORY) private readonly postReadRepository: PostReadRepository,
    @Inject(POST_PREVIEW_CACHE_REPOSITORY) private readonly postPreviewCacheRepository: PostPreviewCacheRepository,
  ) {}

  async execute(query: GetPostsQuery): Promise<PostListResDto> {
    const { page } = query;
    if (page > RECENT_PAGE_LENGTH) {
      const postPreviewDtos: PostPreviewDto[] = await this.postReadRepository.getPosts(page);

      return new PostListResDto(postPreviewDtos);
    }

    const cachedPostPreviewDtos: PostPreviewDto[] | null = await this.postPreviewCacheRepository.get(page);
    if (cachedPostPreviewDtos) {
      return new PostListResDto(cachedPostPreviewDtos);
    }

    await this.postService.refreshRecentPostPreviews();
    const postPreviewDtos: PostPreviewDto[] = (await this.postPreviewCacheRepository.get(page)) || [];

    return new PostListResDto(postPreviewDtos);
  }
}
