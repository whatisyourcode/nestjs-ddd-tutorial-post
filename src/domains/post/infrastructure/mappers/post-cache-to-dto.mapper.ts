import { Injectable } from "@nestjs/common";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import AuthorCacheToDtoMapper from "@/domains/post/infrastructure/mappers/author-cache-to-dto.mapper";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PostCacheToDtoMapper {
  constructor(private readonly authorCacheToDtoMapper: AuthorCacheToDtoMapper) {}

  previewCacheToPreviewDto(cacheEntity: PostPreviewCacheEntity): PostPreviewDto {
    const { id, title, author, createdAt } = cacheEntity;

    return new PostPreviewDto(id, title, this.authorCacheToDtoMapper.cacheToDto(author), createdAt);
  }
}
