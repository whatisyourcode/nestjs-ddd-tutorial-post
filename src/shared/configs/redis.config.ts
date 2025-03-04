import KeyvRedis, { Keyv } from "@keyv/redis";

export const REDIS_INSTANCE = Symbol("redis instance");

const redisConfig = () => {
  return new Keyv({ store: new KeyvRedis("redis://localhost:6379", { namespace: "cache" }) });
};

export default redisConfig;
