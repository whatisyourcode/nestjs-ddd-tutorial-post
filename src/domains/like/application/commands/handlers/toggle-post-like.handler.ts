import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import TogglePostLikeCommand from "@/domains/like/application/commands/toggle-post-like.command";
import ILikeWriteRepository from "@/domains/like/domain/repositories/like-write-repository.interface";
import LikeEntity from "@/domains/like/domain/entities/like.entity";
import { POST_LIKE_WRITE_REPOSITORY } from "@/domains/like/infrastructure/repositories/post-like-write.repository";

@CommandHandler(TogglePostLikeCommand)
export default class TogglePostLikeHandler implements ICommandHandler<TogglePostLikeCommand> {
  constructor(
    @Inject(POST_LIKE_WRITE_REPOSITORY)
    private readonly likeWriteRepository: ILikeWriteRepository,
  ) {}

  @Transactional()
  async execute(command: TogglePostLikeCommand): Promise<void> {
    const { postId, memberId } = command;
    const existingEntity: LikeEntity | null = await this.likeWriteRepository.findOne(postId, memberId);
    if (existingEntity) {
      await this.likeWriteRepository.remove(existingEntity);

      return;
    }

    await this.likeWriteRepository.create(postId, memberId);
  }
}
