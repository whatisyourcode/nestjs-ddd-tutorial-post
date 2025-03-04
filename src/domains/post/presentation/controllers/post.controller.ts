import { Controller, Get, Post, Patch, Param, Query, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import CreatePostCommand from "@/domains/post/application/commands/create-post.command";
import GetPostsQuery from "@/domains/post/application/queries/get-posts.query";
import GetPostQuery from "@/domains/post/application/queries/get-post.query";
import CreatePostReqDto from "@/domains/post/application/dtos/request/create-post-req.dto";
import UpdatePostReqDto from "@/domains/post/application/dtos/request/update-post-req.dto";
import PostListResDto from "@/domains/post/application/dtos/response/post-list-res.dto";
import PostResDto from "@/domains/post/application/dtos/response/post-res.dto";

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
  async getPosts(@Query("page", ParseIntPipe) page: number): Promise<PostListResDto> {
    return await this.queryBus.execute(new GetPostsQuery(page));
  }

  @Get("detail/:postId")
  @HttpCode(200)
  async getPostDetail(@Param("postId", ParseIntPipe) postId: number): Promise<PostResDto> {
    return await this.queryBus.execute(new GetPostQuery(postId));
  }

  @Patch("update")
  @HttpCode(200)
  async upatePosts(@Body() updatePostReqDto: UpdatePostReqDto): Promise<void> {
    // return await this.commandBus.execute(new GetPostsQuery());
  }
}
