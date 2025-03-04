import { Controller, Get, Post, Param, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import GetPostsQuery from "@/domains/post/application/queries/get-posts.query";
import GetPostQuery from "@/domains/post/application/queries/get-post.query";
import PostListResDto from "@/domains/post/application/dtos/response/post-list-res.dto";
import PostResDto from "@/domains/post/application/dtos/response/post-res.dto";

@Controller({ path: "post", version: "1" })
export default class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("list")
  @HttpCode(200)
  async getPosts(): Promise<PostListResDto> {
    return await this.queryBus.execute(new GetPostsQuery());
  }

  @Get("detail/:postId")
  @HttpCode(200)
  async getPostDetail(@Param("postId", ParseIntPipe) postId: number): Promise<PostResDto> {
    return await this.queryBus.execute(new GetPostQuery(postId));
  }
}
