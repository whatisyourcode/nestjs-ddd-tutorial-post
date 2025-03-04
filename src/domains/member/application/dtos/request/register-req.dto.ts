import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreateMemberDto from "@/domains/member/application/dtos/create-member.dto";

export default class RegisterReqDto {
  @ApiProperty({
    description: "The member data requested for registration. This includes the member's personal information.",
    type: CreateMemberDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMemberDto)
  readonly member: CreateMemberDto;

  constructor(member: CreateMemberDto) {
    this.member = member;
  }
}
