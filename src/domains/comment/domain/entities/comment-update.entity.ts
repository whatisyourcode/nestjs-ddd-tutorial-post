import ContentVo from "../vos/content.vo";

interface CommentUpdateProps {
  commentId: number;
  content: ContentVo;
}

export default class CommentUpdateEntity {
  private commentId: number;
  private content: ContentVo;

  constructor(commentId: number, content: ContentVo) {
    this.commentId = commentId;
    this.content = content;
  }

  static create({ commentId, content }: CommentUpdateProps): CommentUpdateEntity {
    return new CommentUpdateEntity(commentId, content);
  }

  getCommentId(): number {
    return this.commentId;
  }

  getContentVo(): ContentVo {
    return this.content;
  }

  changeContent(content: string) {
    this.content = ContentVo.create({ content });
  }
}
