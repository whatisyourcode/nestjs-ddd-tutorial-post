import { Injectable, Inject } from "@nestjs/common";

import PostService from "@/domains/post/application/services/post.service";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostReadRepository, { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";
import PostPreviewCacheRepository, {
  POST_PREVIEW_CACHE_REPOSITORY,
} from "@/domains/post/domain/repositories/post-preview-cache.repository";

@Injectable()
export default class PostServiceImpl implements PostService {
  constructor(
    @Inject(POST_READ_REPOSITORY) private readonly postReadRepository: PostReadRepository,
    @Inject(POST_PREVIEW_CACHE_REPOSITORY) private readonly postPreviewCacheRepository: PostPreviewCacheRepository,
  ) {}

  async refreshRecentPostPreviews(): Promise<void> {
    const recentPostMap: Map<number, PostPreviewDto[]> = await this.postReadRepository.getRecentPosts();

    await this.postPreviewCacheRepository.set(recentPostMap);
  }
}
