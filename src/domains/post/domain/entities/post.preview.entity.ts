import TitleVo from "../vos/title.vo";

interface PostProps {
  id: number;
  title: TitleVo;
  createdAt: Date;
}

export default class PostPreviewEntity {
  private id: number;
  private title: TitleVo;
  private createdAt: Date;

  private constructor(id: number, title: TitleVo, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }

  static create({ id, title, createdAt }: PostProps): PostPreviewEntity {
    return new PostPreviewEntity(id, title, createdAt);
  }

  getId(): number {
    return this.id;
  }

  getTitleVo(): TitleVo {
    return this.title;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  changeTitle(title: string) {
    this.title = TitleVo.create({ title });
  }
}
