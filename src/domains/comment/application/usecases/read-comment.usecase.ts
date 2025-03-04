import CommentListResDto from "../dtos/comment-res.dto/comment-list-res.dto";

export const READ_COMMENT_USEACE = Symbol("read comment usecase");

export default interface ReadCommentUsecase {
  execute(postId: number): Promise<CommentListResDto>;
}
