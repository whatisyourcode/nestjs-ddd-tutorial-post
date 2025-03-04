import { Injectable } from "@nestjs/common";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PostDtoToCacheMapper {
  previewDtoToPreviewCache(dto: PostPreviewDto): PostPreviewCacheEntity {
    const { id, title, author, createdAt } = dto;
    const { ulid, name } = author;
    const entity: PostPreviewCacheEntity = {
      id,
      title,
      author: { ulid, name },
      createdAt,
    };

    return entity;
  }
}
