import { Injectable, Inject } from "@nestjs/common";
import Keyv from "keyv";

import { REDIS_INSTANCE } from "@/shared/configs/redis.config";
import IPageCountCacheRepository from "@/domains/post/domain/repositories/page-count-cache-repository.interface";

@Injectable()
export default class PageCountCacheRepository implements IPageCountCacheRepository {
  constructor(@Inject(REDIS_INSTANCE) private readonly cacheManager: Keyv) {}

  async set(value: number): Promise<void> {
    const key: string = this.key();

    await this.cacheManager.set<number>(key, value);
  }

  async get(): Promise<number | null> {
    const key: string = this.key();
    const value: number | undefined = await this.cacheManager.get<number>(key);
    if (!value) {
      return null;
    }

    return value;
  }

  key(): string {
    return "page_count";
  }
}
