import { HttpException, HttpStatus } from "@nestjs/common";

export default class TitleLEngthExceededException extends HttpException {
    constructor(){
        super("title exceeds the maximum allowed length", HttpStatus.BAD_REQUEST);
    }
}