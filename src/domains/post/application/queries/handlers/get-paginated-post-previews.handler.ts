import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import GetPaginatedPostPreviewsQuery from "@/domains/post/application/queries/get-paginated-post-previews.query";
import IPostService, { POST_SERVICE } from "@/domains/post/application/services/post-service.interface";
import PaginatedPostPreviewsResDto from "@/domains/post/application/dtos/response/paginated-post-previews-res.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import { RECENT_PAGE_LENGTH } from "@/domains/post/domain/constants/post.constant";
import InvalidPageException from "@/domains/post/domain/exceptions/invalid-page.exception";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";
import IPaginatedPostPreviewsCacheRepository, {
  PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";

@QueryHandler(GetPaginatedPostPreviewsQuery)
export default class GetPaginatedPostPreviewsHandler implements IQueryHandler<GetPaginatedPostPreviewsQuery> {
  constructor(
    @Inject(POST_SERVICE)
    private readonly postService: IPostService,
    @Inject(POST_READ_REPOSITORY)
    private readonly postReadRepository: IPostReadRepository,
    @Inject(PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY)
    private readonly paginatedPostPreviewsCacheRepository: IPaginatedPostPreviewsCacheRepository,
  ) {}

  async execute(query: GetPaginatedPostPreviewsQuery): Promise<PaginatedPostPreviewsResDto> {
    const { page } = query;
    const pageCount: number = await this.postService.getPageCount();
    if (page < 0 || page > pageCount) {
      throw new InvalidPageException();
    }

    if (page > RECENT_PAGE_LENGTH) {
      const postPreviewDtos: PostPreviewDto[] = await this.postReadRepository.getPaginatedPostPreviews(page);

      return new PaginatedPostPreviewsResDto(pageCount, page, postPreviewDtos);
    }

    const cachedPostPreviewDtos: PostPreviewDto[] | null = await this.paginatedPostPreviewsCacheRepository.get(page);
    if (cachedPostPreviewDtos) {
      return new PaginatedPostPreviewsResDto(pageCount, page, cachedPostPreviewDtos);
    }

    await this.postService.refreshPaginatedRecentPostsCache();

    const postPreviewDtos: PostPreviewDto[] = (await this.paginatedPostPreviewsCacheRepository.get(page)) || [];

    return new PaginatedPostPreviewsResDto(pageCount, page, postPreviewDtos);
  }
}
