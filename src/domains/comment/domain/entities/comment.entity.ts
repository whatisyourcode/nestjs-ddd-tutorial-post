import BaseEntity from "@/shared/entities/base.entity";
import ContentVo from "../vos/content.vo";

interface CommentProps {
  id: number;
  content: ContentVo;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default class CommentEntity extends BaseEntity {
  private content: ContentVo;
  private postId: number;

  private constructor(
    id: number,
    content: ContentVo,
    postId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.content = content;
    this.postId = postId;
  }

  static create({ id, content, postId, createdAt, updatedAt, deletedAt }: CommentProps): CommentEntity {
    return new CommentEntity(id, content, postId, createdAt, updatedAt, deletedAt);
  }

  getContentVo(): ContentVo {
    return this.content;
  }

  getPostId(): number {
    return this.postId;
  }

  changeContent(content: string) {
    this.content = ContentVo.create({ content });
  }
}
