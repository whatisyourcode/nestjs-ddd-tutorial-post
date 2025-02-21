import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import UpdatePostFormDto from "../update-post-form.dto";

export default class UpdateReqDto {
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdatePostFormDto)
    readonly post: UpdatePostFormDto;

    constructor(post: UpdatePostFormDto){
        this.post = post;
    }
}