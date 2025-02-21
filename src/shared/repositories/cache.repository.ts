export default interface CacheRepository<T> {
  set(value: T, identifier?: string): Promise<void>;
  get(identifier?: string): Promise<T | null>;
  key(identifier?: string): string;
}

/**
 * set: 캐시 메모리에 identifier값에 대한 value 삽입
 * @example
 * await this.cacheRepository.set("1", "Hello World")
 * @result
 * key: "1" / value: "Hello World"
 * 
 * 
 * 
 * 
 * key: identifier값을 기반으로 도메인에 맞춰 생성된 key값
 * @example
 * key(identifier: string): string {
      return `post-${identifier}`
    }
 * const key: string = this.cacheService.key("1")
 * console.log(key)
 * @result
 * post-1
 */
