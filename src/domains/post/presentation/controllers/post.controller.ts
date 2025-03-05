import { Controller, Get, Post, Patch, Param, Query, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import CreatePostCommand from "@/domains/post/application/commands/create-post.command";
import GetPaginatedPostPreviewsQuery from "@/domains/post/application/queries/get-paginated-post-previews.query";
import GetPostDetailQuery from "@/domains/post/application/queries/get-post-detail.query";
import CreatePostReqDto from "@/domains/post/application/dtos/request/create-post-req.dto";
import UpdatePostReqDto from "@/domains/post/application/dtos/request/update-post-req.dto";
import PaginatedPostPreviewsResDto from "@/domains/post/application/dtos/response/paginated-post-previews-res.dto";
import PostDetailResDto from "@/domains/post/application/dtos/response/post-detail-res.dto";

@Controller({ path: "post", version: "1" })
export default class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("create")
  @HttpCode(201)
  async createPosts(@Body() createPostReqDto: CreatePostReqDto): Promise<void> {
    return await this.commandBus.execute(new CreatePostCommand(createPostReqDto, 1));
  }

  @Get("list")
  @HttpCode(200)
  async getPaginatedPostPreviews(@Query("page", ParseIntPipe) page: number): Promise<PaginatedPostPreviewsResDto> {
    return await this.queryBus.execute(new GetPaginatedPostPreviewsQuery(page));
  }

  @Get("detail/:postId")
  @HttpCode(200)
  async getPostDetail(@Param("postId", ParseIntPipe) postId: number): Promise<PostDetailResDto> {
    return await this.queryBus.execute(new GetPostDetailQuery(postId));
  }

  @Patch("update")
  @HttpCode(200)
  async upatePosts(@Body() updatePostReqDto: UpdatePostReqDto): Promise<void> {
    // return await this.commandBus.execute(new GetPostsQuery());
  }
}
