import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import {
  MAX_INTRODUCTION_LENGTH,
  MAX_NAME_LENGTH,
  TEL_LENGTH,
} from "@/domains/member/domain/constants/member.constant";

export default class CreateMemberDto {
  @ApiProperty({
    description: "The full name of the member. Should not exceed the maximum length.",
    example: "John Doe",
    maxLength: MAX_NAME_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The phone number of the member. Should be in a valid format, e.g., '01012345678'.",
    example: "01012345678",
    minLength: TEL_LENGTH,
    maxLength: TEL_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly tel: string;

  @ApiProperty({
    description: "A short introduction for the member. This field allows the member to introduce themselves.",
    example: "Hello World!",
    maxLength: MAX_INTRODUCTION_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly introduction: string;

  constructor(name: string, tel: string, introduction: string) {
    this.name = name;
    this.tel = tel;
    this.introduction = introduction;
  }
}
