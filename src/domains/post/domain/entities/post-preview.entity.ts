import BaseEntity from "@/shared/entities/base.entity";

import TitleVo from "@/domains/post/domain/vos/title.vo";

interface PostPreviewProps {
  id: number;
  title: TitleVo;
  authorId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default class PostPreviewEntity extends BaseEntity {
  private title: TitleVo;
  private authorId: number;

  private constructor(
    id: number,
    title: TitleVo,
    authorId: number,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.title = title;
    this.authorId = authorId;
  }

  static create({ id, title, authorId, createdAt, updatedAt, deletedAt }: PostPreviewProps): PostPreviewEntity {
    return new PostPreviewEntity(id, title, authorId, createdAt, updatedAt, deletedAt);
  }

  getTitleVo(): TitleVo {
    return this.title;
  }

  getAuthorId(): number {
    return this.authorId;
  }
}
