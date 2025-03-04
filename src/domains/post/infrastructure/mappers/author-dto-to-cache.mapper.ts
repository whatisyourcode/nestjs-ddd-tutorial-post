import { Injectable } from "@nestjs/common";

import AuthorDto from "@/domains/post/application/dtos/author.dto";
import AuthorCacheEntity from "@/domains/post/infrastructure/entities/author-cache.entity";

@Injectable()
export default class AuthorDtoToCacheMapper {
  dtoToCache(dto: AuthorDto): AuthorCacheEntity {
    const { ulid, name } = dto;

    return { ulid, name };
  }
}
