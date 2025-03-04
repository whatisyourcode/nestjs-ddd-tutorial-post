import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

import { COMMENT_WRITE_REPOSITORY } from "@/domains/comment/domain/repositories/comment-write.repository";
import CommentCreateEntity from "@/domains/comment/domain/entities/comment-create.entity";
import CommentWrtieRepositoryImpl from "@/domains/comment/infrastructure/repositories/comment-write.repository.impl";
import CommentDtoToDomainMapper from "../../mappers/comment-dto-to-domain.mapper";
import CommentDomainToDtoMapper from "../../mappers/comment-domain-to-dto.mapper";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import CommentResDto from "../../dtos/comment-res.dto/comment-res.dto";
import CommentDetailDto from "../../dtos/comment-detail.dto";
import CommentCreateCommand from "../comment-create.command";

@CommandHandler(CommentCreateCommand)
export default class CommentCreateHandler implements ICommandHandler<CommentCreateCommand> {
  constructor(
    @Inject(COMMENT_WRITE_REPOSITORY) private readonly commentWriteRepository: CommentWrtieRepositoryImpl,
    private readonly commentDtoToDomainMapper: CommentDtoToDomainMapper,
    private readonly commentDomainToDtoMapper: CommentDomainToDtoMapper,
  ) {}

  @Transactional()
  async execute(command: CommentCreateCommand): Promise<CommentResDto> {
    const { createCommentReqDto } = command;
    const { comment, postId } = createCommentReqDto;
    const entity: CommentCreateEntity = this.commentDtoToDomainMapper.createDtoToCreateDomain(comment, postId);
    const createdEnttiy: CommentEntity = await this.commentWriteRepository.create(entity);
    const commentDto: CommentDetailDto = this.commentDomainToDtoMapper.entityToDetailDto(createdEnttiy);
    const commentResDto: CommentResDto = new CommentResDto(commentDto);

    return commentResDto;
  }
}
