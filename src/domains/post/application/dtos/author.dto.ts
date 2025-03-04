import { IsNotEmpty, IsString } from "class-validator";

export default class AuthorDto {
  @IsNotEmpty()
  @IsString()
  readonly ulid: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  constructor(ulid: string, name: string) {
    this.ulid = ulid;
    this.name = name;
  }
}
