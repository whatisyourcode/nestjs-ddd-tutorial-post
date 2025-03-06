import { Module } from "@nestjs/common";

import RedisConfig, { REDIS_INSTANCE } from "@/shared/configs/redis.config";

@Module({
  providers: [
    RedisConfig,
    {
      provide: REDIS_INSTANCE,
      inject: [RedisConfig],
      useFactory: (config: RedisConfig) => config.createRedisInstance(),
    },
  ],
  exports: [REDIS_INSTANCE],
})
export default class RedisModule {}
