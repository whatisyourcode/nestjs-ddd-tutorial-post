import TitleVo from "../vos/title.vo";
import ContentVo from "../vos/content.vo";
import BaseEntity from "@/shared/entities/base.entity";

interface PostProps {
    id: number;
    title: TitleVo;
    content: ContentVo;
    createdAt: Date;
    updatedAt: Date | null; 
    deletedAt: Date | null;
}

export default class PostDetailEntity extends BaseEntity {
    private title: TitleVo;
    private content: ContentVo;

    private constructor(
        id: number,
        title: TitleVo,
        content: ContentVo,
        createdAt: Date,
        updatedAt: Date | null,
        deletedAt: Date | null,
    ) {
        super(id,createdAt,updatedAt,deletedAt);
        this.title = title;
        this.content = content;
    }

    static create({ id, title, content, createdAt, updatedAt, deletedAt }: PostProps): PostDetailEntity {
        return new PostDetailEntity(id, title, content, createdAt, updatedAt, deletedAt);
    }

    getTitleVo(): TitleVo {
        return this.title;
    }

    getContentVo(): ContentVo {
        return this.content;
    }

    changeTitle(title: string) {
        this.title = TitleVo.create({title});
    }

    changeContent(content: string) {
        this.content = ContentVo.create({content});
    }
}
