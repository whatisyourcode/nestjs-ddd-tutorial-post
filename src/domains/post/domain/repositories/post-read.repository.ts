import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";

export const POST_READ_REPOSITORY = Symbol("post read repository");

export default interface PostReadRepository {
  getPostById(postId: number): Promise<PostDto | null>;
  getPosts(): Promise<PostPreviewDto[]>;
}
