import PostEntity from "@/domains/post/domain/entities/post.entity";
import CreatePostEntity from "@/domains/post/domain/entities/create-post.entity";

export const POST_WRITE_REPOSITORY = Symbol("post write repository interface");

export default interface IPostWriteRepository {
  create(entity: CreatePostEntity): Promise<PostEntity>;
  save(entity: PostEntity): Promise<PostEntity>;
  softRemove(entity: PostEntity): Promise<void>;
  remove(entity: PostEntity): Promise<void>;
}
