import PostDetailDto from "@/domains/post/application/dtos/post-detail.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export const POST_READ_REPOSITORY = Symbol("post read repository interface");

export default interface IPostReadRepository {
  getPaginatedRecentPostPreviews(pageSize?: number): Promise<Map<number, PostPreviewDto[]>>;
  getPaginatedPostPreviews(page: number, pageSize?: number): Promise<PostPreviewDto[]>;
  getPostDetailById(postId: number): Promise<PostDetailDto | null>;
  getPageCount(): Promise<number>;
}
