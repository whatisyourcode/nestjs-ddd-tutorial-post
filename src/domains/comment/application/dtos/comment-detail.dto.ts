import { IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export default class CommentDetailDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsString()
  readonly isDeleted: boolean;

  constructor(id: number, content: string, postId: number, createdAt: Date, isDeleted: boolean) {
    this.id = id;
    this.content = content;
    this.postId = postId;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}
