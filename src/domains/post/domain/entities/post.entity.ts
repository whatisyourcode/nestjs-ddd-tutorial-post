import BaseEntity from "@/shared/entities/base.entity";

import TitleVo from "@/domains/post/domain/vos/title.vo";

interface PostProps {
  id: number;
  title: TitleVo;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default class PostEntity extends BaseEntity {
  private title: TitleVo;
  private content: string;
  private authorId: number;

  private constructor(
    id: number,
    title: TitleVo,
    content: string,
    authorId: number,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  static create({ id, title, content, authorId, createdAt, updatedAt, deletedAt }: PostProps): PostEntity {
    return new PostEntity(id, title, content, authorId, createdAt, updatedAt, deletedAt);
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

  changeTitle(title: string) {
    this.title = TitleVo.create({ title });
  }

  changeContent(content: string) {
    this.content = content;
  }
}
