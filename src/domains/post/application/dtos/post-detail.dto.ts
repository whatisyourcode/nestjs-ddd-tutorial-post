import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class PostDetailDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly createdAt: Date;

    @IsNotEmpty()
    @IsString()
    readonly isDeleted: boolean;

    constructor(id: number,title: string, content: string, createdAt: Date, isDeleted: boolean){
        this.id = id;
        this.title = title; 
        this.content = content;
        this.createdAt = createdAt;
        this.isDeleted = isDeleted;
    }
}