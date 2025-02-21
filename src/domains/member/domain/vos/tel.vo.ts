import Vo from "@/shared/entities/vo";

import { TEL_LENGTH } from "@/domains/member/domain/constants/member.constant";
import InvalidTelLengthException from "@/domains/member/domain/exceptions/invalid-tel-length.exception";
import InvalidTelFormatException from "@/domains/member/domain/exceptions/invalid-tel-format.exception";

interface TelProps {
  tel: string;
}

export default class TelVo implements Vo {
  private readonly tel: string;

  private constructor(tel: string) {
    this.tel = tel;
  }

  static create({ tel }: TelProps): TelVo {
    if (tel.length !== TEL_LENGTH) {
      throw new InvalidTelLengthException();
    }
    if (!/^[0-9]{10,15}$/.test(tel)) {
      throw new InvalidTelFormatException();
    }

    return new TelVo(tel);
  }

  equals(vo: TelVo): boolean {
    return this.tel === vo.tel;
  }

  getTel(): string {
    return this.tel;
  }
}
