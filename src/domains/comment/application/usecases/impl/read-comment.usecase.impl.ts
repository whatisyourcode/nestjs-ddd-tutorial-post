import { Inject } from "@nestjs/common";

import ReadCommentUsecase from "../read-comment.usecase";
import CommentService, { COMMENT_SERVICE } from "@/domains/comment/domain/services/comment.service";
import CommentEntity from "@/domains/comment/domain/entities/comment.entity";
import { CommentDetailDto } from "../../dtos/comment-detail.dto";
import CommentListResDto from "../../dtos/comment-res.dto/comment-list-res.dto";
import CommentMapper from "../../mappers/comment.mapper";

export default class ReadCommentUsecaseImpl implements ReadCommentUsecase {
  constructor(
    @Inject(COMMENT_SERVICE) private readonly commentService: CommentService,
    @Inject() private readonly commentMapper: CommentMapper,
  ) {}

  async execute(postId: number): Promise<CommentListResDto> {
    const commentEntitiys: CommentEntity[] = await this.commentService.readComments(postId);
    const commentDtos: CommentDetailDto[] = commentEntitiys.map((commentEntity: CommentEntity) =>
      this.commentMapper.commentEntityToDetailDto(commentEntity),
    );
    const resDto: CommentListResDto = new CommentListResDto(commentDtos);

    return resDto;
  }
}
