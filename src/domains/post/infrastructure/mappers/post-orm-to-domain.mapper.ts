import { Injectable } from "@nestjs/common";

import PostEntity from "@/domains/post/domain/entities/post.entity";
import TitleVo from "@/domains/post/domain/vos/title.vo";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";

@Injectable()
export default class PostOrmToDomainMapper {
  ormToDomain(ormEntity: PostOrmEntity): PostEntity {
    const { id, title, content, authorId, createdAt, updatedAt, deletedAt } = ormEntity;
    const entity: PostEntity = PostEntity.create({
      id,
      title: TitleVo.create({ title }),
      content,
      authorId,
      createdAt,
      updatedAt,
      deletedAt,
    });

    return entity;
  }
}
