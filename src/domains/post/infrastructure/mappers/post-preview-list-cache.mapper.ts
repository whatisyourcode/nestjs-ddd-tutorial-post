import { Injectable } from "@nestjs/common";
import TitleVo from "../../domain/vos/title.vo";
import ContentVo from "../../domain/vos/content.vo";
import PostOrmEntity from "../entities/post/post-orm.entity";
import CreatePostEntity from "../../domain/entities/create.post.entity";
import PostPreviewEntity from "../../domain/entities/post.preview.entity";
import PostDetailEntity from "../../domain/entities/post.detail.entity";
import PostPreviewCacheEntity from "../entities/post/post-preview-cache.entity";

@Injectable()
export default class PostPreviewListCacheMapper {
  entityToCacheEntity(entity: PostPreviewEntity): PostPreviewCacheEntity {
    const cacheEntity: PostPreviewCacheEntity = {
      id: entity.getId(),
      title: entity.getTitleVo().getTitle(),
      createdAt: entity.getCreatedAt(),
    };

    return cacheEntity;
  }

  entitiesToCacheEntities(entity: PostPreviewEntity[]): PostPreviewCacheEntity[] {
    const cacheEntities: PostPreviewCacheEntity[] = entity.map((entity) => this.entityToCacheEntity(entity));

    return cacheEntities;
  }

  cacheEntityToEntity(cachedEntity: PostPreviewCacheEntity): PostPreviewEntity {
    const entity: PostPreviewEntity = PostPreviewEntity.create({
      id: cachedEntity.id,
      title: TitleVo.create({ title: cachedEntity.title }),
      createdAt: cachedEntity.createdAt,
    });

    return entity;
  }

  cacheEntitiesToEntities(cachedEntity: PostPreviewCacheEntity[]): PostPreviewEntity[] {
    const entities: PostPreviewEntity[] = cachedEntity.map((cachedEntity) => this.cacheEntityToEntity(cachedEntity));

    return entities;
  }
}
