export const POST_SERVICE = Symbol("post service");

export default interface PostService {
  refreshRecentPostPreviews(): Promise<void>;
}
