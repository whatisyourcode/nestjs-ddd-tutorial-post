import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsDate } from "class-validator";

import {
  MAX_INTRODUCTION_LENGTH,
  MAX_NAME_LENGTH,
  TEL_LENGTH,
} from "@/domains/member/domain/constants/member.constant";

export default class MemberDto {
  @ApiProperty({
    description: "Unique identifier for the member, used for identification purposes.",
    example: "01JM6Y836X64JQRWCM9ARW9FNA",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly ulid: string;

  @ApiProperty({
    description: "The full name of the member.",
    example: "John Doe",
    maxLength: MAX_NAME_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The phone number of the member, must be in a valid format.",
    example: "01012345678",
    minLength: TEL_LENGTH,
    maxLength: TEL_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly tel: string;

  @ApiProperty({
    description: "A brief introduction about the member.",
    example: "Hello World!",
    maxLength: MAX_INTRODUCTION_LENGTH,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly introduction: string;

  @ApiProperty({
    description: "The date and time when the member was created. Stored as a timestamp.",
    example: "2025-02-16 17:33:24.196322",
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({
    description: "Indicates whether the member has been deleted. Set to `true` if deleted, `false` otherwise.",
    example: "false",
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly isDeleted: boolean;

  constructor(ulid: string, name: string, tel: string, introduction: string, createdAt: Date, isDeleted: boolean) {
    this.ulid = ulid;
    this.name = name;
    this.tel = tel;
    this.introduction = introduction;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}
