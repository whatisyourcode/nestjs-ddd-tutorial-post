import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import PostDetailDto from "../post-detail.dto";



export default class UpdateResDto  {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PostDetailDto)    
    readonly post: PostDetailDto;

    constructor(post: PostDetailDto){
        this.post = post;
    }
}