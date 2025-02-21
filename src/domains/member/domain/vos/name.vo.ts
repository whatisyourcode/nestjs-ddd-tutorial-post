import Vo from "@/shared/entities/vo";

import { MAX_NAME_LENGTH } from "@/domains/member/domain/constants/member.constant";
import NameLengthExceededException from "@/domains/member/domain/exceptions/name-length-exceeded.exception";

interface NameProps {
  name: string;
}

export default class NameVo implements Vo {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  static create({ name }: NameProps): NameVo {
    if (name.length > MAX_NAME_LENGTH) {
      throw new NameLengthExceededException();
    }

    return new NameVo(name);
  }

  equals(vo: NameVo): boolean {
    return this.name === vo.name;
  }

  getName(): string {
    return this.name;
  }
}
