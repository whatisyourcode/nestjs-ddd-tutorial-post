import CommentEntity from "../entities/comment.entity";
import CommentUpdateEntity from "../entities/comment-update.entity";
import CommentCreateEntity from "../entities/comment-create.entity";

export const COMMENT_WRITE_REPOSITORY = Symbol("comment write repository");

export default interface CommentWriteRepository {
  create(entity: CommentCreateEntity): Promise<CommentEntity>;
  update(entity: CommentUpdateEntity): Promise<CommentEntity>;
  remove(commentId: number): Promise<void>;
}
