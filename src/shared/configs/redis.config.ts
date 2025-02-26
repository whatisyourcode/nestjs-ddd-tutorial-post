import { createKeyv } from "@keyv/redis";
import { Keyv } from "keyv";
import { CacheableMemory } from "cacheable";

const redisConfig = async () => {
  return {
    stores: [
      new Keyv({
        store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
      }),
      createKeyv("redis://localhost:6379"),
    ],
  };
};

export default redisConfig;
