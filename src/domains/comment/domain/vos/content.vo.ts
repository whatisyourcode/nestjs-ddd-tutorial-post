import Vo from "@/shared/entities/vo";

import { MAX_CONTENT_LENGTH } from "../constants/comment.constraint";
import ContentLengthExceededException from "../exceptions/content-length-exceeded.exception";

interface ContentProps {
  content: string;
}

export default class ContentVo implements Vo {
  private readonly content: string;

  private constructor(content: string) {
    this.content = content;
  }

  static create({ content }: ContentProps): ContentVo {
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new ContentLengthExceededException();
    }

    return new ContentVo(content);
  }

  equals(vo: ContentVo): boolean {
    return this.content === vo.content;
  }

  getContent(): string {
    return this.content;
  }
}
