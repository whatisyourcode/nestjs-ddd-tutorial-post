import CommentEntity from "../../domain/entities/comment.entity";
import CreateCommentEntity from "../../domain/entities/comment-create.entity";
import ContentVo from "../../domain/vos/content.vo";
import CommentOrmEntity from "../entities/comment-orm.entity";
import CommentUpdateEntity from "../../domain/entities/comment-update.entity";

export default class CommentDomainToOrmMapper {
  entityToOrmEntity(entity: CommentEntity): CommentOrmEntity {
    const ormEntity: CommentOrmEntity = new CommentOrmEntity();
    ormEntity.id = entity.getId();
    ormEntity.content = entity.getContentVo().getContent();
    ormEntity.createdAt = entity.getCreatedAt();
    ormEntity.updatedAt = entity.getUpdatedAt();
    ormEntity.deletedAt = entity.getDeletedAt();
    ormEntity.postId = entity.getPostId();

    return ormEntity;
  }

  updateEntityToOrmEntity(entity: CommentUpdateEntity): CommentOrmEntity {
    const ormEntity: CommentOrmEntity = new CommentOrmEntity();
    ormEntity.id = entity.getCommentId();
    ormEntity.content = entity.getContentVo().getContent();

    return ormEntity;
  }

  createEntityToOrmEntity(entity: CreateCommentEntity): CommentOrmEntity {
    const ormEntity: CommentOrmEntity = new CommentOrmEntity();
    ormEntity.content = entity.getContentVo().getContent();
    ormEntity.postId = entity.getPostId();

    return ormEntity;
  }
}
