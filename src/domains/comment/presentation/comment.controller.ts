import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post } from "@nestjs/common";

import CreateCommentUsecase, { CREATE_COMMENT_USECASE } from "../application/usecases/create-comment.usecase";
import CreateCommentReqDto from "../application/dtos/comment-req.dto/create-comment-req.dto";
import ReadCommentUsecase, { READ_COMMENT_USEACE } from "../application/usecases/read-comment.usecase";
import CommentResDto from "../application/dtos/comment-res.dto/comment-res.dto";
import CommentListResDto from "../application/dtos/comment-res.dto/comment-list-res.dto";
import UpdateCommentReqDto from "../application/dtos/comment-req.dto/update-comment-req.dto";
import UpdateCommentUsecase, { UPDATE_COMMENT_USECASE } from "../application/usecases/update-comment.usecase";
import DeleteCommentUsecase, { DELETE_COMMENT_USECASE } from "../application/usecases/delete-comment.usecase";

@Controller({ path: "comment", version: "1" })
export default class CommentController {
  constructor(
    @Inject(CREATE_COMMENT_USECASE) private readonly createCommentUsecase: CreateCommentUsecase,
    @Inject(READ_COMMENT_USEACE) private readonly readCommentUsecase: ReadCommentUsecase,
    @Inject(UPDATE_COMMENT_USECASE) private readonly updateCommentUsecase: UpdateCommentUsecase,
    @Inject(DELETE_COMMENT_USECASE) private readonly deleteCommentUsecase: DeleteCommentUsecase,
  ) {}

  @Get("read/:postId")
  async readComments(@Param("postId") postId: number): Promise<CommentListResDto> {
    return await this.readCommentUsecase.execute(postId);
  }

  @Post("create")
  @HttpCode(201)
  async createComment(@Body() createReqDto: CreateCommentReqDto): Promise<CommentResDto> {
    return await this.createCommentUsecase.execute(createReqDto);
  }

  @Patch("update/:commentId")
  @HttpCode(200)
  async updateComment(
    @Param("commentId") commentId: number,
    @Body() updateReqDto: UpdateCommentReqDto,
  ): Promise<CommentResDto> {
    return await this.updateCommentUsecase.execute(commentId, updateReqDto);
  }

  @Delete("delete/:commentId")
  @HttpCode(204)
  async deleteComment(@Param("commentId") commentId: number): Promise<void> {
    await this.deleteCommentUsecase.execute(commentId);
  }
}
