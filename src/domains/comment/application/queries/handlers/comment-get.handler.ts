import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import CommentGetQuery from "../comment-get.query";
import { Inject } from "@nestjs/common";
import CommentReadRepository, {
  COMMENT_READ_REPOSITORY,
} from "@/domains/comment/domain/repositories/comment-read.repository";
import { Transactional } from "typeorm-transactional";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import CommentDomainToDtoMapper from "../../mappers/comment-domain-to-dto.mapper";
import CommentDetailDto from "../../dtos/comment-detail.dto";
import CommentListResDto from "../../dtos/comment-res.dto/comment-list-res.dto";

@QueryHandler(CommentGetQuery)
export default class CommentGetHandler implements IQueryHandler<CommentGetQuery> {
  constructor(
    @Inject(COMMENT_READ_REPOSITORY) private readonly commentReadRepository: CommentReadRepository,
    private readonly commentDomainToDtoMapper: CommentDomainToDtoMapper,
  ) {}

  async execute(query: CommentGetQuery): Promise<CommentListResDto> {
    const { postId } = query;
    const commentEntities: CommentEntity[] = await this.commentReadRepository.findAll(postId);
    const commentDtos: CommentDetailDto[] = commentEntities.map((commentEntity: CommentEntity) =>
      this.commentDomainToDtoMapper.entityToDetailDto(commentEntity),
    );
    const commentListResDto: CommentListResDto = new CommentListResDto(commentDtos);

    return commentListResDto;
  }
}
