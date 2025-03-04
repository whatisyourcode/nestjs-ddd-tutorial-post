import CommentEntity from "../../domain/entities/comment.entity";
import CommentDetailDto from "../dtos/comment-detail.dto";

export default class CommentDomainToDtoMapper {
  entityToDetailDto(entity: CommentEntity): CommentDetailDto {
    const dto: CommentDetailDto = new CommentDetailDto(
      entity.getId(),
      entity.getContentVo().getContent(),
      entity.getPostId(),
      entity.getCreatedAt(),
      entity.isDeleted(),
    );

    return dto;
  }
}
