import { Controller, Get, Post, Patch, Param, Query, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import TogglePostLikeCommand from "@/domains/like/application/commands/toggle-post-like.command";

@Controller({ path: "like", version: "1" })
export default class LikeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("post/:postId")
  @HttpCode(201)
  async togglePostLike(@Param("postId", ParseIntPipe) postId: number): Promise<void> {
    return await this.commandBus.execute(new TogglePostLikeCommand(postId, 1));
  }

  // @Get("list")
  // @HttpCode(200)
  // async getPaginatedPostPreviews(@Query("page", ParseIntPipe) page: number): Promise<PaginatedPostPreviewsResDto> {
  //   return await this.queryBus.execute(new GetPaginatedPostPreviewsQuery(page));
  // }
}
