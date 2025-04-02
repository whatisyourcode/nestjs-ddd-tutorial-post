export const POST_SERVICE = Symbol("post service interface");

export default interface IPostService {
  getPageCount(): Promise<number>;
  refreshPaginatedRecentPostsCache(): Promise<void>;
  refreshPageCount(): Promise<void>;
}
