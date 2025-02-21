import CacheRepository from "@/shared/repositories/cache.repository";
import PostPreviewEntity from "../entities/post.preview.entity";

export const POST_PREVIEW_LIST_CACHE_REPOSITORY = Symbol("post preview list cache repository");

export default interface PostPreviewListCacheRepository extends CacheRepository<PostPreviewEntity[]> {}
