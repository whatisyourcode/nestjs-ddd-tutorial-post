import { Injectable } from "@nestjs/common"
import TitleVo from "../../domain/vos/title.vo";
import ContentVo from "../../domain/vos/content.vo";
import PostOrmEntity from "../entities/post/post-orm.entity";
import CreatePostEntity from "../../domain/entities/create.post.entity";
import PostPreviewEntity from "../../domain/entities/post.preview.entity";
import PostDetailEntity from "../../domain/entities/post.detail.entity";

@Injectable()
export default class PostOrmMapper {

  entityToOrmEntity(entity: PostDetailEntity): PostOrmEntity {
    const ormEntity: PostOrmEntity = new PostOrmEntity(); 
    ormEntity.id = entity.getId();
    ormEntity.title = entity.getTitleVo().getTitle();
    ormEntity.content = entity.getContentVo().getContent();
    ormEntity.createdAt = entity.getCreatedAt();
    ormEntity.updatedAt = entity.getUpdatedAt();
    ormEntity.deletedAt = entity.getDeletedAt();

    return ormEntity;
  }

  createEntityToOrmEntity(entity: CreatePostEntity): PostOrmEntity {
    const ormEntity:PostOrmEntity = new PostOrmEntity();
    ormEntity.title = entity.getTitleVo().getTitle();
    ormEntity.content = entity.getContentVo().getContent();

    return ormEntity;
  }

  toPreviewEntity(ormEntity: PostOrmEntity): PostPreviewEntity {
    return PostPreviewEntity.create({
        id: ormEntity.id,
        title: TitleVo.create({ title: ormEntity.title }),
        createdAt: ormEntity.createdAt
    });
  }
  
  toEntity(ormEntity: PostOrmEntity): PostDetailEntity {
    return PostDetailEntity.create({
        id: ormEntity.id,
        title: TitleVo.create({ title: ormEntity.title }),
        content: ContentVo.create({ content: ormEntity.content }),
        createdAt: ormEntity.createdAt,
        updatedAt: ormEntity.updatedAt,
        deletedAt: ormEntity.deletedAt 
    });
  }
}