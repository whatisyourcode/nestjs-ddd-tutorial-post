import CommentEntity from "../entities/comment.entity";
import CreateCommentEntity from "../entities/create-comment.entity";
import UpdateCommentEntity from "../entities/update-comment.entity";

export const COMMENT_SERVICE = Symbol("comment service");

export default interface CommentService {
  createComment(entity: CreateCommentEntity): Promise<CommentEntity>;
  readComments(postId: number): Promise<CommentEntity[]>;
  updateComment(entity: UpdateCommentEntity): Promise<CommentEntity>;
  deleteComment(commentId: number): Promise<void>;
}
