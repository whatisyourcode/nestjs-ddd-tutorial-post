export const PAGE_COUNT_CACHE_REPOSITORY = Symbol("page count cache repository");

export default interface IPageCountCacheRepository {
  set(value: number): Promise<void>;
  get(): Promise<number | null>;
  key(): string;
}
