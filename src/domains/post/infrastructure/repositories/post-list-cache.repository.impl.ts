import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostListCacheRepository from "@/domains/post/domain/repositories/post-list-cache.repository";
import PostCacheToDtoMapper from "@/domains/post/infrastructure/mappers/post-cache-to-dto.mapper";
import PostDtoToCacheMapper from "@/domains/post/infrastructure/mappers/post-dto-to-cache.mapper";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PostListCacheRepositoryImpl implements PostListCacheRepository {
  private ttl: number = 10000;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly postCacheToDtoMapper: PostCacheToDtoMapper,
    private readonly postDtoToCacheMapper: PostDtoToCacheMapper,
  ) {}

  async set(value: PostPreviewDto[]): Promise<void> {
    const key: string = this.key();
    const cacheEntity: PostPreviewCacheEntity[] = value.map((v) =>
      this.postDtoToCacheMapper.previewDtoToPreviewCache(v),
    );

    await this.cacheManager.set<PostPreviewCacheEntity[]>(key, cacheEntity, this.ttl);
  }

  async get(): Promise<PostPreviewDto[] | null> {
    const key: string = this.key();
    const values = await this.cacheManager.get<PostPreviewCacheEntity[] | null>(key);
    if (!values) {
      return null;
    }

    const result: PostPreviewDto[] = values.map((value) => this.postCacheToDtoMapper.previewCacheToPreviewDto(value));

    return result;
  }

  key(): string {
    return `postPreviews`;
  }
}
