import { Inject, Injectable } from "@nestjs/common";
import PostRepository, { POST_REPOSITORY } from "../../repositories/post.repository";
import PostService from "../post.service";
import PostEntity from "../../entities/post.detail.entity";
import PostDetailEntity from "../../entities/post.detail.entity";
import CreatePostEntity from "../../entities/create.post.entity";
import PostPreviewEntity from "../../entities/post.preview.entity";
import PostPreviewListCacheRepository, {
  POST_PREVIEW_LIST_CACHE_REPOSITORY,
} from "../../repositories/post-preview-list-cache.repository";

@Injectable()
export default class PostServiceImpl implements PostService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: PostRepository,
    @Inject(POST_PREVIEW_LIST_CACHE_REPOSITORY)
    private readonly postPreviewListCacheRepository: PostPreviewListCacheRepository,
  ) {}

  async getPostPreview(): Promise<PostPreviewEntity[]> {
    const cachedPostPreviews: PostPreviewEntity[] | null = await this.postPreviewListCacheRepository.get();
    if (cachedPostPreviews) {
      console.log("캐싱데이터터");
      return cachedPostPreviews;
    }
    const result: PostPreviewEntity[] = await this.postRepository.findAll();
    console.log("DB데이터터");
    await this.postPreviewListCacheRepository.set(result);

    return result;
  }

  async getPostDetail(id: number): Promise<PostDetailEntity> {
    const result: PostDetailEntity = await this.postRepository.findById(id);

    return result;
  }

  async createPost(entity: CreatePostEntity): Promise<PostDetailEntity> {
    const result: PostEntity = await this.postRepository.create(entity);

    return result;
  }

  async updatePost(entity: PostDetailEntity): Promise<PostDetailEntity> {
    const result: PostEntity = await this.postRepository.save(entity);

    return result;
  }

  async removePost(id: number): Promise<void> {
    const entity: PostEntity = await this.postRepository.findById(id);

    await this.postRepository.remove(entity);
  }
}
