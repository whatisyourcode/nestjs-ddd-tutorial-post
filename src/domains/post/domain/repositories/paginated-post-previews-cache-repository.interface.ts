import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export const PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY = Symbol("paginated post previews cache repository");

export default interface IPaginatedPostPreviewsCacheRepository {
  set(value: Map<number, PostPreviewDto[]>): Promise<void>;
  get(page: number): Promise<PostPreviewDto[] | null>;
  key(page: number): string;
}
