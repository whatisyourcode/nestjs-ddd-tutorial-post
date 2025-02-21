import CreatePostEntity from "../entities/create.post.entity";
import PostDetailEntity from "../entities/post.detail.entity";
import PostPreviewEntity from "../entities/post.preview.entity";

export const POST_SERVICE = Symbol("post serivce");

export default interface PostService {
  getPostDetail(id: number): Promise<PostDetailEntity>
  getPostPreview (): Promise<PostPreviewEntity[]>
  createPost(entity: CreatePostEntity): Promise<PostDetailEntity>
  updatePost(entity: PostDetailEntity): Promise<PostDetailEntity>
  removePost(id: number): Promise<void>
}
