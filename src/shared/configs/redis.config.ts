import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import KeyvRedis, { Keyv } from "@keyv/redis";

export const REDIS_INSTANCE = Symbol("redis instance");

@Injectable()
export default class RedisConfig {
  constructor(private readonly configService: ConfigService) {}

  createRedisInstance(): Keyv {
    return new Keyv({
      store: new KeyvRedis(this.configService.get<string>("REDIS_URI", "redis://localhost:6379"), {
        namespace: this.configService.get<string>("REDIS_NAMESPACE", "cache"),
      }),
    });
  }
}
