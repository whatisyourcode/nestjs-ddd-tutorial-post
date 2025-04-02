import { IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export default class LikeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly targetId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly count: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isLike: boolean;

  constructor(targetId: number, count: number, isLike: boolean) {
    this.targetId = targetId;
    this.count = count;
    this.isLike = isLike;
  }
}
