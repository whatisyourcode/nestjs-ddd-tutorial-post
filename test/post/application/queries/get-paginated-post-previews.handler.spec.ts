import { Test, TestingModule } from "@nestjs/testing";

import GetPaginatedPostPreviewsHandler from "@/domains/post/application/queries/handlers/get-paginated-post-previews.handler";
import IPostService, { POST_SERVICE } from "@/domains/post/application/services/post-service.interface";
import IPaginatedPostPreviewsCacheRepository, {
  PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";
import IPostReadRepository, {
  POST_READ_REPOSITORY,
} from "@/domains/post/domain/repositories/post-read-repository.interface";
import { RECENT_PAGE_LENGTH } from "@/domains/post/domain/constants/post.constant";
import GetPaginatedPostPreviewsQuery from "@/domains/post/application/queries/get-paginated-post-previews.query";
import PaginatedPostPreviewsResDto from "@/domains/post/application/dtos/response/paginated-post-previews-res.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

describe("GetPaginatedPostPreviewsHandler", () => {
  let handler: GetPaginatedPostPreviewsHandler;
  let postService: IPostService;
  let postReadRepository: IPostReadRepository;
  let paginatedPostPreviewsCacheRepository: IPaginatedPostPreviewsCacheRepository;

  beforeEach(async () => {
    const mockPostService = {
      refreshPaginatedRecentPostsCache: jest.fn(),
    };

    const mockPostReadRepository = {
      getPaginatedPostPreviews: jest.fn(),
    };

    const mockPaginatedPostPreviewsCacheRepository = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPaginatedPostPreviewsHandler,
        { provide: POST_SERVICE, useValue: mockPostService },
        { provide: POST_READ_REPOSITORY, useValue: mockPostReadRepository },
        { provide: PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY, useValue: mockPaginatedPostPreviewsCacheRepository },
      ],
    }).compile();

    handler = module.get<GetPaginatedPostPreviewsHandler>(GetPaginatedPostPreviewsHandler);
    postService = module.get<IPostService>(POST_SERVICE);
    postReadRepository = module.get<IPostReadRepository>(POST_READ_REPOSITORY);
    paginatedPostPreviewsCacheRepository = module.get<IPaginatedPostPreviewsCacheRepository>(
      PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY,
    );
  });

  const mockPostPreviewDtos: PostPreviewDto[] = [
    {
      id: 1,
      title: "Test Title 1",
      author: { ulid: "1", name: "Author 1" },
      createdAt: new Date("2023-01-01"),
    },
    {
      id: 2,
      title: "Test Title 2",
      author: { ulid: "2", name: "Author 2" },
      createdAt: new Date("2023-01-02"),
    },
  ];

  it("페이지가 RECENT_PAGE_LENGTH보다 크면 DB에서 데이터를 가져와야 함", async () => {
    // Given
    const page = RECENT_PAGE_LENGTH + 1;
    const mockQuery = new GetPaginatedPostPreviewsQuery(page);

    postReadRepository.getPaginatedPostPreviews = jest.fn().mockResolvedValue(mockPostPreviewDtos);

    const result = await handler.execute(mockQuery);

    expect(postReadRepository.getPaginatedPostPreviews).toHaveBeenCalledWith(page);
    expect(result).toEqual(new PaginatedPostPreviewsResDto(mockPostPreviewDtos));
  });

  it("페이지가 RECENT_PAGE_LENGTH보다 작으면 캐시에서 데이터를 가져와야 함", async () => {
    const page = RECENT_PAGE_LENGTH - 1;
    const mockQuery = new GetPaginatedPostPreviewsQuery(page);

    paginatedPostPreviewsCacheRepository.get = jest.fn().mockResolvedValue(mockPostPreviewDtos);

    const result = await handler.execute(mockQuery);

    expect(paginatedPostPreviewsCacheRepository.get).toHaveBeenCalledWith(page);
    expect(postService.refreshPaginatedRecentPostsCache).not.toHaveBeenCalled();
    expect(result).toEqual(new PaginatedPostPreviewsResDto(mockPostPreviewDtos));
  });

  it("캐시 데이터가 없으면 캐시를 갱신하고 다시 캐시에서 데이터를 가져와야 함", async () => {
    const page = RECENT_PAGE_LENGTH - 1;
    const mockQuery = new GetPaginatedPostPreviewsQuery(page);

    paginatedPostPreviewsCacheRepository.get = jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockPostPreviewDtos);

    postService.refreshPaginatedRecentPostsCache = jest.fn().mockResolvedValue(undefined);

    const result = await handler.execute(mockQuery);

    expect(paginatedPostPreviewsCacheRepository.get).toHaveBeenCalledWith(page);
    expect(postService.refreshPaginatedRecentPostsCache).toHaveBeenCalled();
    expect(result).toEqual(new PaginatedPostPreviewsResDto(mockPostPreviewDtos));
  });
});
