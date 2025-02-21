import { IsNotEmpty } from "class-validator";

export default class RemoveReqDto {

    @IsNotEmpty()
    readonly id: number;

    constructor(id: number){
        this.id = id;
    }
}