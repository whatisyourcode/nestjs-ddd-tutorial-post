import { Injectable } from "@nestjs/common";

import MemberCreateDto from "@/domains/member/application/dtos/member-create.dto";
import MemberCreateEntity from "@/domains/member/domain/entities/member-create.entity";
import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";

@Injectable()
export default class MemberDtoToDomainMapper {
  createDtoToCreateDomain(dto: MemberCreateDto): MemberCreateEntity {
    const { name, tel, introduction } = dto;
    const entity: MemberCreateEntity = MemberCreateEntity.create({
      name: NameVo.create({ name }),
      tel: TelVo.create({ tel }),
      introduction: IntroductionVo.create({ introduction }),
    });

    return entity;
  }
}
