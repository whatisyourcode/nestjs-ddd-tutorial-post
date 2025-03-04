import CommentEntity from "../../domain/entities/comment.entity";
import CreateCommentEntity from "../../domain/entities/create-comment.entity";
import UpdateCommentEntity from "../../domain/entities/update-comment.entity";
import ContentVo from "../../domain/vos/content.vo";
import CommentOrmEntity from "../entities/comment-orm.entity";

export default class CommentOrmMapper {
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

  ormEntityToEntity(ormEntity: CommentOrmEntity): CommentEntity {
    return CommentEntity.create({
      id: ormEntity.id,
      content: ContentVo.create({ content: ormEntity.content }),
      postId: ormEntity.postId,
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      deletedAt: ormEntity.deletedAt,
    });
  }

  createEntityToOrmEntity(entity: CreateCommentEntity): CommentOrmEntity {
    const ormEntity: CommentOrmEntity = new CommentOrmEntity();
    ormEntity.content = entity.getContentVo().getContent();
    ormEntity.postId = entity.getPostId();

    return ormEntity;
  }
}
