import { Test, TestingModule } from "@nestjs/testing";

import CreatePostCommand from "@/domains/post/application/commands/create-post.command";
import PostDtoToDomainMapper from "@/domains/post/application/mappers/post-dto-to-domain.mapper";
import CreatePostHandlerForTest from "./create-post.ft.handler";
import TitleLengthExceededException from "@/domains/post/domain/exceptions/title-length-exceeded.exception";

describe("CreatePostHandlerForTest", () => {
  let handler: CreatePostHandlerForTest;

  beforeEach(async () => {
    const mockPostService = {
      refreshPaginatedRecentPostsCache: jest.fn(), // 필요한 메서드 모킹
    };

    const mockPostWriteRepository = {
      create: jest.fn(), // 필요한 메서드 모킹
    };

    const mockPostDtoToDomainMapper = {
      createDtoToCreateDomain: jest.fn(), // 필요한 메서드 모킹
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostHandlerForTest,
        { provide: "POST_SERVICE", useValue: mockPostService },
        { provide: "POST_WRITE_REPOSITORY", useValue: mockPostWriteRepository },
        { provide: PostDtoToDomainMapper, useValue: mockPostDtoToDomainMapper },
      ],
    }).compile();

    handler = module.get<CreatePostHandlerForTest>(CreatePostHandlerForTest);
  });

  it("execute()가 정상적으로 실행되는지만 확인", async () => {
    const mockDto = { authorId: 1, post: { title: "Test Title", content: "Test Content" } };
    const command = new CreatePostCommand(mockDto, 100);

    await expect(handler.execute(command)).resolves.not.toThrow();
  });
});
