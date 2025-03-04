import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

import CommentWriteRepository, {
  COMMENT_WRITE_REPOSITORY,
} from "@/domains/comment/domain/repositories/comment-write.repository";
import CommentDtoToDomainMapper from "../../mappers/comment-dto-to-domain.mapper";
import CommentDomainToDtoMapper from "../../mappers/comment-domain-to-dto.mapper";
import CommentResDto from "../../dtos/comment-res.dto/comment-res.dto";
import CommentUpdateEntity from "@/domains/comment/domain/entities/comment-update.entity";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import CommentDetailDto from "../../dtos/comment-detail.dto";
import CommentUpdateCommand from "../comment-update.command";

@CommandHandler(CommentUpdateCommand)
export default class CommentUpdateHanlder implements ICommandHandler<CommentUpdateCommand> {
  constructor(
    @Inject(COMMENT_WRITE_REPOSITORY) private readonly commentWriteRepository: CommentWriteRepository,
    private readonly commentDtoToDomainMapper: CommentDtoToDomainMapper,
    private readonly commentDomainToDtoMapper: CommentDomainToDtoMapper,
  ) {}

  @Transactional()
  async execute(command: CommentUpdateCommand): Promise<CommentResDto> {
    const { commentId, updateCommentReqDto } = command;
    const { comment } = updateCommentReqDto;
    const entity: CommentUpdateEntity = this.commentDtoToDomainMapper.updateDtoToUpdateEntity(commentId, comment);
    const updateEntity: CommentEntity = await this.commentWriteRepository.update(entity);
    const commentDto: CommentDetailDto = this.commentDomainToDtoMapper.entityToDetailDto(updateEntity);
    const commentResDto: CommentResDto = new CommentResDto(commentDto);

    return commentResDto;
  }
}
