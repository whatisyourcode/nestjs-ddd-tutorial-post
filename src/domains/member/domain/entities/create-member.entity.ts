import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";

interface CreateMemberMemberProps {
  name: NameVo;
  tel: TelVo;
  introduction: IntroductionVo;
}

export default class CreateMemberEntity {
  private name: NameVo;
  private tel: TelVo;
  private introduction: IntroductionVo;

  private constructor(name: NameVo, tel: TelVo, introduction: IntroductionVo) {
    this.name = name;
    this.tel = tel;
    this.introduction = introduction;
  }

  static create({ name, tel, introduction }: CreateMemberMemberProps): CreateMemberEntity {
    return new CreateMemberEntity(name, tel, introduction);
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
