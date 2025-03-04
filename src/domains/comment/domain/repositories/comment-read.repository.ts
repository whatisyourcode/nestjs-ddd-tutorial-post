import CommentEntity from "../entities/comment.entity";

export const COMMENT_READ_REPOSITORY = Symbol("comment read repository");

export default interface CommentReadRepository {
  findById(commentId: number): Promise<CommentEntity>;
  findAll(postId: number): Promise<CommentEntity[]>;
}
