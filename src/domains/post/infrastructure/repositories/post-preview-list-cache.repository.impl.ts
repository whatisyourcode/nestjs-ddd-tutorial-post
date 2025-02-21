import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

import PostPreviewListCacheRepository from "../../domain/repositories/post-preview-list-cache.repository";
import PostPreviewEntity from "../../domain/entities/post.preview.entity";
import PostPreviewCacheEntity from "../entities/post/post-preview-cache.entity";
import PostPreviewListCacheMapper from "../mappers/post-preview-list-cache.mapper";

@Injectable()
export default class PostPreviewListCacheRepositoryImpl implements PostPreviewListCacheRepository {
  private ttl: number = 10000;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly postPreviewListCacheMapper: PostPreviewListCacheMapper,
  ) {}

  async set(value: PostPreviewEntity[]): Promise<void> {
    const key: string = this.key();
    const cacheEntity: PostPreviewCacheEntity[] = this.postPreviewListCacheMapper.entitiesToCacheEntities(value);

    await this.cacheManager.set<PostPreviewCacheEntity[]>(key, cacheEntity, this.ttl);
  }

  async get(): Promise<PostPreviewEntity[] | null> {
    const key: string = this.key();
    console.log(key);
    const values = await this.cacheManager.get<PostPreviewCacheEntity[] | null>(key);
    console.log(values);
    if (!values) {
      return null;
    }
    const result: PostPreviewEntity[] = this.postPreviewListCacheMapper.cacheEntitiesToEntities(values);

    return result;
  }

  key(): string {
    return `postPreviews`;
  }
}
