import { Inject } from "@nestjs/common";

import UpdateCommentUsecase from "../update-comment.usecase";
import CommentService, { COMMENT_SERVICE } from "@/domains/comment/domain/services/comment.service";
import CommentMapper from "../../mappers/comment.mapper";
import UpdateCommentReqDto from "../../dtos/comment-req.dto/update-comment-req.dto";
import CommentResDto from "../../dtos/comment-res.dto/comment-res.dto";
import UpdateCommentEntity from "@/domains/comment/domain/entities/update-comment.entity";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import { CommentDetailDto } from "../../dtos/comment-detail.dto";

export default class UpdateCommentUsecaseImpl implements UpdateCommentUsecase {
  constructor(
    @Inject(COMMENT_SERVICE) private readonly commentService: CommentService,
    @Inject() private readonly commentMapper: CommentMapper,
  ) {}

  async execute(commentId: number, updateCommentReqDto: UpdateCommentReqDto): Promise<CommentResDto> {
    const { comment } = updateCommentReqDto;
    const commentUpdateEntity: UpdateCommentEntity = this.commentMapper.updateDtoToUpdateEntity(commentId, comment);
    const updatedComment: CommentEntity = await this.commentService.updateComment(commentUpdateEntity);
    const commentDetailDto: CommentDetailDto = this.commentMapper.commentEntityToDetailDto(updatedComment);
    const commentResDto: CommentResDto = new CommentResDto(commentDetailDto);

    return commentResDto;
  }
}
