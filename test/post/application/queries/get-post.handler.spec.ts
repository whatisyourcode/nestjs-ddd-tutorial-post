import { Test, TestingModule } from "@nestjs/testing";
import GetPostDetailHandlerForTest from "./get-post-detail.ft.handler";
import { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read-repository.interface";

describe("GetPostHandlerForTest", () => {
  let handler: GetPostDetailHandlerForTest;

  beforeEach(async () => {
    const mockPostReadRepository = {
      getPostDetailById: jest.fn().mockResolvedValue({ id: 1, title: "Test Title", content: "Test Content" }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPostDetailHandlerForTest, { provide: POST_READ_REPOSITORY, useValue: mockPostReadRepository }],
    }).compile();

    handler = module.get<GetPostDetailHandlerForTest>(GetPostDetailHandlerForTest);
  });

  it("execute()가 정상적으로 실행되는지만 확인", async () => {
    const mockQuery = { postId: 1 };
    await expect(handler.execute(mockQuery)).resolves.not.toThrow();
  });
});
