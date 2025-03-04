import { HttpException, HttpStatus } from "@nestjs/common";

export default class ContentLengthExceededException extends HttpException { 
    constructor(){
        super("content exceeds the maximum allowed length", HttpStatus.BAD_REQUEST);
    }
}