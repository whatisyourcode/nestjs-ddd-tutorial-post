import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export const POST_READ_REPOSITORY = Symbol("post read repository");

export default interface PostReadRepository {
  getRecentPosts(pageSize?: number): Promise<Map<number, PostPreviewDto[]>>;
  getPosts(page: number, pageSize?: number): Promise<PostPreviewDto[]>;
  getPostById(postId: number): Promise<PostDto | null>;
  getPageCount(): Promise<number>;
}
