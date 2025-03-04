import UpdateCommentReqDto from "../dtos/comment-req.dto/update-comment-req.dto";
import CommentResDto from "../dtos/comment-res.dto/comment-res.dto";

export const UPDATE_COMMENT_USECASE = Symbol("UPDATE_COMMENT_USECASE");

export default interface UpdateCommentUsecase {
  execute(commentId: number, updateCommentReqDto: UpdateCommentReqDto): Promise<CommentResDto>;
}
