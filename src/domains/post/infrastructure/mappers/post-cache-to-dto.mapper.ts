import { Injectable } from "@nestjs/common";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import AuthorDto from "@/domains/post/application/dtos/author.dto";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PostCacheToDtoMapper {
  previewCacheToPreviewDto(cacheEntity: PostPreviewCacheEntity): PostPreviewDto {
    const { id, title, author, createdAt } = cacheEntity;
    const { ulid, name } = author;
    const dto: PostPreviewDto = new PostPreviewDto(id, title, new AuthorDto(ulid, name), createdAt);

    return dto;
  }
}
