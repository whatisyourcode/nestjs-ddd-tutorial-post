import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import CreatePostCommand from "@/domains/post/application/commands/create-post.command";
import IPostService, { POST_SERVICE } from "@/domains/post/application/services/post-service.interface";
import PostDtoToDomainMapper from "@/domains/post/application/mappers/post-dto-to-domain.mapper";
import IPostWriteRepository, {
  POST_WRITE_REPOSITORY,
} from "@/domains/post/domain/repositories/post-write-repository.interface";
import CreatePostEntity from "@/domains/post/domain/entities/create-post.entity";

@CommandHandler(CreatePostCommand)
export default class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_SERVICE)
    private readonly postService: IPostService,
    @Inject(POST_WRITE_REPOSITORY)
    private readonly postWriteRepository: IPostWriteRepository,
    private readonly postDtoToDomainMapper: PostDtoToDomainMapper,
  ) {}

  @Transactional()
  async execute(command: CreatePostCommand): Promise<void> {
    const { authorId, createPostReqDto } = command;
    const { post } = createPostReqDto;

    const entity: CreatePostEntity = this.postDtoToDomainMapper.createDtoToCreateDomain(post, authorId);
    await this.postWriteRepository.create(entity);

    await this.postService.refreshPaginatedRecentPostsCache();
  }
}
