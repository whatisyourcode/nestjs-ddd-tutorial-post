import CommentEntity from "../entities/comment.entity";
import CreateCommentEntity from "../entities/create-comment.entity";

export const COMMENT_REPOSITORY = Symbol("comment repository");

export default interface CommentRepository {
  findById(commentId: number): Promise<CommentEntity>;
  create(entity: CreateCommentEntity): Promise<CommentEntity>;
  findAll(postId: number): Promise<CommentEntity[]>;
  update(entity: CommentEntity): Promise<CommentEntity>;
  delete(commentId: number): Promise<void>;
}
