import TitleVo from "@/domains/post/domain/vos/title.vo";

interface CreatePostProps {
  title: TitleVo;
  content: string;
  authorId: number;
}

export default class CreatePostEntity {
  private title: TitleVo;
  private content: string;
  private authorId: number;

  constructor(title: TitleVo, content: string, authorId: number) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  static create({ title, content, authorId }: CreatePostProps): CreatePostEntity {
    return new CreatePostEntity(title, content, authorId);
  }

  getTitleVo(): TitleVo {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getAuthorId(): number {
    return this.authorId;
  }
}
