import CommentEntity from "../../domain/entities/comment.entity";
import ContentVo from "../../domain/vos/content.vo";
import CommentOrmEntity from "../entities/comment-orm.entity";

export default class CommentOrmToDomainMapper {
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
}
