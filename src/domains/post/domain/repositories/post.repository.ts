
import CreatePostEntity from "../entities/create.post.entity";
import PostEntity from "../entities/post.detail.entity"
import PostPreviewEntity from "../entities/post.preview.entity";

export const POST_REPOSITORY = Symbol("post repository")

export default interface PostRepository {
    findById(id: number): Promise<PostEntity | null>;
    findAll(): Promise<PostPreviewEntity[]>;
    create(entity: CreatePostEntity): Promise<PostEntity>;
    save(entity: PostEntity): Promise<PostEntity>;
    softRemove(entity: PostEntity): Promise<void>;
    remove(entity: PostEntity): Promise<void>;
}