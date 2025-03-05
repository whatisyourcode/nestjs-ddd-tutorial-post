import { Injectable, Inject } from "@nestjs/common";

import IPostService from "@/domains/post/application/services/post-service.interface";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";
import IPaginatedPostPreviewsCacheRepository, {
  PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";

@Injectable()
export default class PostServiceImpl implements IPostService {
  constructor(
    @Inject(POST_READ_REPOSITORY)
    private readonly postReadRepository: IPostReadRepository,
    @Inject(PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY)
    private readonly paginatedPostPreviewsCacheRepository: IPaginatedPostPreviewsCacheRepository,
  ) {}

  async refreshPaginatedRecentPostsCache(): Promise<void> {
    const recentPostsMap: Map<number, PostPreviewDto[]> =
      await this.postReadRepository.getPaginatedRecentPostPreviews();

    await this.paginatedPostPreviewsCacheRepository.set(recentPostsMap);
  }
}
