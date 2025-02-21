import ContentVo from "../vos/content.vo";
import TitleVo from "../vos/title.vo";

interface CreatePostProps {
    title: TitleVo;
    content: ContentVo;
}

export default class CreatePostEntity {
    private title: TitleVo;
    private content: ContentVo;

    constructor(title: TitleVo, content: ContentVo) {
        this.title = title;
        this.content = content;
    }

    static create({ title, content }: CreatePostProps): CreatePostEntity {
        return new CreatePostEntity(title,content);
    }

    getTitleVo(): TitleVo {
        return this.title;
    }

    getContentVo(): ContentVo {
        return this.content;
    }

    changeTitle(title: string) {
        this.title = TitleVo.create({ title });
    }

    changeContent(content: string) {
        this.content = ContentVo.create({ content });
    }
}