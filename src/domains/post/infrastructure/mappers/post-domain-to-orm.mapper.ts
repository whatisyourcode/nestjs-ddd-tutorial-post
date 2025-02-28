import { Injectable } from "@nestjs/common";

import PostEntity from "@/domains/post/domain/entities/post.entity";
import PostCreateEntity from "@/domains/post/domain/entities/post-create.entity";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";

@Injectable()
export default class PostDomainToOrmMapper {
  domainToOrm(entity: PostEntity): PostOrmEntity {
    const ormEntity: PostOrmEntity = new PostOrmEntity();
    ormEntity.id = entity.getId();
    ormEntity.title = entity.getTitleVo().getTitle();
    ormEntity.content = entity.getContent();
    ormEntity.authorId = entity.getAuthorId();
    ormEntity.createdAt = entity.getCreatedAt();
    ormEntity.updatedAt = entity.getUpdatedAt();
    ormEntity.deletedAt = entity.getDeletedAt();

    return ormEntity;
  }

  createDomainToOrm(entity: PostCreateEntity): PostOrmEntity {
    const ormEntity: PostOrmEntity = new PostOrmEntity();
    ormEntity.title = entity.getTitleVo().getTitle();
    ormEntity.content = entity.getContent();
    ormEntity.authorId = entity.getAuthorId();

    return ormEntity;
  }
}
