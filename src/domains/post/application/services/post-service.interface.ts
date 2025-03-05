export const POST_SERVICE = Symbol("post service interface");

export default interface IPostService {
  refreshPaginatedRecentPostsCache(): Promise<void>;
}
