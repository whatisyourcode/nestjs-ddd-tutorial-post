import { Inject } from "@nestjs/common";

import CreateCommentUsecase from "../create-comment.usecase";
import CommentResDto from "../../dtos/comment-res.dto/comment-res.dto";
import CommentService, { COMMENT_SERVICE } from "@/domains/comment/domain/services/comment.service";
import CommentMapper from "../../mappers/comment.mapper";
import CreateCommentReqDto from "../../dtos/comment-req.dto/create-comment-req.dto";
import CreateCommentEntity from "@/domains/comment/domain/entities/create-comment.entity";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import { CommentDetailDto } from "../../dtos/comment-detail.dto";

export default class CreateCommentUsecaseImpl implements CreateCommentUsecase {
  constructor(
    @Inject(COMMENT_SERVICE) private readonly commentService: CommentService,
    private readonly commentMapper: CommentMapper,
  ) {}

  async execute(reqDto: CreateCommentReqDto): Promise<CommentResDto> {
    const { comment, postId } = reqDto;
    const createCommentEntity: CreateCommentEntity = this.commentMapper.createDtoToCreateEntity(comment, postId);
    const commentEntity: CommentEntity = await this.commentService.createComment(createCommentEntity);
    const commentDto: CommentDetailDto = this.commentMapper.commentEntityToDetailDto(commentEntity);
    const resDto: CommentResDto = new CommentResDto(commentDto);

    return resDto;
  }
}
