import SignatureEntity from "@/shared/entities/signature.entity";

import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";

interface MemberProps {
  id: number;
  ulid: string;
  name: NameVo;
  tel: TelVo;
  introduction: IntroductionVo;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default class MemberEntity extends SignatureEntity {
  private name?: NameVo;
  private tel: TelVo;
  private introduction: IntroductionVo;

  private constructor(
    id: number,
    ulid: string,
    name: NameVo,
    tel: TelVo,
    introduction: IntroductionVo,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, ulid, createdAt, updatedAt, deletedAt);
    this.name = name;
    this.tel = tel;
    this.introduction = introduction;
  }

  static create({ id, ulid, name, tel, introduction, createdAt, updatedAt, deletedAt }: MemberProps): MemberEntity {
    return new MemberEntity(id, ulid, name, tel, introduction, createdAt, updatedAt, deletedAt);
  }

  getNameVo(): NameVo {
    return this.name;
  }

  getTelVo(): TelVo {
    return this.tel;
  }

  getIntroductionVo(): IntroductionVo {
    return this.introduction;
  }

  changeName(name: string): void {
    this.name = NameVo.create({ name });
  }

  changeTel(tel: string): void {
    this.tel = TelVo.create({ tel });
  }

  changeIntroduction(introduction: string): void {
    this.introduction = IntroductionVo.create({ introduction });
  }
}
