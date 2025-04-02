import { Injectable } from "@nestjs/common";

import LikeEntity from "@/domains/like/domain/entities/like.entity";
import PostLikeOrmEntity from "@/domains/like/infrastructure/entities/post-like-orm.entity";

@Injectable()
export default class LikeDomainToOrmMapper {
  domainToPostOrm(entity: LikeEntity): PostLikeOrmEntity {
    const ormEntity: PostLikeOrmEntity = new PostLikeOrmEntity();
    ormEntity.id = entity.getId();
    ormEntity.likerId = entity.getLikerId();
    ormEntity.postId = entity.getTargetId();
    ormEntity.createdAt = entity.getCreatedAt();
    ormEntity.updatedAt = entity.getUpdatedAt();
    ormEntity.deletedAt = entity.getDeletedAt();

    return ormEntity;
  }
}
