import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import MemberCreateDto from "@/domains/member/application/dtos/member-create.dto";

export default class RegisterReqDto {
  @ApiProperty({
    description: "The member data requested for registration. This includes the member's personal information.",
    type: MemberCreateDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MemberCreateDto)
  readonly member: MemberCreateDto;

  constructor(member: MemberCreateDto) {
    this.member = member;
  }
}
