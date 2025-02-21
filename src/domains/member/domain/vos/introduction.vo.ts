import Vo from "@/shared/entities/vo";

import { MAX_INTRODUCTION_LENGTH } from "@/domains/member/domain/constants/member.constant";
import IntroductionLengthExceededException from "@/domains/member/domain/exceptions/introduction-length-exceeded.exception";

interface IntroductionProps {
  introduction: string;
}

export default class IntroductionVo implements Vo {
  private readonly introduction: string;

  private constructor(introduction: string) {
    this.introduction = introduction;
  }

  static create({ introduction }: IntroductionProps): IntroductionVo {
    if (introduction.length > MAX_INTRODUCTION_LENGTH) {
      throw new IntroductionLengthExceededException();
    }

    return new IntroductionVo(introduction);
  }

  equals(vo: IntroductionVo): boolean {
    return this.introduction === vo.introduction;
  }

  getIntroduction(): string {
    return this.introduction;
  }
}
