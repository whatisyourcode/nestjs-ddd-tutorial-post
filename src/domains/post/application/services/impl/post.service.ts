import { Injectable, Inject } from "@nestjs/common";

import IPostService from "@/domains/post/application/services/post-service.interface";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";
import IPaginatedPostPreviewsCacheRepository, {
  PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";
import IPageCountCacheRepository, {
  PAGE_COUNT_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/page-count-cache-repository.interface";

@Injectable()
export default class PostService implements IPostService {
  constructor(
    @Inject(POST_READ_REPOSITORY)
    private readonly postReadRepository: IPostReadRepository,
    @Inject(PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY)
    private readonly paginatedPostPreviewsCacheRepository: IPaginatedPostPreviewsCacheRepository,
    @Inject(PAGE_COUNT_CACHE_REPOSITORY)
    private readonly pageCountCacheRepository: IPageCountCacheRepository,
  ) {}

  async getPageCount(): Promise<number> {
    const cachedPageCount: number | null = await this.pageCountCacheRepository.get();
    if (!cachedPageCount) {
      await this.refreshPageCount();

      const refreshedPageCount: number = await this.pageCountCacheRepository.get();

      return refreshedPageCount;
    }

    return cachedPageCount;
  }

  async refreshPaginatedRecentPostsCache(): Promise<void> {
    const recentPostsMap: Map<number, PostPreviewDto[]> =
      await this.postReadRepository.getPaginatedRecentPostPreviews();

    await this.paginatedPostPreviewsCacheRepository.set(recentPostsMap);
  }

  async refreshPageCount(): Promise<void> {
    const pageCount: number = await this.postReadRepository.getPageCount();

    await this.pageCountCacheRepository.set(pageCount);
  }
}
