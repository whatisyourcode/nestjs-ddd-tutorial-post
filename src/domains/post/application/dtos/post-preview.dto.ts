import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class PostPreviewDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsDate()
    readonly createdAt: Date;

    constructor(id: number, title: string, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }
}