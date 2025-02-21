import { Type } from "class-transformer";
import { IsNotEmpty, Validate, ValidateNested } from "class-validator";

import PostDetailDto from "../post-detail.dto";

export default class PostDetailResDto {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PostDetailDto)
    readonly post: PostDetailDto;

    constructor(post: PostDetailDto){
        this.post = post;
    }
}