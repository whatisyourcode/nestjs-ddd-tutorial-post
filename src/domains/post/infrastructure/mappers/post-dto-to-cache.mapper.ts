import { Injectable } from "@nestjs/common";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import AuthorDtoToCacheMapper from "@/domains/post/infrastructure/mappers/author-dto-to-cache.mapper";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PostDtoToCacheMapper {
  constructor(private readonly authorDtoToCacheMapper: AuthorDtoToCacheMapper) {}

  previewDtoToPreviewCache(dto: PostPreviewDto): PostPreviewCacheEntity {
    const { id, title, author, createdAt } = dto;

    return {
      id,
      title,
      author: this.authorDtoToCacheMapper.dtoToCache(author),
      createdAt,
    };
  }
}
