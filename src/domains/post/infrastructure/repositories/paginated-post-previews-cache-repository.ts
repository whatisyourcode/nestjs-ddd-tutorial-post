import { Injectable, Inject } from "@nestjs/common";
import Keyv from "keyv";

import { REDIS_INSTANCE } from "@/shared/configs/redis.config";

import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import IPaginatedPostPreviewsCacheRepository from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";
import PostCacheToDtoMapper from "@/domains/post/infrastructure/mappers/post-cache-to-dto.mapper";
import PostDtoToCacheMapper from "@/domains/post/infrastructure/mappers/post-dto-to-cache.mapper";
import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

@Injectable()
export default class PaginatedPostsCacheRepository implements IPaginatedPostPreviewsCacheRepository {
  private readonly ttl: number = 600000;

  constructor(
    @Inject(REDIS_INSTANCE) private readonly cacheManager: Keyv,
    private readonly postCacheToDtoMapper: PostCacheToDtoMapper,
    private readonly postDtoToCacheMapper: PostDtoToCacheMapper,
  ) {}

  async set(value: Map<number, PostPreviewDto[]>): Promise<void> {
    await Promise.all(
      Array.from(value.entries()).map(async ([page, posts]) => {
        const key: string = this.key(page);
        const cachedEntity: PostPreviewCacheEntity[] = posts.map((post) =>
          this.postDtoToCacheMapper.previewDtoToPreviewCache(post),
        );

        return this.cacheManager.set<PostPreviewCacheEntity[]>(key, cachedEntity, this.ttl);
      }),
    );
  }

  async get(page: number): Promise<PostPreviewDto[] | null> {
    const key: string = this.key(page);
    const values: PostPreviewCacheEntity[] | undefined = await this.cacheManager.get<PostPreviewCacheEntity[]>(key);
    if (!values) {
      return null;
    }
    const result: PostPreviewDto[] = values.map((value) => this.postCacheToDtoMapper.previewCacheToPreviewDto(value));

    return result;
  }

  key(page: number): string {
    return `post_page_${page}`;
  }
}
