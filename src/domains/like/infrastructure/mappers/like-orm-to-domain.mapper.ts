import { Injectable } from "@nestjs/common";

import LikeEntity from "@/domains/like/domain/entities/like.entity";
import PostLikeOrmEntity from "@/domains/like/infrastructure/entities/post-like-orm.entity";

@Injectable()
export default class LikeOrmToDomainMapper {
  postOrmToDomain(ormEntity: PostLikeOrmEntity): LikeEntity {
    const { id, likerId, postId, createdAt, updatedAt, deletedAt } = ormEntity;
    const entity: LikeEntity = LikeEntity.create({
      id,
      likerId,
      targetId: postId,
      createdAt,
      updatedAt,
      deletedAt,
    });

    return entity;
  }
}
