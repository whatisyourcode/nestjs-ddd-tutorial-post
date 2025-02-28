import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export default class PostUpdateFormDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
