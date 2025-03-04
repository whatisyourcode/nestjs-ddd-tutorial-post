import ContentVo from "../vos/content.vo";

interface CreateCommentProps {
  content: ContentVo;
  postId: number;
}

export default class CreateCommentEntity {
  private content: ContentVo;
  private postId: number;

  constructor(content: ContentVo, postId: number) {
    this.content = content;
    this.postId = postId;
  }

  static create({ content, postId }: CreateCommentProps): CreateCommentEntity {
    return new CreateCommentEntity(content, postId);
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
