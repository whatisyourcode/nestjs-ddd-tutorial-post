import { Module } from "@nestjs/common";

import redisConfig, { REDIS_INSTANCE } from "@/shared/configs/redis.config";

@Module({
  providers: [
    {
      provide: REDIS_INSTANCE,
      useFactory: redisConfig,
    },
  ],
  exports: [REDIS_INSTANCE],
})
export default class RedisModule {}
