import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export const POST_PREVIEW_CACHE_REPOSITORY = Symbol("post preview cache repository");

export default interface PostPreviewCacheRepository {
  set(postMap: Map<number, PostPreviewDto[]>): Promise<void>;
  get(page: number): Promise<PostPreviewDto[] | null>;
  key(page: number): string;
}
