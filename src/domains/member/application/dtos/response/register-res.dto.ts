import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import MemberDto from "@/domains/member/application/dtos/member.dto";

export default class RegisterResDto {
  @ApiProperty({
    description: "The member data returned in response after successful registration.",
    type: MemberDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MemberDto)
  readonly member: MemberDto;

  constructor(member: MemberDto) {
    this.member = member;
  }
}
