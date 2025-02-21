import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


import CreatePostFormDto from "../create-post.dto";

export default class CreateReqDto {
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreatePostFormDto)
    readonly post : CreatePostFormDto;

    constructor(post: CreatePostFormDto){
        this.post = post;
    }    
}