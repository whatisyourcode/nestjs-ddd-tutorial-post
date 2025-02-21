import Vo from "@/shared/entities/vo";

import { MAX_TITLE_LENGTH } from "../constants/post.constraint";
import TitleLEngthExceededException from "../exceptions/title-length-exceeded.exception";

interface TitleProps {
    title: string;
}

export default class TitleVo implements Vo {
    private readonly title: string;

    private constructor(title: string){
        this.title = title;
    }

    static create({ title }: TitleProps): TitleVo {
        if(title.length > MAX_TITLE_LENGTH) {
            throw new TitleLEngthExceededException();
        }
        return new TitleVo(title);
    }

    equals(vo: TitleVo): boolean {
        return this.title === vo.title;
    }

    getTitle(): string {
        return this.title;
    }
}