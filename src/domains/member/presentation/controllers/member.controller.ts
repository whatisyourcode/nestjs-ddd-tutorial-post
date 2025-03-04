import { Controller, Get, Post, Param, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import RegisterCommand from "@/domains/member/application/commands/register.command";
import GetMemberQuery from "@/domains/member/application/queries/get-member.query";
import MemberResDto from "@/domains/member/application/dtos/response/member-res.dto";
import RegisterReqDto from "@/domains/member/application/dtos/request/register-req.dto";

@ApiTags("member")
@Controller({ path: "member", version: "1" })
export default class MemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: "Get a member",
    description: "Get member data.",
  })
  @ApiResponse({
    status: 200,
    description: "Member data returned.",
    type: MemberResDto,
  })
  @Get("/:memberId")
  @HttpCode(200)
  async getMember(@Param("memberId", ParseIntPipe) memberId: number): Promise<MemberResDto> {
    return await this.queryBus.execute(new GetMemberQuery(memberId));
  }

  @ApiOperation({
    summary: "Create a new member",
    description: "Registers a new member and returns the created member data.",
  })
  @ApiResponse({
    status: 201,
    description: "Member successfully created and returned.",
  })
  @Post("create")
  @HttpCode(201)
  async register(@Body() registerReqDto: RegisterReqDto): Promise<void> {
    return await this.commandBus.execute(new RegisterCommand(registerReqDto));
  }
}
