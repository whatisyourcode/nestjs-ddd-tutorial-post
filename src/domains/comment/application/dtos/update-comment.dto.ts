import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  constructor(content: string) {
    this.content = content;
  }
}
