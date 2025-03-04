import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

import CommentDeleteCommand from "../comment-delete.command";
import CommentWriteRepository, {
  COMMENT_WRITE_REPOSITORY,
} from "@/domains/comment/domain/repositories/comment-write.repository";

@CommandHandler(CommentDeleteCommand)
export default class CommentDeleteHandler implements ICommandHandler<CommentDeleteCommand> {
  constructor(@Inject(COMMENT_WRITE_REPOSITORY) private readonly commentWriteRepository: CommentWriteRepository) {}

  @Transactional()
  async execute(command: CommentDeleteCommand): Promise<void> {
    const { commentId } = command;
    await this.commentWriteRepository.remove(commentId);
  }
}
