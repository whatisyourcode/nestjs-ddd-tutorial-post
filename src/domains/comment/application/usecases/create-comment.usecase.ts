import CreateCommentReqDto from "../dtos/comment-req.dto/create-comment-req.dto";
import CommentResDto from "../dtos/comment-res.dto/comment-res.dto";

export const CREATE_COMMENT_USECASE = Symbol("create comment usecase");

export default interface CreateCommentUsecase {
  execute(reqDto: CreateCommentReqDto): Promise<CommentResDto>;
}
