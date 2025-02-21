import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import PostPreviewDto from "../post-preview.dto";
import { Type } from "class-transformer";

export default class PostListResDto {
    @IsNotEmpty()
    @ValidateNested()  
    @Type(() => PostPreviewDto)
    readonly posts: PostPreviewDto[];

    constructor(posts: PostPreviewDto[]){
        this.posts = posts;
    }
}