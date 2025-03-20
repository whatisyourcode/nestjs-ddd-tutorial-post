import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import CreateCommentReqDto from "../../application/dtos/comment-req.dto/create-comment-req.dto";
import CommentResDto from "../../application/dtos/comment-res.dto/comment-res.dto";
import CommentListResDto from "../../application/dtos/comment-res.dto/comment-list-res.dto";
import UpdateCommentReqDto from "../../application/dtos/comment-req.dto/update-comment-req.dto";
import CommentGetQuery from "../../application/queries/comment-get.query";
import CommentDeleteCommand from "../../application/commands/comment-delete.command";
import CommentUpdateCommand from "../../application/commands/comment-update.command";
import CommentCreateCommand from "../../application/commands/comment-create.command";

@Controller({ path: "comment", version: "1" })
export default class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("read/:postId")
  async readComments(@Param("postId") postId: number): Promise<CommentListResDto> {
    return await this.queryBus.execute(new CommentGetQuery(postId));
  }

  @Post("create")
  @HttpCode(201)
  async createComment(@Body() createReqDto: CreateCommentReqDto): Promise<CommentResDto> {
    return await this.commandBus.execute(new CommentCreateCommand(createReqDto));
  }

  @Patch("update/:commentId")
  @HttpCode(200)
  async updateComment(
    @Param("commentId") commentId: number,
    @Body() updateReqDto: UpdateCommentReqDto,
  ): Promise<CommentResDto> {
    return await this.commandBus.execute(new CommentUpdateCommand(commentId, updateReqDto));
  }

  @Delete("delete/:commentId")
  @HttpCode(204)
  async deleteComment(@Param("commentId") commentId: number): Promise<void> {
    await this.commandBus.execute(new CommentDeleteCommand(commentId));
  }
}
