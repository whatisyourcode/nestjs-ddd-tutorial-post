import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePostFormDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    constructor(title: string, content: string){
        this.title = title;
        this.content = content;
    }
}