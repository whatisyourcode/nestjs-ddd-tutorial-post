import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  constructor(content: string) {
    this.content = content;
  }
}
