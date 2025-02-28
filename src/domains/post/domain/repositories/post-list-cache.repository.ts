import CacheRepository from "@/shared/repositories/cache.repository";

import PostPreviewCacheEntity from "@/domains/post/infrastructure/entities/post-preview-cache.entity";

export const POST_PREVIEW_LIST_CACHE_REPOSITORY = Symbol("post preview list cache repository");

export default interface PostListCacheRepository extends CacheRepository<PostPreviewCacheEntity[]> {}
