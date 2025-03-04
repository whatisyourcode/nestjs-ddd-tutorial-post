import ContentVo from "../vos/content.vo";

interface CommentCreateProps {
  content: ContentVo;
  postId: number;
}

export default class CommentCreateEntity {
  private content: ContentVo;
  private postId: number;

  constructor(content: ContentVo, postId: number) {
    this.content = content;
    this.postId = postId;
  }

  static create({ content, postId }: CommentCreateProps): CommentCreateEntity {
    return new CommentCreateEntity(content, postId);
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
