import { Injectable } from "@nestjs/common";

import AuthorDto from "@/domains/post/application/dtos/author.dto";
import AuthorCacheEntity from "@/domains/post/infrastructure/entities/author-cache.entity";

@Injectable()
export default class AuthorCacheToDtoMapper {
  cacheToDto(cacheEntity: AuthorCacheEntity): AuthorDto {
    const { ulid, name } = cacheEntity;

    return new AuthorDto(ulid, name);
  }
}
